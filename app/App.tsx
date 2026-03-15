import { useState } from 'react';
import { CategorySection } from './components/category-section';
import { BillingSummary } from './components/billing-summary';

interface CartItem {
  id: string;
  category: string;
  price: number;
  increment: number;
}

const categories = [
  { name: 'Dairy Products', prices: [1, 2, 3, 4, 5] },
  { name: 'Snacks', prices: [1, 2, 3, 4, 5] },
  { name: 'Drinks', prices: [1, 2, 3, 4, 5] },
  { name: 'Bakery', prices: [1, 2, 3, 4, 5] },
  { name: 'Fruits & Vegetables', prices: [1, 2, 3, 4, 5] },
  { name: 'Frozen Foods', prices: [1, 2, 3, 4, 5] },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (category: string, price: number) => {
    const newItem: CartItem = {
      id: `${Date.now()}-${Math.random()}`,
      category,
      price,
      increment: 0,
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const addIncrement = (id: string) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newIncrement = item.increment + 0.25;
        return { ...item, increment: newIncrement };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price + item.increment, 0);

  return (
    <div className="size-full flex bg-[#f8f9fa]">
      {/* Left Side - Categories & Products */}
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="mb-8 text-[#2c3e50]">Grocery POS</h1>
        <div className="grid grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategorySection
              key={category.name}
              category={category}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Billing Summary */}
      <BillingSummary
        cart={cart}
        total={total}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onAddIncrement={addIncrement}
      />
    </div>
  );
}

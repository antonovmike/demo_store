import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../store/CartSlice';

export default function CartPage() {
  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 && <div>
        Your cart is empty
      </div>}
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id}>
            <div>{item.name} — ${item.price} × {item.qty}</div>
              <button
                onClick={() => dispatch(updateQuantity({ 
                  id: item.id, qty: Math.max(1, item.qty - 1) 
                }))}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }))}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            <button onClick={() => dispatch(removeItem(item.id))} className="px-3 py-1 bg-red-500 text-white rounded">
              Remove
            </button>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={e => dispatch(updateQuantity({ 
                id: item.id, 
                qty: Number(e.target.value) 
              }))}
            />
          </div>
        ))}
      </div>
      <div>Total: ${total.toFixed(2)}</div>
      <button onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>
    </div>
  );
}
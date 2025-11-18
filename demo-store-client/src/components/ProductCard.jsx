import { useDispatch } from 'react-redux';
import { addItem } from '../store/CartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  if (!product) return null;

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold">{product.name}</h2>
      <p>${(product.price || 0).toFixed(2)}</p>
      <p className="text-sm text-gray-500">{product.description}</p>

      <button
        onClick={() =>
          dispatch(addItem({
            id: product.id,
            name: product.name,
            price: product.price,
          }))
        }
        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
      >
        Add to cart
      </button>
    </div>
  );
}
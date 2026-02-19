import { useSelector, useDispatch } from "react-redux";
import { Box, Divider, Button, TextField, Typography } from "@mui/material";

import { removeItem, updateQuantity, clearCart } from "../store/CartSlice";
import type { CartItem } from "../store/CartSlice";
import type { RootState } from "../store/store";

export default function CartPage() {
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce(
    (sum: number, item: CartItem) => sum + (item.price || 0) * (item.qty || 0),
    0,
  );

  return (
    <Divider>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Cart
      </Typography>
      {items.length === 0 && <Typography>Your cart is empty</Typography>}
      <Box className="space-y-4">
        {items.map((item: CartItem) => (
          <Box key={item.id}>
            <Box>
              {item.name} — ${item.price} × {item.qty}
            </Box>
            <Button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    qty: Math.max(1, item.qty - 1),
                  }),
                )
              }
              className="px-2 py-1 bg-gray-200 rounded"
            >
              −
            </Button>
            <span>{item.qty}</span>
            <Button
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }))
              }
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </Button>
            <Button
              onClick={() => dispatch(removeItem(item.id))}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </Button>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    qty: Number(e.target.value),
                  }),
                )
              }
            />
          </Box>
        ))}
      </Box>
      <Box>Total: ${total.toFixed(2)}</Box>
      <Button onClick={() => dispatch(clearCart())}>Clear Cart</Button>
    </Divider>
  );
}

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import { FormBox } from "./StyledBox";
import { addProduct, selectAllProducts } from "../store/ProductsSlice";
import api from "../api/axios";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post("/products", { name, price, description });
      // Use dispatch to add product to Redux
      dispatch(addProduct(res.data));
      setName("");
      setPrice("");
      setDescription("");
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add Product
      </Typography>
      <FormBox onSubmit={handleAddProduct}>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="price"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button type="submit">Add Product</Button>
      </FormBox>
      {/* List of existing products for test */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {" "}
        List of existing products:{" "}
      </Typography>{" "}
      {Array.isArray(products) ? (
        <List sx={{ mt: 2 }}>
          {products.map((p) => (
            <ListItem key={p.id} disablePadding>
              <ListItemIcon sx={{ minWidth: "20px" }}>
                <Typography component="span">•</Typography>
              </ListItemIcon>
              <ListItemText primary={`${p.name} — $${p.price}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Divider sx={{ color: "error.main" }}>
          Invalid products response
        </Divider>
      )}
    </>
  );
}

import app from "./server.js";
import productRoutes from "./routes/productsRoutes.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/products", productRoutes);

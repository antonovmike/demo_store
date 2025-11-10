import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import api from "../api/axios";

export default function AddProductPage() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const { addNewProduct } = useContext(ProductContext);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/products", { name, price, description });
            addNewProduct(res.data);
            setName("");
            setPrice("");
            setDescription("");
        } catch (err) {
            console.error("Error adding product:", err);
        }
    };  

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Add Product</h1>
            <form onSubmit={handleAddProduct}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-semibold">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-semibold">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-semibold">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
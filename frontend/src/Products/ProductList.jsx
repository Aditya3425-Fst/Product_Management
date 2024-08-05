import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import EditProductForm from '../EditProduct/EditProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("You need to be logged in to view products.");
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/', {
                    headers: {
                        'x-api-key': token
                    }
                });
                setProducts(response.data.data);
                setIsLoggedIn(true);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch products. You have to follow this step 1.SinUp page with url http://localhost:3000/signup 2. LogIn page with - http://localhost:3000/Login 3.Add the product ");
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/products/${productId}`, {
                headers: {
                    'x-api-key': token
                }
            });
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error(error);
            setError("Failed to delete product. Please try again.");
        }
    };

    const handleUpdate = (updatedProduct) => {
        setProducts(products.map(product =>
            product._id === updatedProduct._id ? updatedProduct : product
        ));
        setEditingProduct(null);
    };

    return (
        <div>
            <h1>Products</h1>
            {error && <p className="error">{error}</p>}
            <div className="product-list">
                {products.map(product => (
                    <div className="product-card" key={product._id}>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Company: {product.company}</p>
                        <p>Featured: {product.featured ? 'Yes' : 'No'}</p>
                        {isLoggedIn && (
                            <>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={() => setEditingProduct(product)}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            {editingProduct && (
                <EditProductForm
                    product={editingProduct}
                    onUpdate={handleUpdate}
                    onCancel={() => setEditingProduct(null)}
                />
            )}
        </div>
    );
};

export default ProductList;

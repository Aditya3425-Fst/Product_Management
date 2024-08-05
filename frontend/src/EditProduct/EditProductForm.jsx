// EditProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditProductForm = ({ product, onUpdate, onCancel }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [company, setCompany] = useState(product.company);
    const [featured, setFeatured] = useState(product.featured);
    const [error, setError] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8000/products/${product._id}`, {
                name,
                price,
                company,
                featured
            }, {
                headers: {
                    'x-api-key': token
                }
            });
            onUpdate(response.data.data);
        } catch (error) {
            console.error(error);
            setError("Failed to update product. Please try again.");
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            {error && <p className="error">{error}</p>}
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <label>
                Company:
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
            </label>
            <label>
                Featured:
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditProductForm;

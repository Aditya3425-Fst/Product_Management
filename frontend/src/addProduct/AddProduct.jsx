import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [company, setCompany] = useState('');
    const [featured, setFeatured] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You need to be logged in to add products.");
            return;
        }
    },[])
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You need to be logged in to add products.");
            return;
        }

        try {
            await axios.post('http://localhost:8000/addproduct', {
                productId,
                name,
                price: parseFloat(price),
                company,
                featured,
            }, {
                headers: {
                    'x-api-key': token
                }
            });

            alert('Product added successfully!');

        
            setProductId('');
            setName('');
            setPrice('');
            setCompany('');
            setFeatured(false);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Failed to add product. Please try again.');
        }
    };

    return (
        <div>

       {error &&<div className="form-container">
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product ID</label>
                    <input
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Company</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Featured</label>
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="button">Add Product</button>
            </form>
        </div>}
        </div>
    );
};

export default AddProduct;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams(); // Extract product ID from URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch the product details using the ID
        axios
            .get(`http://localhost:5000/users/products/get/${id}`, { withCredentials: true })
            .then((res) => {
                setProduct(res.data); // Assuming the response contains the product object
            })
            .catch((err) => {
                console.error('Error fetching product details:', err.message);
            });
    }, [id]);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div>
            <header>
                <div className='navabr-container'>
                    <div className='brand'>
                        E-commerce Site
                    </div>
                    <div className='navbar-links'>
                        <ul>
                            <li><a href='/products'>Home</a></li>
                            <li><a href='/cart'>CART</a></li>
                            <li><a href='/logout'>LOGOUT</a></li>
                        </ul>
                    </div>
                </div>
            </header>
            <main>
                <body>
                    <div style={{ padding: '20px' }}>
                        <h1>{product.title}</h1>
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                        />
                        <p>{product.desc}</p>
                        <p>
                            <strong>Price:</strong> ${product.price.toFixed(2)}
                        </p>
                        <p>
                            <strong>Rating:</strong> {product.rating}/5
                        </p>
                        <p>
                            <strong>Category:</strong> {product.category}
                        </p>
                        <div>
                            <strong>Tags:</strong>
                            <ul>
                                {product.tags.map((tag, index) => (
                                    <li key={index}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <button
                                style={{
                                    color: 'white',
                                    backgroundColor: 'blue',
                                    padding: '15px 30px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 8px rgba(0, 0, 255, 0.2)', // Adds a subtle shadow
                                    transition: 'all 0.3s ease', // Smooth transition for hover effect
                                }}
                                onMouseEnter={(e) => e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 255, 0.3)'} // Hover effect - more shadow
                                onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 255, 0.2)'} // Reset shadow
                            >
                                Make Payment
                            </button>

                        </div>
                    </div>
                </body>
            </main>
        </div>
    );
};

export default ProductDetails;

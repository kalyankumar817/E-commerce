import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "../styles/Product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search input

  useEffect(() => {
    // Fetch product data
    axios
      .get('http://localhost:5000/users/products/getall', { withCredentials: true })
      .then((res) => {
        setProducts(res.data); // Assuming the response is an array of products
      })
      .catch((err) => {
        console.error('Error fetching products:', err.message);
      });
  }, []);

  // Filter products based on search query (tags)
  const filteredProducts = products.filter(product =>
    product.tags.some(tag =>
      tag.toLowerCase().includes(searchQuery.toLowerCase()) // Check if tag includes search query (case-insensitive)
    )
  );

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
      <body>
        <main>
          <div style={{ padding: '20px' }}>
            <h3>Products List</h3>

            {/* Search input field */}
            <input
              type="text"
              placeholder="Search by tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
              style={{
                padding: '10px',
                width: '100%',
                maxWidth: '300px',
                marginBottom: '20px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
              }}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product._id} // Use MongoDB's unique identifier
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '10px',
                      padding: '15px',
                      width: '250px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <NavLink to={`/products/${product._id}`}>
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '5px',
                        }}
                      />
                    </NavLink>
                    <h4 style={{ margin: '10px 0', color: '#333' }}>{product.title}</h4>
                    <p style={{ fontSize: '14px', color: '#555' }}>{product.desc}</p>
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
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {product.tags.map((tag, index) => (
                          <li key={index} style={{ fontSize: '12px', color: '#888' }}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>
        </main>
      </body>
    </div>
  );
};

export default Products;

// Add this in the same file as Product.js or create a new file named ProductDetails.js
import React, { useState, useEffect } from 'react';

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details using productId
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://course-api.com/react-store-single-product?id=${productId}`);
        if (response.ok) {
          const singleProductData = await response.json();
          setProduct(singleProductData);
        } else {
          throw new Error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      {/* Display other details of the product */}
      <img src={product.image} alt={product.name} />
      <p>Description: {product.description}</p>
      {/* Add other product details */}
    </div>
  );
};

export default ProductDetails;

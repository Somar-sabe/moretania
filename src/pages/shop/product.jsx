import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ data }) => {
  return (
    <div className="products">
      <Link to={`/product/${data.id}`}>
        <h3>{data.name}</h3>
        <img src={data.image} alt={data.name} />
      </Link>
    </div>
  );
};

export default Product;

import React, { useState, useEffect } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Product from "./product";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [priceRange, setPriceRange] = useState([0, 999999]);

  useEffect(() => {
    fetch("https://course-api.com/react-store-products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedColor, priceRange, products]);

  const filterProducts = () => {
    let tempProducts = products;

    if (selectedCategory !== "All") {
      tempProducts = tempProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedColor !== "All") {
      tempProducts = tempProducts.filter((product) =>
        product.colors.includes(selectedColor)
      );
    }

    tempProducts = tempProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(tempProducts);
    sortProducts(tempProducts);
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    setSelectedColor("All");
  };

  const filterProductsByColor = (color) => {
    setSelectedColor(color);
  };

  const sortProducts = (products) => {
    let sortedProducts = [...products];
    if (sortOrder === "A-Z") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Z-A") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredProducts(sortedProducts);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    sortProducts(filteredProducts);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const fetchSingleProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://course-api.com/react-store-single-product?id=${productId}`
      );
      if (response.ok) {
        const singleProductData = await response.json();
        console.log("Single Product Data:", singleProductData);
        // Handle the fetched single product data as needed
      } else {
        throw new Error("Failed to fetch single product");
      }
    } catch (error) {
      console.error("Error fetching single product:", error);
    }
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Sort by:</h1>
        <div className="sort">
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div className="categories">
          <h4 onClick={() => filterProductsByCategory("All")}>All</h4>
          {/* Other category options */}
        </div>
        <div className="colors">
          {/* Color options */}
        </div>
        <div className="price-filter">
          <label>Price Range:</label>
          <Slider
            min={0}
            max={999999}
            value={priceRange}
            onChange={handlePriceChange}
            range
          />
        </div>
      </div>
      <div className="full">
        <div className="products">
          {filteredProducts.map((product, index) => (
            <Product
              key={index}
              data={product}
              fetchSingleProduct={fetchSingleProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;

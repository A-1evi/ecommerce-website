import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Filter from "./Filter";

const Products = () => {
  const { category: categoryParam } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [error, setError] = useState("");

  // Handle category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Fetch products whenever selectedCategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) {
        setProducts([]);
        return;
      }

      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${selectedCategory}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">
            Products in {selectedCategory || "All Categories"}
          </h2>

          {/* Filter Section */}
          <div className="my-6">
            <Filter onChange={handleCategoryChange} />
          </div>

          {/* Product Grid */}
          <div className="mt-6 grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-6">
            {products.length > 0 ? (
              products.map((product) => (
                <Link
                  to={`/products/${selectedCategory}/${product.id}`}
                  key={product.id}
                  className="group relative hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-gray-500 text-center mt-8">
                No products available for this category.
              </div>
            )}
          </div>

          {/* Display error if there's any */}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Products;

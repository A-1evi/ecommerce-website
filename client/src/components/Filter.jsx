import React, { useEffect, useState } from "react";

const Filter = ({ onChange }) => {
  const [categories, setCategoryList] = useState([]);
  const [error, setError] = useState("");

  // Function to fetch categories
  const products = async () => {
    try {
      const getCategoryList = await fetch(
        "https://dummyjson.com/products/categories"
      );
      if (!getCategoryList.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await getCategoryList.json();

      // Set the list of categories
      setCategoryList(data);
    } catch (error) {
      // Handle any errors encountered during fetching
      setError("Failed to load categories. Please try again later.");
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    products();
  }, []);

  return (
    <div>
      {/* Category Filter */}
      <div className="mt-6">
        <label>
          Category:
          <select
            name="category"
            onChange={onChange}
            className="ml-2 p-1 border rounded"
          >
            <option value="">All</option>
            {/* Iterate through categories and create an option for each */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Display error if there's any */}
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {/* Price Filter (Placeholder for future implementation) */}
      <div className="mt-4">
        <label>
          Price:
          <input
            type="number"
            placeholder="Min"
            className="ml-2 p-1 border rounded"
          />
        </label>
        <label className="ml-4">
          <input
            type="number"
            placeholder="Max"
            className="ml-2 p-1 border rounded"
          />
        </label>
      </div>
    </div>
  );
};

export default Filter;

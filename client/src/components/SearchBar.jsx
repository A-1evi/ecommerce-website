import React, { useEffect, useState, useCallback } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  // Function to handle API fetching
  const fetchItem = useCallback(async () => {
    if (!searchText) {
      setSearchResults([]); // Clear results if searchText is empty
      return;
    }

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchText}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSearchResults(data.products);
    } catch (err) {
      setError(err.message);
    }
  }, [searchText]);

  // Debounce the API call
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchItem();
    }, 500); // Delay of 500ms

    return () => clearTimeout(debounceTimer); // Cleanup timer on component unmount or effect re-run
  }, [searchText, fetchItem]);

  // Handle form submission
  const searchProduct = (e) => {
    e.preventDefault();
    fetchItem();
  };

  return (
    <div className="flex items-center mt-4 z-50 ">
      <div className="p-3 w-full mx-auto">
        <form
          role="search"
          className="flex justify-center"
          onSubmit={searchProduct}
        >
          <input
            type="search"
            className="w-full p-2 text-lg border rounded"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="mt-4 bg-white absolute top-12 right-3 max-h-64  overflow-y-scroll">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((product) => (
                <li key={product.id} className="border border-gray-300 py-2 px-4">
                  <strong>{product.title}</strong>
                </li>
              ))}
            </ul>
          ) : (
            searchText && !error && <div>No results found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

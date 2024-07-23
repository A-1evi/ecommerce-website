import React, { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex items-center">
      <div className="p-3 w-full mx-auto">
        <form role="search" className="flex justify-center">
          <input
            type="search"
            className="w-full p-2 text-lg border rounded"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;

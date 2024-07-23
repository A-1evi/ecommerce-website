import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoriesWithImages } from "./utils/productSlice"; // Adjust the import path as needed
import { getCategoriesWithImages } from "./customHooks/getProductWithImages"; // Adjust the import path as needed
import { Link } from "react-router-dom";

const ShopByCategory = () => {
  const dispatch = useDispatch();
  const categoriesWithImages = useSelector(
    (store) => store.products?.categoryWithImg
  );

  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 3; // Adjust the number of categories per page as needed

  useEffect(() => {
    getCategoriesWithImages().then((categoriesWithImages) => {
      dispatch(setCategoriesWithImages(categoriesWithImages));
    });
  }, [dispatch]);

  // Calculate the current categories to display
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categoriesWithImages?.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  // Handle pagination
  const totalPages = Math.ceil(
    categoriesWithImages?.length / categoriesPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {currentCategories &&
              currentCategories.map((category) => (
                <div key={category.category} className="group relative">
                  <div className="relative h-80 w-full  overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      alt={category.category}
                      src={category.image}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link to={`/products/${category.category}`}>
                      <span className="absolute inset-0" />
                      {category.category}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {category.category}
                  </p>
                </div>
              ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
            >
              &#10094;
            </button>
            <span className="mx-4 my-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;

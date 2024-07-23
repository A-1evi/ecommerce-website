import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setSelectedImage(data.thumbnail); // Set the initial selected image
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2">
            <div className="w-full h-96 bg-white rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex mt-4 space-x-4 overflow-x-auto">
              {[product.thumbnail, ...product.images].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`h-20 w-20 rounded-lg overflow-hidden ${
                    selectedImage === image ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.brand}</p>
            <p className="text-xl text-gray-700">${product.price.toFixed(2)}</p>
            <div className="mt-2">
              <p className="text-gray-600">{product.description}</p>
             
            </div>

            {/* Product Ratings */}
            <div className="flex items-center mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.358 4.188a1 1 0 00.95.69h4.4c.969 0 1.372 1.24.588 1.81l-3.564 2.553a1 1 0 00-.364 1.118l1.358 4.188c.3.921-.755 1.688-1.54 1.118l-3.564-2.553a1 1 0 00-1.175 0l-3.564 2.553c-.785.57-1.84-.197-1.54-1.118l1.358-4.188a1 1 0 00-.364-1.118L2.293 9.615c-.784-.57-.38-1.81.588-1.81h4.4a1 1 0 00.95-.69L9.049 2.927z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">
                {product.rating} out of 5 stars
              </p>

            </div>


            {/* Buy Section */}
            <div className="mt-4 space-y-2 ">
              <button className="w-1/4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition block">
                Add to Cart
              </button>
              <button className="w-1/4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Product Details</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Brand: {product.brand}</li>
            <li>Category: {product.category}</li>
            <li>Stock: {product.stock}</li>
          </ul>
        </div>


       {/* Reviews Section */}
       <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          <div className="mt-4 space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-bold">{review.reviewerName}</div>
                  <div className="text-yellow-500">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <span key={i}>&#9733;</span> // Star symbol
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      
                

        {/* Back to Products Link */}
        <div className="mt-8">
          <Link
            to={`/products/${product.category}`}
            className="text-blue-600 hover:underline"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

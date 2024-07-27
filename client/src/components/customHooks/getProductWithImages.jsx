import { getProduct } from "./getProduct";

// Function to get unique categories with their representative images
export const getCategoriesWithImages = async () => {
  try {
    // Fetch product data
    const productData = await getProduct();

    // Initialize an object to store categories and their images
    const categoriesWithImages = {};

    // Check if productData has products and iterate through them
    if (productData && productData.products) {
      productData.products.forEach((product) => {
        if (!categoriesWithImages[product.category]) {
          categoriesWithImages[product.category] = product.images[0]; // Assume the first image is representative
        }
      });
    }

    // Convert the object into an array of category-image pairs
    const uniqueCategoriesWithImages = Object.entries(categoriesWithImages).map(
      ([category, image]) => ({
        category,
        image,
      })
    );

    return uniqueCategoriesWithImages;
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    return [];
  }
};

// Example usage
(async () => {
  const categoriesWithImages = await getCategoriesWithImages();
  console.log(categoriesWithImages);
})();

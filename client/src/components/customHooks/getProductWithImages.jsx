import { getProduct } from "./getProduct";

export const getCategoriesWithImages = async () => {
    const productData = await getProduct();
    const categoriesWithImages = {};
  
    // Extract unique categories and their corresponding images
    productData.products.forEach(product => {
      if (!categoriesWithImages[product.category]) {
        categoriesWithImages[product.category] = product.images[0]; // Assuming the first image is representative
      }
    });
  
    // Convert the object into an array of category-image pairs
    const uniqueCategoriesWithImages = Object.entries(categoriesWithImages).map(([category, image]) => ({
      category,
      image,
    }));
  
    return uniqueCategoriesWithImages;
  };
  
  // Example usage
 
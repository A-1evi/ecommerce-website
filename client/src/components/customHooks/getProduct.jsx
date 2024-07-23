export const getProduct = async () => {
    const response = await fetch("https://dummyjson.com/products/?limit=194");
    const data = await response.json();
    return data;
  };
  
  
  
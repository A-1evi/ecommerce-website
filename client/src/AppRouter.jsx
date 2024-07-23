import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products"; // Import the Products component
import ProductDetail from "./components/Product";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:category" element={<Products />} />
        <Route path="products/:category/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

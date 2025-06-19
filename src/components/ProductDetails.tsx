import React from "react";
import { useParams } from "react-router-dom";
import { data } from "../db/data";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = data.find((item) => item.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 flex min-h-screen items-center justify-center flex-col ">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.img.black}
        alt={product.title}
        className="object-contain w-50  h-auto mb-4"
      />
      <p className="text-lg mb-2">Price: ${product.price}</p>
   
      <div className="mt-4">
      
        <p className="text-gray-600">
          {product.company}
        </p>
      </div>
      
    </div>
  );

  };

  export default ProductDetails;

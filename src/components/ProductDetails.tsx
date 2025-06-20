import  { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { data } from "../db/data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = data.find((item) => item.id === id);

  if (!product) {
    return <div className="text-center mt-10 text-xl">Product not found</div>;
  }

  const images = Object.values(product.img);
  const [currentImage, setCurrentImage] = useState<string>(product.img.black);

  const handleNext = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[prevIndex]);
  };

  return (
    <div className="p-4 flex min-h-screen items-center justify-center flex-col relative">
      <Link to="/" className="absolute top-4 left-4 text-blue-500 ">
        ← Back
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center">{product.title}</h1>

      <div className="relative px-5 py-2 rounded-md ">
        <img
          src={currentImage}
          alt={product.title}
          className="object-contain w-[300px] h-[300px] rounded-md "
        />

        {/* Prev and Next Buttons */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <button
              onClick={handlePrev}
              className="bg-gray-300 hover:bg-gray-400 text-white rounded-full p-2 shadow"
            >
              <FaChevronLeft className="text-black" />
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-300 hover:bg-gray-400 text-white rounded-full p-2 shadow"
            >
              <FaChevronRight className="text-black" />
            </button>
          </div>
        )}
      </div>

      <p className="text-xl mt-6 mb-1">Price: ${product.price}</p>
      <p className="text-gray-600 mb-2">Brand: {product.company}</p>
      <p className="text-gray-500">Country: {product.country}</p>
    </div>
  );
};

export default ProductDetails;

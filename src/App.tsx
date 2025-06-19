import React from "react";
import SideBar from "./components/SideBar";
import { data } from "./db/data";
import ProductCard from "./components/ProductCard";
import { useFilterStore } from "./store/store";



const App = () => {
  const { selectedCountries, selectedColors, selectedPriceRange ,searchQuery } =
    useFilterStore((state) => state);

  const filteredData = data.filter((item) => {
    const matchesColor =
      selectedColors.length === 0 ||
      Object.keys(item.img).some((color) => selectedColors.includes(color));

    const matchesCountry =
      selectedCountries.length === 0 ||
      selectedCountries.includes(item.country);
    
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase());
    

    const matchesPrice = selectedPriceRange
      ? item.price >= selectedPriceRange.min &&
        item.price <= selectedPriceRange.max
      : true;

    return matchesColor && matchesCountry && matchesPrice && matchesSearch;
  });

  return (
    <>
      <SideBar />
      <div className="p-4 flex flex-wrap justify-center items-center">
        {filteredData.map((product:any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default App;

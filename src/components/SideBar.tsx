import { useState } from "react";
import Navigation from "./Navigation";
import { useFilterStore } from "../store/store";
import { data } from "../db/data";
import { FiChevronDown, FiX } from "react-icons/fi";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);
  const [colorDropdown, setColorDropdown] = useState(false);
  const [priceDropdown, setPriceDropdown] = useState(false);

  const {
    selectedCountries,
    selectedColors,
    selectedPriceRange,
    setSelectedCountries,
    setSelectedColors,
    setSelectedPriceRange,
    clearFilters,
  } = useFilterStore((state) => state);

  const toggleSideBar = () => setIsOpen(!isOpen);
  const toggleCountryDropdown = () => setCountryDropdown(!countryDropdown);
  const toggleColorDropdown = () => setColorDropdown(!colorDropdown);
  const togglePriceDropdown = () => setPriceDropdown(!priceDropdown);

  const handleCountrySelection = (country: string) => {
    setSelectedCountries(
      selectedCountries.includes(country)
        ? selectedCountries.filter((c) => c !== country)
        : [...selectedCountries, country]
    );
  };

  const handleColorSelection = (color: string) => {
    setSelectedColors(
      selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color]
    );
  };

  const handlePriceRangeSelection = (
    range: { min: number; max: number; label: string } | null
  ) => {
    setSelectedPriceRange(range);
  };

  const uniqueCountries = Array.from(new Set(data.map((item) => item.country)));

  return (
    <>
      <Navigation toggleSideBar={toggleSideBar} />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={toggleSideBar} className="text-xl">
            <FiX />
          </button>
        </div>

        {/* Filters Section */}
        <div className="p-4 space-y-6">
          {/* Country Filter */}
          <div>
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={toggleCountryDropdown}
            >
              <span className="font-medium">Country</span>
              <FiChevronDown
                className={`transition-transform ${
                  countryDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {countryDropdown && (
              <div className="mt-2 space-y-2">
                {uniqueCountries.map((country) => (
                  <label
                    key={country}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => handleCountrySelection(country)}
                      className="mr-2"
                    />
                    {country}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Color Filter */}
          <div>
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={toggleColorDropdown}
            >
              <span className="font-medium">Color</span>
              <FiChevronDown
                className={`transition-transform ${
                  colorDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {colorDropdown && (
              <div className="mt-2 space-y-2">
                {["black", "brown", "red", "white", "golden"].map((color) => (
                  <label
                    key={color}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorSelection(color)}
                      className="mr-2"
                    />
                    {color}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div>
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={togglePriceDropdown}
            >
              <span className="font-medium">Price</span>
              <FiChevronDown
                className={`transition-transform ${
                  priceDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {priceDropdown && (
              <div className="mt-2 space-y-2">
                {[
                  { label: "Below $300", min: 0, max: 300 },
                  { label: "$300 - $600", min: 300, max: 600 },
                  { label: "Above $600", min: 600, max: Infinity },
                ].map((range: { min: number; max: number; label: string }) => (
                  <label
                    key={range.label}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={!!(selectedPriceRange && 'label' in selectedPriceRange && selectedPriceRange.label === range.label)}
                      onChange={() => handlePriceRangeSelection(range)}
                      className="mr-2"
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={clearFilters}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSideBar}
        />
      )}
    </>
  );
};

export default SideBar;

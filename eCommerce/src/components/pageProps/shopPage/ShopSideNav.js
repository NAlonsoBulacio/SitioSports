import React, { useState, useEffect } from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Subcategory from "./shopBy/Subcategory";
import Size from "./shopBy/Size";
import SizeCamisetas from "./shopBy/SizeCamisetas";
import SubcategoryCamisetas from "./shopBy/Subcategory.Camisetas";
import SizeMedias from "./shopBy/SizeMedias";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleBrand,
  toggleCategory,
  toggleSizes,
  toggleSubcategory,
} from "../../../redux/orebiSlice";
import {
  allBrands,
  allCategories,
  allSizes,
  allSubcategories,
} from "../../../constants";
const ShopSideNav = () => {
  const dispatch = useDispatch();
  const [allActiveFilters, setAllActiveFilters] = useState([]);

  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const selectedSubcategories = useSelector(
    (state) => state.orebiReducer.checkedSubcategorys
  );
  const selectedSizes = useSelector((state) => state.orebiReducer.checkedSizes);
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );

  useEffect(() => {
    const combinedFilters = [
      ...selectedCategories,
      ...selectedSubcategories,
      ...selectedSizes,
      ...selectedBrands,
    ];
    setAllActiveFilters(combinedFilters);
  }, [
    selectedCategories,
    selectedSubcategories,
    selectedSizes,
    selectedBrands,
  ]);

  const handleRemoveFilter = (filter) => {
    if (allBrands.some((brand) => brand.title === filter.title)) {
      dispatch(toggleBrand(filter));
    } else if (
      allCategories.some((category) => category.title === filter.title)
    ) {
      dispatch(toggleCategory(filter));
    } else if (
      allSubcategories.some((subcategory) => subcategory.title === filter.title)
    ) {
      dispatch(toggleSubcategory(filter));
    } else if (allSizes.some((size) => size.title === filter.title)) {
      dispatch(toggleSizes(filter));
    }
  };

  console.log(selectedCategories);
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Filtros</h1>
      <div>
        <p className="font-semibold">Aplicado:</p>
        {allActiveFilters.length ? (
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {allActiveFilters?.map((filter) => (
              <div
                key={filter._id}
                className="flex justify-start items-center gap-1 w-auto h-auto relative font-semibold text-gray-700 py-1 px-3 bg-pink-300 border-[2px] border-pink-600 hover:text-pink-600 hover:border-gray-700 hover:bg-gray-400 cursor-pointer"
                onClick={() => handleRemoveFilter(filter)}
              >
                <p>{filter.title}</p>
                <button className="text-xl font-bold text-gray-700">x</button>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <Category icons={false} />
      <Brand />
     {selectedCategories.length && selectedCategories[0].title === "Botines" ? (
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Botines</h1>
          <Subcategory />
          <Size />
        </div>
      ) : selectedCategories.length && selectedCategories[0].title === "Camisetas" ? (
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Camisetas</h1>
          <SubcategoryCamisetas />
          <SizeCamisetas />
        </div>
      ) : selectedCategories.length && selectedCategories[0].title === "Medias" ? (
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Medias</h1>
          <SizeMedias />
        </div>
      ) : (
        ""
      )} 

      {/* <Price /> */}
    </div>
  );
};

export default ShopSideNav;

import React, { useState, useEffect } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubcategory } from "../../../../redux/orebiSlice";
import { TiArrowSortedDown } from "react-icons/ti";
const Subcategory = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const checkedSubcategorys = useSelector(
    (state) => state.orebiReducer.checkedSubcategorys
  );
  const products = useSelector((state) => state.orebiReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkedSubcategorys.length !== 0) {
      setShowFilter(true);
    }
  }, [checkedSubcategorys]); 

  const subcategory = [
    {
      _id: 10006,
      title: "Futbol 5",
    },
    {
      _id: 10007,
      title: "Futbol 11",
    },
  ];

  const handleToggleSubcategory = (subcategory) => {
    dispatch(toggleSubcategory(subcategory));
  };

  const handleFilterToggle = () => {
    if(checkedSubcategorys.length === 0){
        setShowFilter(!showFilter)
    }
  }
  return (
    <div className="w-full">
      <div
        className="flex justify-between cursor-pointer pb-2"
        onClick={handleFilterToggle}
      >
        <h1 icons={true}>Subcategoria</h1>
        <TiArrowSortedDown
          className={`text-lg ${
            showFilter ? "rotate-180" : "rotate-0"
          } duration-300`}
        />
      </div>
      <div>
        {showFilter ? (
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {subcategory.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  id={item._id}
                  checked={checkedSubcategorys.some((b) => b._id === item._id)}
                  onChange={() => handleToggleSubcategory(item)}
                />
                {item.title}
                {item.icons && (
                  <span
                    onClick={() => setShowSubCatOne(!showSubCatOne)}
                    className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                  >
                    <ImPlus />
                  </span>
                )}
              </li>
            ))}
            {/* <li onClick={() => console.log(checkedSubcategorys)}>test</li> */}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Subcategory;

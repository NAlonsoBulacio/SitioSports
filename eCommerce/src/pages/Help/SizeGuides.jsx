import React from 'react'
import { talles_botines, talles_camisetas } from "../../assets/images";
const SizeGuides = () => {
  return (
    <div className="px-20 flex justify-center">
      <div className="flex flex-col justify-center items-start py-20 w-2/3 gap-6">
        <h1 className="text-3xl font-semibold">Guías de talles</h1>
        <div className="flex flex-col justify-start items-start space-y-6">
          <img src={talles_botines} alt="" />
          <img src={talles_camisetas} alt="" />
          </div>
      </div>
    </div>
  );
}

export default SizeGuides

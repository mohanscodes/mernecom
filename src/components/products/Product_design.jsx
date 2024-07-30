import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link } from "react-router-dom";
// import "./product_design.scss";

function Product_design({ product, addcard, addwishlist }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      key={product._id}
      className="border-1 group transition-all duration-700 hover:shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* product Image and offer and icon start */}
      <div className="relative overflow-hidden">
        {product.discount ? (
          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] object-cover rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
            {product.discount}%{" "}
          </div>
        ) : (
          ""
        )}

        <motion.img
          className="sm:w-full w-full h-full product-image"
          src={isHovered ? product.images[1] : product.images[0]}
          alt=""
          whileHover={{ scale: 1.2 }}
        />

        <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
          <li
            onClick={() => addwishlist(product)}
            className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#b89f7b] hover:text-white hover:rotate-[720deg] transition-all"
          >
            <FaRegHeart />
          </li>

          <Link
            to={`/product/details/${product.slug}`}
            className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#b89f7b] hover:text-white hover:rotate-[720deg] transition-all"
          >
            <FaEye />
          </Link>

          <li
            onClick={() => addcard(product._id)}
            className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#b89f7b] hover:text-white hover:rotate-[720deg] transition-all"
          >
            <RiShoppingCartLine />
          </li>
        </ul>
      </div>
      {/* product Image and offer and icon start */}

      {/* product name & price start */}
      <div className="py-3 text-[#2f2f2f]  px-2">
        <h2 className="font-semibold sm:font-xs ">{product.name} </h2>
        <div className="flex justify-start items-center gap-3">
          <span className="text-md font-semibold">₹{product.price}</span>
          <div className="flex">
            <Rating ratings={product.rating} />
          </div>
        </div>
      </div>
      {/* product name & price end */}
    </div>
  );
}

export default Product_design;

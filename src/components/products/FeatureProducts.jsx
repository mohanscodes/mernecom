import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  add_to_card,
  add_to_wishlist,
  messageClear,
} from "../../store/reducers/cardReducer";
import toast from "react-hot-toast";
import Product_design from "./Product_design";

const FeatureProducts = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.card);

  const add_card = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const add_wishlist = (pro) => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: pro._id,
          name: pro.name,
          price: pro.price,
          image: pro.images[0],
          discount: pro.discount,
          rating: pro.rating,
          slug: pro.slug,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center font-serif sm:text-2xl flex justify-center items-center flex-col text-4xl text-[#2f2f2f]  font-bold relative pb-[45px] sm:pb-[0px]">
          <h2>Feature Products </h2>
          <div className="w-[100px] h-[2px] bg-[#b89f7b]  mt-4 sm:mt-1"></div>
        </div>
      </div>

      <div className="w-full sm:pt-[10px] grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-4 gap-6">
        {products.map((p, i) => (
          // eslint-disable-next-line react/jsx-pascal-case
          <Product_design
            key={i}
            product={p}
            addcard={add_card}
            addwishlist={add_wishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;

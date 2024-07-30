import React from "react";
import {
  FaShippingFast,
  FaCreditCard,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";

function HomeIconBox() {
  return (
    <div className="w-[87%] mx-auto relative mb-0 mt-0 sm:mt-4 sm:mb-0">
      <div className="w-full">
        <div className="grid grid-cols-4 md:grid-cols-2 gap-2">

          {/* Icon box1 */}
          <motion.div
            className="  text-center flex justify-center gap-4 items-center sm:p-2  p-4 bg-[#f0eee3]   transition-shadow duration-300 ease-in-out"
            whileHover={{ y: -5 }}
          >
            <FaShippingFast className="text-4xl sm:text-lg mb-3 text-[#000000]" />
            <div className="text">
              <h5 className="text-lg sm:text-sm font-bold">Free Shipping</h5>
              <p className="text-sm text-gray-600">From all items</p>
            </div>
          </motion.div>
          {/* Icon box2 */}
          <motion.div
            className=" text-center flex  justify-center items-center gap-4 sm:p-2  p-4 bg-[#f0eee3]   transition-shadow duration-300 ease-in-out"
            whileHover={{ y: -5 }}
          >
            <FaCreditCard className="text-4xl sm:text-lg mb-3 text-[#000000]" />
            <div className="text">
              <h5 className="text-lg sm:text-sm font-bold sm:text-sm">Easy Payment</h5>
              <p className="text-sm text-gray-600">Pay multiple cards</p>
            </div>
          </motion.div>
          {/* Icon box3 */}
          <motion.div
            className=" text-center flex  justify-center items-center gap-4 sm:p-2  p-4 bg-[#f0eee3]   transition-shadow duration-300 ease-in-out"
            whileHover={{ y: -5 }}
          >
            <FaUndo className="text-4xl sm:text-lg  mb-3 text-[#000000]" />
            <div className="text">
              <h5 className="text-lg sm:text-sm font-bold">Easy Return</h5>
              <p className="text-sm text-gray-600">If have problems</p>
            </div>
          </motion.div>
          {/* Icon box4 */}
          <motion.div
            className=" text-center flex justify-center items-center gap-4 sm:p-2  p-4 bg-[#f0eee3]   transition-shadow duration-300 ease-in-out"
            whileHover={{ y: -5 }}
          >
            <FaHeadset className="text-4xl sm:text-lg mb-3 text-[#000000]" />
            <div className="text">
              <h5 className="text-lg sm:text-sm font-bold">Customer Service</h5>
              <p className="text-sm text-gray-600">
                support all days
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HomeIconBox;

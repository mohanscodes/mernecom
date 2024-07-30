import React, { useEffect } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { Link,useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function OrderSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { price, items, orderId, message } = state || {};

  useEffect(() => {
    toast.success(message);
  }, [message]);

  useEffect(() => {
    if (!price || !items || !orderId || !message) {
      navigate('/');
    }
  }, [price, items, orderId, message, navigate]);

//   if (!price || !items || !orderId || !message) {
//     navigate('/');
//     return null; // Optionally render a loading state or nothing while redirecting
//   }

  return (
    <div>
      <Header />

      <section className="bg-[#eeeeee]">
        <div
          className="
        w-85% 
        lg:w-[90%] 
        md:w-[90%] 
        sm:w-[90%] 
        mx-auto 
        py-16 
        mt-4"
        >
          <div className="flex flex-col	 justify-center items-center">
            OrderSuccess
            <Link
              className="flex cursor-pointer justify-center items-center gap-2 text-sm text-white
                  bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded
                  "
              to="/"
            >
              <span>
                {" "}
                <IoHome />{" "}
              </span>
              <span>Back To home </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default OrderSuccess;

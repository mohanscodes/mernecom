import React, { useEffect } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
// import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAmazonPay } from "react-icons/fa6";

const Payment = () => {
  const { data, order } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(data);
  console.log(order);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { price, items, orderId, message } = state || {};

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_IZXmvhdzp37ZFz",
      amount: data.amount,
      currency: data.currency,
      name: order.products[0].name,
      description: order.products[0].name,
      image: order.products[0].images[0],
      order_id: data.id,

      handler: async (response) => {
        try {
          const verifyUrl = `https://ecombackend-15y4.onrender.com/api/order/verify-payment/${userInfo.id}/${order._id}`;
          const { data, status } = await axios.post(verifyUrl, response);

          console.log(`responce server data - ${status} ${data}`);

          if (status === 200) {
            navigate("/orderSuccess", {
              state: {
                price: price,
                items,
                orderId: orderId,
                message: data.message, // Use the message from the response
              },
            });
          } else {
            alert("Payment verification failed");
            console.log("Payment verification failed");
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    initPayment(data);
  };

  useEffect(() => {
    if (data == "") {
      navigate("/");
    }
  }, [data]);

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
            Make Payment in Online - {order._id}
            <button
              className="flex cursor-pointer justify-center items-center gap-2 text-sm text-white
                  bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded
                  "
              onClick={handlePayment}
            >
              <span>
                {" "}
                <FaAmazonPay />{" "}
              </span>
              <span>Pay Now</span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Payment;

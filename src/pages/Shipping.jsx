import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";

import cashImage from "../assets/cash.png";
import onlineImage from "../assets/online.png";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get redux state data
  const { userInfo } = useSelector((state) => state.auth);

  // get data from router, sent from cart component
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();

  const [res, setRes] = useState(false);
  const [modeofpayment, setModeofpayment] = useState("cash");

  const [state, setState] = useState({
    name: "",
    phone1: "",
    phone2: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const save = (e) => {
    e.preventDefault();
    const { name, phone1, phone2, email, address, city, pincode } = state;

    if (
      name &&
      phone1 &&
      phone2 &&
      email &&
      address &&
      city &&
      pincode &&
      modeofpayment
    ) {
      setRes(true);
    }
  };

  const placeOrder = () => {
    const orderData = {
      name: state.name,
      phone1: state.phone1,
      phone2: state.phone2,
      email: state.email,
      address: state.address,
      city: state.city,
      pincode: state.pincode,
      order_status: 'pending',
      price: price,
      products: products,
      shipping_fee: shipping_fee,
      items: items,
      userId: userInfo.id,
      modeofpayment: modeofpayment,
    }
    dispatch(place_order({ productinfo: orderData, navigate }));
  };

  return (
    <div>
      <Header />
      <section className='bg-[url("https://res.cloudinary.com/dxowg9liw/image/upload/v1722172070/shop_page_kctvs2.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Shipping Page </h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Shipping </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-[#2f2f2f]  font-bold pb-3">
                    Shipping Information{" "}
                  </h2>
                  {!res && (
                    <>
                      <form onSubmit={save}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-[#2f2f2f] ">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name"> Name </label>
                            <input
                              onChange={inputHandle}
                              value={state.name}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="name"
                              id="name"
                              placeholder="Name"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone1"> phone1 </label>
                            <input
                              onChange={inputHandle}
                              value={state.phone1}
                              type="Number"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="phone1"
                              id="phone1"
                              placeholder="phone1"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone2"> phone2 </label>
                            <input
                              onChange={inputHandle}
                              value={state.phone2}
                              type="Number"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="phone2"
                              id="phone2"
                              placeholder="phone2"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-[#2f2f2f] ">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="email"> email </label>
                            <input
                              onChange={inputHandle}
                              value={state.email}
                              type="email"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="email"
                              id="email"
                              placeholder="email"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address"> address </label>
                            <input
                              onChange={inputHandle}
                              value={state.address}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="address"
                              id="address"
                              placeholder="address"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-[#2f2f2f] ">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city"> city </label>
                            <input
                              onChange={inputHandle}
                              value={state.city}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="city"
                              id="city"
                              placeholder="city"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="pincode"> pincode </label>
                            <input
                              onChange={inputHandle}
                              value={state.pincode}
                              type="number"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="pincode"
                              id="pincode"
                              placeholder="pincode"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col mt-5 md:gap-2 justify-end w-full gap-5 text-[#2f2f2f] ">
                          <button
                            type="submit"
                            className={`px-5 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-sm text-white uppercase`}
                          >
                            Save Change
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#2f2f2f]  font-semibold pb-2">
                        Deliver To {state.name}
                      </h2>
                      <p>
                        <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                          Home
                        </span>
                        <span>
                          {state.phone1} {state.address} {state.pincode}{" "}
                          {state.city} {state.area}{" "}
                        </span>
                        <span
                          onClick={() => setRes(false)}
                          className="text-indigo-500 cursor-pointer"
                        >
                          Change{" "}
                        </span>
                      </p>
                      <p className="text-[#2f2f2f]  text-sm">
                        Email To enterweb@gmail.com
                      </p>
                    </div>
                  )}
                </div>

                {/* cart stock start */}
                {res && (
                  <div className="bg-white p-6 shadow-sm rounded-md">
                    <h2 className="text-[#2f2f2f]  font-bold pb-3">Cart Items</h2>
                    <div className="flex flex-col gap-2 text-sm font-medium text-[#2f2f2f] ">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="flex justify-between items-center"
                        >
                          <p>{product.name}</p>
                          <p>${product.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* cart stock end */}
              </div>
            </div>
            <div className="w-[33%] md-lg:w-full">
              <div className="bg-white p-6 shadow-sm rounded-md">
                <h2 className="text-[#2f2f2f]  font-bold pb-3">Order Summary</h2>
                <div className="flex justify-between items-center text-sm font-medium text-[#2f2f2f] ">
                  <p>Subtotal</p>
                  <p>${price}</p>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-[#2f2f2f] ">
                  <p>Shipping Fee</p>
                  <p>${shipping_fee}</p>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-[#2f2f2f] ">
                  <p>Total</p>
                  <p>${price + shipping_fee}</p>
                </div>
              </div>

              <div className="bg-white p-6 shadow-sm rounded-md mt-4">
                <h2 className="text-[#2f2f2f]  font-bold pb-3">Payment Method</h2>
                <div className="flex gap-4">
                  <div
                    onClick={() => setModeofpayment("cash")}
                    className={`cursor-pointer p-3 border ${
                      modeofpayment === "cash"
                        ? "border-green-500"
                        : "border-slate-200"
                    } rounded-md flex flex-col items-center`}
                  >
                    <img src={cashImage} alt="Cash on Delivery" />
                    <p className="text-sm mt-2">Cash on Delivery</p>
                  </div>
                  <div
                    onClick={() => setModeofpayment("online")}
                    className={`cursor-pointer p-3 border ${
                      modeofpayment === "online"
                        ? "border-green-500"
                        : "border-slate-200"
                    } rounded-md flex flex-col items-center`}
                  >
                    <img src={onlineImage} alt="Online Payment" />
                    <p className="text-sm mt-2">Online Payment</p>
                  </div>
                </div>
              </div>
              <button
                onClick={placeOrder}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-md text-sm font-medium hover:bg-green-600"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;

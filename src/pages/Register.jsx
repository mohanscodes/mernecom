import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { customer_register, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

const Register = () => {
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(customer_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        email: "",
        password: "",
      });
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}

      <Header />

      <div className="bg-[#f7f4ef] min-h-screen flex justify-center items-center">
        <div className="flex sm:flex-col w-full max-w-4xl p-10 items-center  md:items-stretch">
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h2 className="text-center w-full text-xl text-[#2f2f2f] font-bold mb-6">
              Register
            </h2>

            <form onSubmit={register} className="text-[#2f2f2f]">
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="name">Name</label>
                <input
                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#9b665e]"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                  onChange={inputHandle}
                  value={state.name}
                />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="email">Email</label>
                <input
                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#9b665e]"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  onChange={inputHandle}
                  value={state.email}
                />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="password">Password</label>
                <input
                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#9b665e]"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  onChange={inputHandle}
                  value={state.password}
                />
              </div>

              <button className="px-8 w-full py-2 bg-[#9b665e] shadow-lg hover:shadow-[#9b665e] text-white  mb-4">
                Register
              </button>

              <div className="flex justify-center items-center py-2">
                <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                <span className="px-3 text-[#2f2f2f]">Or</span>
                <div className="h-[1px] bg-slate-300 w-[95%]"></div>
              </div>
            </form>

            <div className="text-center text-[#2f2f2f] pt-1">
              <p>
                You Have No Account?{" "}
                <Link className="text-blue-500" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="flex-1 p-8 flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dxowg9liw/image/upload/v1722182679/login_kpgti3.jpg"
              alt=""
              className="max-h-full w-auto "
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;

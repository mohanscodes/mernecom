import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { customer_login, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    // console.log(state);
    dispatch(customer_login(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        email: "",
        password: "",
      });
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      {/* Loader */}
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}
      <Header />

      <div className="bg-[#f7f4ef] min-h-screen flex justify-center items-center">
        <div className="flex sm:flex-col w-full max-w-4xl p-10 items-center  md:items-stretch">
          {/* Login form */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h2 className="text-center w-full text-xl text-[#2f2f2f] font-bold mb-6">
              Login
            </h2>

            <form onSubmit={login} className="text-[#2f2f2f]">
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="email">Email</label>
                <input
                  onChange={inputHandle}
                  value={state.email}
                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#9b665e]"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="password">Password</label>
                <input
                  onChange={inputHandle}
                  value={state.password}
                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#9b665e]"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>

              <button className="px-8 w-full py-2 bg-[#9b665e] shadow-lg hover:shadow-[#9b665e] text-white mb-4">
                Login
              </button>
            </form>

            <div className="flex justify-center items-center py-2">
              <div className="h-[1px] bg-slate-300 w-[95%]"></div>
              <span className="px-3 text-[#2f2f2f]">Or</span>
              <div className="h-[1px] bg-slate-300 w-[95%]"></div>
            </div>

            <div className="text-center text-[#2f2f2f] pt-1">
              <p>
                Don't Have An Account?{" "}
                <Link className="text-blue-500" to="/register">
                  Register
                </Link>
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 p-8 md:flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dxowg9liw/image/upload/v1722182679/login_kpgti3.jpg"
              className="h-[90%] w-auto"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

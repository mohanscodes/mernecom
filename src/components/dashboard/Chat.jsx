import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  add_friend,
  messageClear,
  send_message,
  updateMessage,
} from "../../store/reducers/chatReducer";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { FaList } from "react-icons/fa";

const socket = io("http://localhost:5000");

const Chat = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { fb_messages, currentFd, my_friends, successMessage } = useSelector(
    (state) => state.chat
  );
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, [userInfo.id, userInfo]);

  useEffect(() => {
    if (sellerId) {
      dispatch(add_friend({ sellerId, userId: userInfo.id }));
    }
  }, [sellerId, userInfo.id, dispatch]);

  const send = () => {
    if (text) {
      dispatch(
        send_message({
          userId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReceverMessage(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", fb_messages[fb_messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage, fb_messages, dispatch]);

  useEffect(() => {
    if (receverMessage) {
      if (
        sellerId === receverMessage.senderId &&
        userInfo.id === receverMessage.receverId
      ) {
        dispatch(updateMessage(receverMessage));
      } else {
        toast.success(`${receverMessage.senderName} sent a message`);
        dispatch(messageClear());
      }
    }
  }, [receverMessage, sellerId, userInfo.id, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fb_messages]);

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="w-full flex">
        <div
          className={`w-[230px] md-lg:absolute bg-white md-lg:h-full ${
            show ? "left-0" : "-left-[350px]"
          } transition-all duration-300`}
        >
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <AiOutlineMessage />
            <span>Message</span>
          </div>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3 overflow-y-auto">
            {my_friends.map((f, i) => (
              <Link
                to={`/dashboard/chat/${f.fdId}`}
                key={i}
                className="flex gap-2 justify-start items-center pl-2 py-2"
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {activeSeller.some((c) => c.sellerId === f.fdId) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  )}
                  <img src={f.image} alt="" className="rounded-full" />
                </div>
                <span>{f.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[calc(100%-230px)] md-lg:w-full">
          {currentFd ? (
            <div className="w-full h-full">
              <div className="flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="flex gap-2">
                  <div className="w-[30px] h-[30px] rounded-full relative">
                    {activeSeller.some((c) => c.sellerId === currentFd.fdId) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                    )}
                    <img src={currentFd.image} alt="" className="rounded-full" />
                  </div>
                  <span>{currentFd.name}</span>
                </div>

                <div
                  onClick={() => setShow(!show)}
                  className="w-[35px] h-[35px] hidden md-lg:flex cursor-pointer rounded-sm justify-center items-center bg-sky-500 text-white"
                >
                  <FaList />
                </div>
              </div>
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {fb_messages.map((m, i) => (
                    <div
                      ref={scrollRef}
                      key={i}
                      className={`w-full flex gap-2 items-center text-[14px] ${
                        currentFd.fdId !== m.receverId
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <img
                        className="w-[30px] h-[30px] rounded-full"
                        src="http://localhost:3000/images/user.png"
                        alt=""
                      />
                      <div
                        className={`p-2 rounded-md text-white ${
                          currentFd.fdId !== m.receverId
                            ? "bg-purple-500"
                            : "bg-cyan-500"
                        }`}
                      >
                        <span>{m.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer">
                    <AiOutlinePlus />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Input message"
                    className="w-full rounded-full h-full outline-none p-3"
                  />
                  <div className="text-2xl right-2 top-2 absolute cursor-pointer">
                    <GrEmoji />
                  </div>
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                  <div onClick={send} className="text-2xl cursor-pointer">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setShow(true)}
              className="w-full h-[400px] flex justify-center items-center text-lg font-bold text-slate-600"
            >
              <span>Select Seller</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

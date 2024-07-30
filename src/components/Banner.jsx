import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { get_banners } from "../store/reducers/homeReducer";

const Banner = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    dispatch(get_banners());
  }, [dispatch]);

  return (
    <div className="w-full md-lg">
      {/* w-[85%] lg:w-[90%] mx-auto */}
      <div className="w-[100%] ">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full">
            <div className="my-0">
              <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                keyBoardControl={true}
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {banners.length > 0 &&
                  banners.map((b, i) => (
                    <div key={i}>
                      <div className="relative">
                        <div>
                          <img src={b.banner} alt="" />
                        </div>
                        <div
                          className={
                            "absolute top-[35%] md:top-[40%] sm:top-[20%] left-[10%] sm:left-[5%] p-4 flex flex-col gap-4 sm:gap-2"
                          }
                        >
                          <p
                            className={
                              b.banner ===
                              "http://res.cloudinary.com/dcisvww0d/image/upload/v1722146029/banners/hvnks7ojfh1zrfo6wpfe.png"
                                ? " text-4xl sm:text-xs text-white"
                                : "text-4xl sm:text-xs"
                            }
                          >
                            100% Original Products
                          </p>
                          <h1
                            className={
                              b.banner ===
                              "http://res.cloudinary.com/dcisvww0d/image/upload/v1722146029/banners/hvnks7ojfh1zrfo6wpfe.png"
                                ? "font-bold sm:font-semibold text-4xl sm:text-xs font-serif text-5xl sm:text-xs text-white"
                                : "font-bold sm:font-semibold text-4xl sm:text-xs font-serif text-5xl sm:text-xs"
                            }
                          >
                            Family Jewelry Collection
                          </h1>
                          <p
                          className={
                            b.banner ===
                            "http://res.cloudinary.com/dcisvww0d/image/upload/v1722146029/banners/hvnks7ojfh1zrfo6wpfe.png"
                              ? "text-4xl sm:text-xs text-white"
                              : "text-4xl sm:text-xs"
                          }
                          >
                            This Month From{" "}
                            <b className="text-red-600">₹ 59.00</b>
                          </p>
                          <div>
                            <button className="sm:hidden bg-[#000000] px-3 py-3 text-4xl text-white sm:hidden">
                              Shop Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

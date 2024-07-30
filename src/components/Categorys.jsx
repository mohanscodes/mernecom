import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

const Categorys = ({ categorys }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="w-[87%] mx-auto relative sm:hidden">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-3xl sm:text-3xl text-[#2f2f2f] font-bold relative pb-[10px]">
          <h2 >Top Category </h2>
          <div className="w-[100px] h-[2px] bg-[#b89f7b] mt-4"></div>
        </div>
      </div>

      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
        additionalTransform={0}
      >
        {categorys.concat(categorys).map((c, i) => (
          <Link className="block" key={i} to={`/products?category=${c.name}`}>
            <div className="w-full h-full relative px-2">
              <div className="w-full h-full border-[2px] rounded-full overflow-hidden flex justify-center items-center bg-gray-100">
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                <span className="py-[2px] px-6 bg-[#0e0e0eea] text-white">
                  {c.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categorys;

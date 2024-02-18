"use client";
import { Key, useState } from "react";

const SliderBanner = ({ banners }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? banners.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === banners.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex">
          {banners.map(
            (
              banner: {
                pcImageUrl: string | undefined;
                title: string | undefined;
                mobileImageUrl: string | undefined;
              },
              index: Key | null | undefined
            ) => (
              <div
                key={index}
                className={`w-full ${
                  index === currentSlide ? "block" : "hidden"
                } transition-transform duration-300 ease-in-out transform`}
                // style={{ translateX: `-${currentSlide * 100}%` }}
              >
                <img
                  src={banner.pcImageUrl}
                  alt={banner.title}
                  className="w-full hidden md:block"
                />
                <img
                  src={banner.mobileImageUrl}
                  alt={banner.title}
                  className="w-full md:hidden"
                />
              </div>
            )
          )}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default SliderBanner;

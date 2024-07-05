"use client";
import Link from "next/link";
import { Autoplay, Controller, Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const MainCarouselCard = ({ sliderData, storeCustomizationSetting }) => {
  return (
    <div className="w-full flex">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 150000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={
          (storeCustomizationSetting?.slider?.bottom_dots ||
            storeCustomizationSetting?.slider?.both_slider) && {
            clickable: true,
          }
        }
        navigation={
          (storeCustomizationSetting?.slider?.left_right_arrow ||
            storeCustomizationSetting?.slider?.both_slider) && {
            clickable: true,
          }
        }
        modules={[Autoplay, Navigation, Pagination, Controller]}
        updateOnWindowResize
        observer
        observeParents
        initialSlide={0}
        className="mySwiper"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide
            className="h-full relative rounded-lg overflow-hidden"
            key={index + 1}
          >
            <div className="text-sm text-gray-600 hover:text-emerald-dark h-400px">
              <img
                width="100%"
                height="400px"
                src={`${item.image}`}
                alt={`slider-image`}
                className="w-full flex object-contain"
              />
            </div>

            <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full h-full place-items-start justify-center">
              <div className="pl-4 pr-12 sm:pl-10 sm:pr-16 w-10/12 lg:w-8/12 xl:w-7/12">
                <h1 className="mb-2 font-serif text-xl sm:text-lg md:text-2xl line-clamp-1 md:line-clamp-none  lg:line-clamp-none  lg:text-3xl font-bold text-gray-800">
                  {item.title}
                </h1>
                <p className="text-base leading-6 text-gray-600 font-sans line-clamp-1  md:line-clamp-none lg:line-clamp-none">
                  {item.info}
                </p>
                <Link
                  href={item.url}
                  style={{
                    backgroundColor:
                      storeCustomizationSetting?.color?.bg_button?.hex,
                  }}
                  className={`bg-gray-800 text-white hidden sm:inline-block lg:inline-block text-sm leading-6 font-serif font-medium mt-6 px-6 py-2 text-center rounded-md hover:bg-gray-900`}
                >
                  {item.buttonName}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainCarouselCard;

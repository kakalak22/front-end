import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { image1 } from "../../../assets";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

import { EffectCreative } from "swiper";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper";
import "./Carousel.scss";
import { Container } from "react-bootstrap";

export default function Carousel() {
  return (
    <Container style={{ paddingTop: "10px" }}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        draggable={true}
        navigation={true}
        modules={[EffectCreative, Pagination, Navigation]}
        className="mySwiper"
        spaceBetween={40}
        effect={"creative"}
        creativeEffect={{
          prev: {
            translate: [0, 0, -1000],
            opacity: 0,
            scale: 0,
          },
          next: {
            translate: [0, "100%", 500],
            opacity: 1,
            scale: 1,
            perspective: true,
          },
        }}
      >
        <SwiperSlide>
          <div className="caroulsel-item-wrapper">
            <img className="carousel-img" src={image1} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="caroulsel-item-wrapper">
            <img className="carousel-img" src={image1} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="caroulsel-item-wrapper">
            <img className="carousel-img" src={image1} alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
}

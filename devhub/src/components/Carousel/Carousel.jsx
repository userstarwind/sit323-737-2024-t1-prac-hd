import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from "./Slide";
import slideList from "./slideList";

export default function Carousel() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return (
      <Slider {...settings}>
        {slideList.map((slide) => (
          <Slide
            key={slide.key}
            src={slide.src}
            alt={slide.alt}
            adv={slide.adv}
          />
        ))}
      </Slider>
  );
}

import React from "react";
import Slider from "react-slick";
import classes from "./HeroCarousel.module.scss";

export default function HeroCarousel(props) {
  /**
   * return null needed for react render func
   */
  if (!props) return null;

  const { title, carouselImages } = props;
  const customClass = null;
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  return (
    <div className={`${classes.oHeroCarouselBanner} ${classes[customClass]}`}>
      <Slider {...settings} className={`${classes.oCarouselRegion}`}>
        {carouselImages.map((item, index) => (
          <div key={index} className={classes.oCarouselItem}>
            <figure
              className={classes.aImage}
              style={{
                backgroundImage: `url(https:${item.fields.image.fields.file.url})`,
              }}
            ></figure>
            <h5
              className={classes.mImageText}
              style={{
                [item.fields.horizontalPosition]: [
                  item.fields.horizontalPositionValue,
                ],
                [item.fields.verticalPosition]: [
                  item.fields.verticalPositionValue,
                ],
              }}
            >
              {item.fields.title}
            </h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}

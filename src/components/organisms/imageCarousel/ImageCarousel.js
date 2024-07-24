import Image from "next/image";
import classes from "./ImageCarousel.module.scss";
import Slider from "react-slick";

export default function ImageCarousel(contentModule) {
  const { title, images } = contentModule.contentModule;

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    margin: 30,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: true,
          infinite: true,
          speed: 3000,
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: true,
          infinite: true,
          speed: 3000,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
    ],
  };
  return (
    <section className={classes.oImageCarousel}>
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row`}>
          <div className={`${classes.oCol} col`}>
            <h2 className={`${classes.aTitle} fntH2`}>{title}</h2>
          </div>
        </div>
        <div className={`${classes.oRow} row`}>
          <div className={`${classes.oCol} col`}>
            <Slider {...settings} className={`${classes.oImageSlider} `}>
              {images.map((item, index) => (
                <figure className={`${classes.mImage}`} key={index}>
                  <span
                    className={`${classes.aImage}`}
                    style={{
                      backgroundImage: `url(https:${item.fields.image.fields?.file?.url})`,
                    }}
                  ></span>
                </figure>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Slider from "react-slick";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./TitleImageCopyCardCarousel.module.scss";

export default function TitleImageCopyCardCarousel(contentModule) {
  const { title, cards, customClass } = contentModule.contentModule;
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    rows: 3,
    slidesPerRow: 1,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
  };
  return (
    <div
      className={`${classes.oTitleImageCopyCardCarousel} ${classes[customClass]}`}
    >
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row no-gutters`}>
          <div className={`${classes.oRow} col`}>
            <h2>{title}</h2>
          </div>
        </div>
        <div className={`${classes.oRow} row no-gutters`}>
          <div className={`${classes.oRow} col-12`}>
            <h3 className={classes.aSubTitle}>Non-Executive Directors</h3>
          </div>
        </div>
        <div
          className={`${classes.oRow} ${classes.carouselRow} row no-gutters`}
        >
          {cards
            .filter(
              (filteredCard) => filteredCard.fields.customClass == "executive"
            )
            .map((item, index) => (
              <div
                key={index}
                className={`${classes.oCard} oCard hoverCard col-12 col-md-3`}
              >
                <figure
                  className={`${classes.aImage} aImage`}
                  style={{
                    backgroundImage: `url(https:${item.fields.image.fields.file.url})`,
                  }}
                ></figure>
                <div className={`${classes.mBody} mBody`}>
                  <h5 className={`${classes.aCardTitle} aCardTitle`}>
                    {item.fields.title}
                  </h5>
                  <div className={`${classes.mCardCopy} mCardCopy`}>
                    {documentToReactComponents(item.fields.copy)}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={`${classes.oRow} row no-gutters`}>
          <div className={`${classes.oRow} col-12`}>
            <h3 className={classes.aSubTitle}>Management Team</h3>
          </div>
        </div>
        <div className={`${classes.oRow} ${classes.manTeamRow} row no-gutters`}>
          {cards
            .filter(
              (filteredCard) => filteredCard.fields.customClass == "management"
            )
            .map((item, index) => (
              <div
                key={index}
                className={`${classes.oCard} oCard hoverCard col-12 col-md-2`}
              >
                <figure
                  className={`${classes.aImage} aImage`}
                  style={{
                    backgroundImage: `url(https:${item.fields.image.fields.file.url})`,
                  }}
                ></figure>
                <div className={`${classes.mBody} mBody`}>
                  <h5 className={`${classes.aCardTitle} aCardTitle`}>
                    {item.fields.title}
                  </h5>
                  <div className={`${classes.mCardCopy} mCardCopy`}>
                    {documentToReactComponents(item.fields.copy)}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={`${classes.oRow} row no-gutters`}>
          <div className={`${classes.oCol} col-12`}>
            <h3 className={classes.aSubTitle}>The Team</h3>
          </div>
        </div>
        <Slider {...settings} className={`${classes.oCarouselRegion}`}>
          {cards
            .filter(
              (filteredCard) => filteredCard.fields.customClass == "staff"
            )
            .map((item, index) => (
              <div key={index} className={`${classes.oCard} oCard hoverCard`}>
                <figure
                  className={`${classes.aImage} aImage`}
                  style={{
                    backgroundImage: `url(https:${item.fields.image.fields.file.url})`,
                  }}
                ></figure>
                <div className={`${classes.mBody} mBody`}>
                  <h5 className={`${classes.aCardTitle} aCardTitle`}>
                    {item.fields.title}
                  </h5>
                  <div className={`${classes.mCardCopy} mCardCopy`}>
                    {documentToReactComponents(item.fields.copy)}
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}

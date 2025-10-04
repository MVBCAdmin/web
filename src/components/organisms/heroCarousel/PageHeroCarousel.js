import Image from "next/image";
import classes from "./HeroCarousel.module.scss";

export default function PageHeroCarousel(contentModule) {
  const { title, imagesCollection } = contentModule.contentModule;
  // Use first image instead of random to avoid hydration mismatch
  const selectedImage = imagesCollection.items[0]?.url;

  return (
    <section className={classes.oPageHeroCarousel}>
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row`}>
          <div className={`${classes.oCol} col`}>
            <h1 className={`${classes.aPageTitle} fntH1`}>{title}</h1>
          </div>
        </div>
      </div>

      <div
        className={classes.oBackgroundImage}
        style={{
          backgroundImage: `url(${selectedImage})`,
        }}
      ></div>
    </section>
  );
}

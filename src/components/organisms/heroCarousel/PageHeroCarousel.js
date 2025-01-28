import Image from "next/image";
import classes from "./HeroCarousel.module.scss";

export default function PageHeroCarousel(contentModule) {
  const { imagesCollection } = contentModule.contentModule;
  const randomImage =
    imagesCollection.items[`${Math.floor(Math.random() * 10) + 1}`].url;

  return (
    <section className={classes.oPageHeroCarousel}>
      {/* <figure className={`${classes.mLogo}`}>
        <Image
          src={`https://${logo.fields.file.url}`}
          alt={`text`}
          width={logo.fields.file.details.image.width}
          height={logo.fields.file.details.image.height}
          className={`${classes.aImage}`}
          quality={100}
        />
      </figure> */}
      <div
        className={classes.oBackgroundImage}
        style={{
          backgroundImage: `url(${randomImage})`,
        }}
      ></div>
    </section>
  );
}

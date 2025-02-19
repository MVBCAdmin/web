import Image from "next/image";
import classes from "./HeroCarousel.module.scss";

export default function HeroCarousel(contentModule) {
  const { title, logo, images } = contentModule.contentModule.fields;
  const randomImage = images[`${Math.floor(Math.random() * 10) + 1}`].fields;

  return (
    <section className={classes.introBlock}>
      <figure className={`${classes.mLogo}`}>
        <Image
          src={`https://${logo.fields.file.url}`}
          alt={`text`}
          width={logo.fields.file.details.image.width}
          height={logo.fields.file.details.image.height}
          className={`${classes.aImage}`}
          quality={100}
        />
      </figure>
      <div
        className={classes.oBackgroundImage}
        style={{
          backgroundImage: `url(https://${randomImage.file.url})`,
        }}
      ></div>
    </section>
  );
}

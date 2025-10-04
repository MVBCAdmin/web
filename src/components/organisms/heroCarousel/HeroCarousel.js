import Image from "next/image";
import classes from "./HeroCarousel.module.scss";

export default function HeroCarousel(contentModule) {
  const { title, logo, images } = contentModule.contentModule.fields;
  // Use first image instead of random to avoid hydration mismatch
  const selectedImage = images[0]?.fields || images[1]?.fields;

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
          priority
        />
      </figure>
      <div
        className={classes.oBackgroundImage}
        style={{
          backgroundImage: `url(https://${selectedImage?.file.url})`,
        }}
      ></div>
    </section>
  );
}

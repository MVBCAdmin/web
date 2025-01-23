import Image from "next/image";
import classes from "./HeroCarousel.module.scss";
import { LogoSVG } from "@/assets/html/svg--logoMvbc";

export default function PageHeroCarousel(contentModule) {
  const { imagesCollection } =
    contentModule.contentModule?.fields || contentModule.contentModule;
  const { images } = imagesCollection.items;
  const randomImage = images[`${Math.floor(Math.random() * 10) + 1}`].fields;

  console.log("contentModule", contentModule);
  return (
    <section className={classes.introBlock}>
      <figure className={`${classes.mLogo}`}>
        <LogoSVG />
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

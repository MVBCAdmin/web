import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./ComponentSimpleTitle.module.scss";

export default function ComponentSimpleTitle(contentModule) {
  const { title, shortText } = contentModule.contentModule.fields;
  return (
    <section className={classes.introBlock}>
      <h1 className={`${classes.aTitle} fntH1`}>{title}</h1>
      <div>{documentToReactComponents(shortText)}</div>
    </section>
  );
}

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./News.module.scss";

const {
  C_DELIVERY_KEY,
  C_GRAPHQL_URL,
} = require("../../helpers/contentful-config");
const { NEWS_CONTENT, NEWS_SLUG } = require("../../helpers/data/CONTENT_NEWS");

/**
 * Initial page load to access users browser information
 *
 * @returns {JSX.Element}
 * @constructor
 */

export default function News({ news }) {
  console.log("news", news);
  const { title } = news;

  return (
    <div className={classes.oProductPage}>
      <div className={`container`}>
        <div className={`row`}>
          <div className={`${classes.oImage} col-12 col-md-6`}>{title}</div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { news } = params;

  const result = await fetch(C_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${C_DELIVERY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: NEWS_CONTENT,
      variables: {
        slug: news,
      },
    }),
  });

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const [newsData] = data.pageBlogCollection.items;

  return {
    props: {
      news: newsData,
    },
  };
}

export async function getStaticPaths() {
  const result = await fetch(C_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${C_DELIVERY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: NEWS_SLUG,
    }),
  });

  if (!result.ok) {
    return {};
  }

  const { data } = await result.json();
  const newsSlug = data.pageBlogCollection.items;
  const paths = newsSlug.map(({ slug }) => {
    return {
      params: { news: slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

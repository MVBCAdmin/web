import classes from "./Page.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import HeroCarousel from "@/components/organisms/heroCarousel/PageHeroCarousel";

const {
  C_DELIVERY_KEY,
  C_GRAPHQL_URL,
} = require("../../helpers/contentful-config");
const { PAGE_CONTENT, PAGE_SLUG } = require("../../helpers/data/CONTENT_PAGES");

/**
 * Initial page load to access users browser information
 *
 * @returns {JSX.Element}
 * @constructor
 */

export async function getStaticProps({ params }) {
  const { page } = params;

  const result = await fetch(C_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${C_DELIVERY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: PAGE_CONTENT,
      variables: {
        slug: page,
      },
    }),
  });

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const [pageData] = data.pagePageCollection.items;

  return {
    props: {
      page: pageData,
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
      query: PAGE_SLUG,
    }),
  });

  if (!result.ok) {
    return {};
  }

  const { data } = await result.json();
  const pageSlug = data.pagePageCollection.items;
  const paths = pageSlug.map(({ slug }) => {
    return {
      params: { page: slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default function Page({ page }) {
  const { 0: componentHeroBanner, 1: subcomponentBodyText } =
    page.componentsCollection.items;
  const bodyText = subcomponentBodyText.copy.json;
  return (
    <div className={classes.oProductPage}>
      <HeroCarousel contentModule={componentHeroBanner} />
      <div className={`container`}>
        <div className={`row`}>
          <div className={`${classes.oBody} oBodyCopy col-12`}>
            {documentToReactComponents(bodyText)}
          </div>
        </div>
      </div>
    </div>
  );
}

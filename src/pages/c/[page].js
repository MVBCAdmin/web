import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Router from "next/router";
import Footer from "../../components/blocks/footer/Footer";
import classes from "./Page.module.scss";

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

export default function Page({ page, pageFooter }) {
  const { title, copy } = page;
  console.log("page2222", page);

  return (
    <div className={classes.oPage}>
      <div className={`container`}>
        <div className={`row`}>
          <h1 className={`${classes.aTitle} col-12`}>{title}</h1>
        </div>

        <div className={`row`}>
          <div className={`${classes.mBody} col-12`}>
            {documentToReactComponents(copy.json)}
          </div>
        </div>

        <div className={`${classes.oRow} row`}>
          <div className={`${classes.oCol} col`}>
            <div
              className={`${classes.aTextLink} aTextLink fnt24`}
              onClick={() => Router.back()}
            >
              BACK
            </div>
          </div>
        </div>
      </div>
      <Footer {...pageFooter} />
    </div>
  );
}

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
  const pageFooter = data.componentFooter;

  return {
    props: { page: pageData, pageFooter },
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

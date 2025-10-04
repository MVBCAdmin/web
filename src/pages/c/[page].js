import classes from "./Page.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import HeroCarousel from "@/components/organisms/heroCarousel/PageHeroCarousel";
import Menu from "@/components/organisms/menu/Menu";
import Footer from "@/components/organisms/footer/Footer";

const {
  C_DELIVERY_KEY,
  C_GRAPHQL_URL,
} = require("../../helpers/contentful-config");
const {
  PAGE_CONTENT,
  PAGE_SLUG,
  PAGE_MENU,
} = require("../../helpers/data/CONTENT_PAGES");
const { FOOTER_CONTENT } = require("../../helpers/data/CONTENT_GLOBAL");

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

  const menuResult = await fetch(C_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${C_DELIVERY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: PAGE_MENU,
    }),
  });

  const footerResult = await fetch(C_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${C_DELIVERY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: FOOTER_CONTENT,
    }),
  });

  if (!result.ok || !menuResult.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const { data: menuData } = await menuResult.json();
  const [pageData] = data.pagePageCollection.items;
  const menu = menuData.componentMenu;

  // Handle footer data - make it optional for now
  let footer = null;
  if (footerResult.ok) {
    try {
      const { data: footerData } = await footerResult.json();
      footer = footerData.componentFooter;
    } catch (error) {
      console.log("Footer data not available yet:", error.message);
    }
  }

  return {
    props: {
      page: pageData,
      menu: menu,
      footer: footer,
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

export default function Page({ page, menu, footer }) {
  const { 0: componentHeroBanner, 1: subcomponentBodyText } =
    page.componentsCollection.items;
  const bodyText = subcomponentBodyText.copy.json;
  return (
    <div className="anchor" id="top">
      <Menu contentModule={menu} />
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
      <Footer contentModule={footer} />
    </div>
  );
}

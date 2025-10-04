import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./News.module.scss";
import HeroCarousel from "@/components/organisms/heroCarousel/PageHeroCarousel";
import Menu from "@/components/organisms/menu/Menu";
import Footer from "@/components/organisms/footer/Footer";
import Image from "next/image";

const {
  C_DELIVERY_KEY,
  C_GRAPHQL_URL,
} = require("../../helpers/contentful-config");
const {
  NEWS_CONTENT,
  NEWS_SLUG,
  NEWS_MENU,
  NEWS_HERO,
} = require("../../helpers/data/CONTENT_NEWS");
const { FOOTER_CONTENT } = require("../../helpers/data/CONTENT_GLOBAL");

/**
 * Initial page load to access users browser information
 *
 * @returns {JSX.Element}
 * @constructor
 */

export default function News({ news, menu, hero, footer }) {
  const { title, copy, image } = news;
  const bodyText = copy?.json || null;

  // Create a modified hero object with the article title
  const heroWithArticleTitle = hero
    ? {
        ...hero,
        title: title,
      }
    : {
        title: title,
        imagesCollection: {
          items: [],
        },
      };

  return (
    <div className="anchor" id="top">
      {menu && <Menu contentModule={menu} />}
      <div className={classes.oProductPage}>
        <HeroCarousel contentModule={heroWithArticleTitle} />
        <div className={`container`}>
          <div className={`row`}>
            {image && (
              <div className={`${classes.oImage} col-12`}>
                <Image
                  src={image.url}
                  alt={image.title || title}
                  width={image.width}
                  height={image.height}
                  className={`${classes.aImage} img-fluid`}
                />
              </div>
            )}
            <div className={`${classes.oBody} oBodyCopy col-12`}>
              {bodyText && documentToReactComponents(bodyText)}
            </div>
          </div>
        </div>
      </div>
      {footer && <Footer contentModule={footer} />}
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

  const menuResult = await fetch(C_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${C_DELIVERY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: NEWS_MENU,
    }),
  });

  const heroResult = await fetch(C_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${C_DELIVERY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: NEWS_HERO,
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

  if (!result.ok || !menuResult.ok || !heroResult.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const { data: menuData } = await menuResult.json();
  const { data: heroData } = await heroResult.json();

  // Check if news data exists
  if (!data?.pageBlogCollection?.items?.length) {
    return {
      notFound: true,
    };
  }

  const [newsData] = data.pageBlogCollection.items;

  // Ensure newsData exists and has required fields
  if (!newsData) {
    return {
      notFound: true,
    };
  }

  const menu = menuData?.componentMenu;
  const hero = heroData?.componentHeroBanner;

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
      news: newsData,
      menu: menu,
      hero: hero,
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

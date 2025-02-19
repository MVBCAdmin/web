import { createClient } from "contentful";
import classes from "./news/News.module.scss";
import HeroCarousel from "@/components/organisms/heroCarousel/HeroCarousel";
import Menu from "@/components/organisms/menu/Menu";
import Link from "next/link";
const { HOME_MENU } = require("../helpers/data/CONTENT_HOME");
const {
  C_GRAPHQL_URL,
  C_SPACE_ID,
  C_DELIVERY_KEY,
} = require("../helpers/contentful-config");

const {
  NEWS_LIST,
  NEWS_MENU,
  NEWS_HERO,
} = require("../helpers/data/CONTENT_NEWS");

export async function getStaticProps() {
  const client = createClient({
    space: C_SPACE_ID,
    accessToken: C_DELIVERY_KEY,
  });

  const resPage = await client
    .getEntries({
      content_type: "pageHome",
    })

    .then((entries) => entries.items);

  const newsResult = await fetch(C_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${C_DELIVERY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: NEWS_LIST,
    }),
  });

  const menuResult = await fetch(C_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${C_DELIVERY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: HOME_MENU,
    }),
  });

  if (!newsResult.ok) {
    return {};
  }

  const { data: newsData } = await newsResult.json();

  const news = newsData.pageBlogCollection.items;
  const { data: menuData } = await menuResult.json();
  const menu = menuData.componentMenu;

  return {
    props: {
      menu,
      Page: resPage,
      news,
    },
    revalidate: 1,
  };
}

export default function Home({ Page, menu, news }) {
  const { 0: HeroBanner } = Page[0].fields.components;
  console.log("newzzzz", news);
  return (
    <div className="anchor" id="top">
      <Menu contentModule={menu} />
      <HeroCarousel contentModule={HeroBanner} />

      {/* dummy content */}
      <div className={`${classes.oNewsArea} container`}>
        <div className="row no-gutters">
          {news
            .filter((article) => article.isFeatured)
            .map((article, index) => (
              <Link
                href={`/news/${article.slug}`}
                key={index}
                className={`${classes.oCard} col-12 col-md-4 col-lg-3`}
              >
                <article className={`${classes.oProjectCard}`}>
                  <figure
                    className={`${classes.mImage}`}
                    style={{
                      backgroundImage: `url(${article.image?.url})`,
                    }}
                  ></figure>
                  <div className={`${classes.mBody}`}>
                    <h3 className={`${classes.aTitle} fontH3`}>
                      {article.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import classes from "./news/News.module.scss";
import PageHeroCarousel from "@/components/organisms/heroCarousel/PageHeroCarousel";
import Menu from "@/components/organisms/menu/Menu";
const {
  NEWS_LIST,
  NEWS_MENU,
  NEWS_HERO,
} = require("../helpers/data/CONTENT_NEWS");
const {
  C_GRAPHQL_URL,
  C_DELIVERY_KEY,
} = require("../helpers/contentful-config");

export async function getStaticProps() {
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

  if (!newsResult.ok || !menuResult.ok || !heroResult.ok) {
    return {};
  }

  const { data: newsData } = await newsResult.json();
  const { data: menuData } = await menuResult.json();
  const { data: heroData } = await heroResult.json();

  const news = newsData.pageBlogCollection.items;
  const menu = menuData.componentMenu;
  const hero = heroData.componentHeroBanner;

  return {
    props: {
      news,
      menu,
      hero,
    },
    revalidate: 1,
  };
}

export default function News({ news, menu, hero }) {
  console.log("noooozzzz", hero);
  return (
    <div className="anchor" id="top">
      <Menu contentModule={menu} />
      {/* <PageHeroCarousel contentModule={hero} /> */}
      <div className={`${classes.oNewsArea} container-fluid`}>
        <div className="row">
          {news.map((article, index) => (
            <Link
              href={`/news/${article.slug}`}
              key={index}
              className={`${classes.oCard} col-12 col-md-6`}
            >
              <article className={`${classes.oProjectCard}`}>
                <figure
                  className={`${classes.mImage}`}
                  style={{
                    backgroundImage: `url(${article?.image?.url})`,
                  }}
                ></figure>
                <div className={`${classes.mBody}`}>
                  <h3 className={`${classes.mCardTitle} fontH3`}>
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

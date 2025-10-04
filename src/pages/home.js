import { createClient } from "contentful";
import classes from "./news/News.module.scss";
import HeroCarousel from "@/components/organisms/heroCarousel/HeroCarousel";
import Menu from "@/components/organisms/menu/Menu";
import Footer from "@/components/organisms/footer/Footer";
import InstagramFeed from "@/components/blocks/instaFeed/InstagramFeed";
import Link from "next/link";
const { HOME_MENU } = require("../helpers/data/CONTENT_HOME");
const { FOOTER_CONTENT } = require("../helpers/data/CONTENT_GLOBAL");
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

// Function to fetch Instagram posts
async function fetchInstagramPosts() {
  try {
    // You'll need to replace this with your actual Instagram API endpoint
    // This is a placeholder - you'll need to set up Instagram Basic Display API
    const response = await fetch("YOUR_INSTAGRAM_API_ENDPOINT", {
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
      },
    });

    if (!response.ok) {
      console.log("Instagram API not available");
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.log("Instagram fetch error:", error.message);
    return [];
  }
}

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

  // Fetch Instagram posts
  const instagramPosts = await fetchInstagramPosts();

  if (!newsResult.ok || !menuResult.ok) {
    return {};
  }

  const { data: newsData } = await newsResult.json();
  const { data: menuData } = await menuResult.json();

  const news = newsData.pageBlogCollection.items;
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
      menu,
      Page: resPage,
      news,
      footer,
      instagramPosts,
    },
    revalidate: 1,
  };
}

export default function Home({ Page, menu, news, footer, instagramPosts }) {
  const { 0: HeroBanner } = Page[0].fields.components;
  return (
    <div className="anchor" id="top">
      <Menu contentModule={menu} />
      <HeroCarousel contentModule={HeroBanner} />

      {/* Instagram Feed */}
      {instagramPosts && instagramPosts.length > 0 && (
        <div className={`${classes.oInstagramFeed} container`}>
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-4">Follow Us on Instagram</h2>
              <InstagramFeed posts={instagramPosts} />
            </div>
          </div>
        </div>
      )}

      {/* Featured Articles */}
      <div className={`${classes.oNewsArea} container`}>
        <div className="row no-gutters">
          {news
            .filter((article) => article.isFeatured)
            .slice(0, 8)
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

      <Footer contentModule={footer} />
    </div>
  );
}

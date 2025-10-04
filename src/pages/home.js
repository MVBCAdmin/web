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

// Fallback function to fetch Instagram posts using manual URLs
async function fetchManualInstagramPosts(appAccessToken) {
  try {
    const instagramPostUrls = process.env.INSTAGRAM_POST_URLS;

    if (!instagramPostUrls) {
      console.log("No manual Instagram URLs configured");
      return [];
    }

    const postUrls = instagramPostUrls.split(",").map((url) => url.trim());
    console.log("Using manual Instagram post URLs:", postUrls);

    const oEmbedUrl = `https://graph.facebook.com/v18.0/instagram_oembed`;
    const posts = [];

    for (const postUrl of postUrls) {
      try {
        const response = await fetch(
          `${oEmbedUrl}?url=${encodeURIComponent(
            postUrl
          )}&access_token=${appAccessToken}`
        );

        if (response.ok) {
          const data = await response.json();
          posts.push({
            html: data.html,
            title: data.title,
            author_name: data.author_name,
            thumbnail_url: data.thumbnail_url,
            url: postUrl,
          });
          console.log(`Successfully fetched oEmbed for: ${postUrl}`);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.log(
            `Failed to fetch oEmbed for ${postUrl}: ${response.status}`,
            errorData
          );
          // Don't add placeholder - only show real Instagram embeds
        }
      } catch (error) {
        console.log(`Error fetching oEmbed for ${postUrl}:`, error.message);
      }
    }

    return posts;
  } catch (error) {
    console.log("Manual Instagram fetch error:", error.message);
    return [];
  }
}

// Function to fetch latest Instagram posts dynamically using App ID/Secret
async function fetchInstagramPosts() {
  try {
    const facebookAppId = process.env.FACEBOOK_APP_ID;
    const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;
    const instagramUsername = process.env.INSTAGRAM_USERNAME;

    console.log("Instagram fetch attempt started");
    console.log("App ID:", facebookAppId ? "Set" : "Missing");
    console.log("App Secret:", facebookAppSecret ? "Set" : "Missing");
    console.log("Username:", instagramUsername);

    if (!facebookAppId || !facebookAppSecret || !instagramUsername) {
      console.log("Facebook/Instagram credentials not configured");
      return [];
    }

    // Generate app access token using App ID and App Secret
    const appAccessToken = `${facebookAppId}|${facebookAppSecret}`;

    // Step 1: Get Instagram Business Account ID from username
    // Remove @ symbol if present
    const cleanUsername = instagramUsername.replace("@", "");
    const instagramAccountUrl = `https://graph.facebook.com/v18.0/${cleanUsername}?fields=instagram_business_account&access_token=${appAccessToken}`;

    console.log("Fetching Instagram account for username:", cleanUsername);
    console.log("Account URL:", instagramAccountUrl);

    const accountResponse = await fetch(instagramAccountUrl);

    if (!accountResponse.ok) {
      const errorData = await accountResponse.json().catch(() => ({}));
      console.log(
        `Failed to fetch Instagram account: ${accountResponse.status}`,
        errorData
      );

      // Fallback to manual URLs for testing
      console.log("Falling back to manual Instagram URLs...");
      return await fetchManualInstagramPosts(appAccessToken);
    }

    const accountData = await accountResponse.json();
    console.log("Instagram account data:", accountData);
    const instagramBusinessAccountId =
      accountData.instagram_business_account?.id;

    if (!instagramBusinessAccountId) {
      console.log(
        "Instagram Business Account not found. Account data:",
        accountData
      );
      return [];
    }

    // Step 2: Get recent media from Instagram Business Account
    const mediaUrl = `https://graph.facebook.com/v18.0/${instagramBusinessAccountId}/media?fields=id,media_type,media_url,permalink,timestamp&limit=4&access_token=${appAccessToken}`;

    const mediaResponse = await fetch(mediaUrl);

    if (!mediaResponse.ok) {
      console.log(`Failed to fetch Instagram media: ${mediaResponse.status}`);
      return [];
    }

    const mediaData = await mediaResponse.json();
    const mediaItems = mediaData.data || [];

    // Step 3: Get oEmbed data for each post
    const oEmbedUrl = `https://graph.facebook.com/v18.0/instagram_oembed`;
    const posts = [];

    for (const mediaItem of mediaItems) {
      try {
        const response = await fetch(
          `${oEmbedUrl}?url=${encodeURIComponent(
            mediaItem.permalink
          )}&access_token=${appAccessToken}`
        );

        if (response.ok) {
          const data = await response.json();
          posts.push({
            html: data.html,
            title: data.title,
            author_name: data.author_name,
            thumbnail_url: data.thumbnail_url,
            url: mediaItem.permalink,
            media_type: mediaItem.media_type,
            timestamp: mediaItem.timestamp,
          });
        } else {
          console.log(
            `Failed to fetch oEmbed for ${mediaItem.permalink}: ${response.status}`
          );
        }
      } catch (error) {
        console.log(
          `Error fetching oEmbed for ${mediaItem.permalink}:`,
          error.message
        );
      }
    }

    return posts;
  } catch (error) {
    console.log("Instagram fetch error:", error.message);
    return [];
  }
}

export async function getServerSideProps() {
  console.log("=== getServerSideProps started ===");
  console.error("=== ERROR LOG TEST ===");

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
  console.log("About to fetch Instagram posts");
  const instagramPosts = await fetchInstagramPosts();
  console.log("Instagram posts fetched:", instagramPosts.length, "posts");

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
  };
}

export default function Home({ Page, menu, news, footer, instagramPosts }) {
  console.log("=== Home component rendered ===");
  console.log("Instagram posts received:", instagramPosts?.length || 0);

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

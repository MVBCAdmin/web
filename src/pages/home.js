import { createClient } from "contentful";
import HeroCarousel from "@/components/organisms/heroCarousel/HeroCarousel";
import Menu from "@/components/organisms/menu/Menu";
const { HOME_MENU } = require("../helpers/data/CONTENT_HOME");
const {
  C_GRAPHQL_URL,
  C_SPACE_ID,
  C_DELIVERY_KEY,
} = require("../helpers/contentful-config");

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

  const { data: menuData } = await menuResult.json();
  const menu = menuData.componentMenu;

  return {
    props: {
      menu,
      Page: resPage,
    },
    revalidate: 1,
  };
}

export default function Home({ Page, menu }) {
  const { 0: HeroBanner } = Page[0].fields.components;
  return (
    <div className="anchor" id="top">
      <Menu contentModule={menu} />
      <HeroCarousel contentModule={HeroBanner} />
      <p
        style={{
          padding: "100px",
          backgroundColor: "yellow",
          marginBottom: "20px",
        }}
      >
        M
      </p>
      <p
        style={{
          padding: "100px",
          backgroundColor: "yellow",
          marginBottom: "20px",
        }}
      >
        M
      </p>
      <p
        style={{
          padding: "100px",
          backgroundColor: "yellow",
          marginBottom: "20px",
        }}
      >
        M
      </p>
      <p
        style={{
          padding: "100px",
          backgroundColor: "yellow",
          marginBottom: "20px",
        }}
      >
        M
      </p>
      <p
        style={{
          padding: "100px",
          backgroundColor: "yellow",
          marginBottom: "20px",
        }}
      >
        M
      </p>
      <p
        style={{
          padding: "100px",
          backgroundColor: "yellow",
          marginBottom: "20px",
        }}
      >
        M
      </p>
      <p
        style={{
          padding: "100px",
          backgroundColor: "yellow",
          marginBottom: "20px",
        }}
      >
        M
      </p>
    </div>
  );
}

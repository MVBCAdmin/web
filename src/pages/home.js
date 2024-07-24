import { createClient } from "contentful";
import HeroCarousel from "../components/organisms/heroCarousel/HeroCarousel";
import TwoColumnMediaText from "../components/organisms/twoColumnMediaText/TwoColumnMediaText";
import TitleImageCopyCardGrid from "../components/organisms/titleImageCopyCardGrid/TitleImageCopyCardGrid";
import TitleImageCopyCardCarousel from "../components/organisms/titleImageCopyCardCarousel/TitleImageCopyCardCarousel";
import VideoPlayer from "../components/organisms/videoPlayer/VideoPlayer";
import TabbedView from "../components/organisms/tabbedView/TabbedView";
import ImageCarousel from "../components/organisms/imageCarousel/ImageCarousel";
import Footer from "../components/blocks/footer/Footer";
import Link from "next/link";
const { C_SPACE_ID, C_DELIVERY_KEY } = require("../helpers/contentful-config");

export async function getStaticProps(context) {
  const client = createClient({
    space: C_SPACE_ID,
    accessToken: C_DELIVERY_KEY,
  });

  const resPage = await client
    .getEntries({
      content_type: "pageHome",
      include: 10,
    })

    .then((entries) => entries.items);

  const resFooter = await client.getEntries({
    content_type: "componentFooter",
    include: 10,
  });

  return {
    props: {
      Page: resPage,
      PageFooter: resFooter.items[0].fields,
    },
    revalidate: 1,
  };
}

export default function Home({ Page, PageFooter }) {
  const heroBanner = Page[0].fields.components[0].fields;
  const visionBlock = Page[0].fields.components[1].fields;
  const missionBlock = Page[0].fields.components[2].fields;
  const cardGrid = Page[0].fields.components[3].fields;
  const staff = Page[0].fields.components[4].fields;
  const videoPlayer = Page[0].fields.components[5].fields;
  const partnerLogos = Page[0].fields.components[6].fields;
  const tabbedCareers = Page[0].fields.components[7].fields;

  return (
    <div className="anchor" id="top">
      <HeroCarousel {...heroBanner} />
      <TwoColumnMediaText contentModule={visionBlock} />
      <TwoColumnMediaText contentModule={missionBlock} />
      <TitleImageCopyCardGrid contentModule={cardGrid} />
      <TitleImageCopyCardCarousel contentModule={staff} />
      <ImageCarousel contentModule={partnerLogos} />
      <VideoPlayer contentModule={videoPlayer} />
      <TabbedView contentModule={tabbedCareers} />
      <div className={`container`}>
        <div className={`row`}>
          <div className={`col mVacancyCtaBlock`}>
            <Link href="/vacancies" className="aTextLink fnt18">
              <span>VIEW CURRENT VACANCIES HERE</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer {...PageFooter} />
    </div>
  );
}

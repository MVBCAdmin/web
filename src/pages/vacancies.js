import { createClient } from "contentful";
import Router from "next/router";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Footer from "../components/blocks/footer/Footer";
const { C_SPACE_ID, C_DELIVERY_KEY } = require("../helpers/contentful-config");
import classes from "./v/Page.module.scss";

export async function getStaticProps() {
  const client = createClient({
    space: C_SPACE_ID,
    accessToken: C_DELIVERY_KEY,
  });

  const resFooter = await client.getEntries({
    content_type: "componentFooter",
    include: 10,
  });

  const resJobs = await client.getEntries({
    content_type: "pageVacancies",
    include: 10,
  });

  return {
    props: {
      Jobs: resJobs,
      PageFooter: resFooter.items[0].fields,
    },
    revalidate: 1,
  };
}

export default function Vacancies({ Jobs, PageFooter }) {
  const { title, teaserCopy, copy } = Jobs;
  const jobList = Jobs.items;
  return (
    <div className={classes.oVacanciesPage} id="top">
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row`}>
          <div className={`${classes.oCol} col`}>
            <h1 className={`${classes.aTitle} fntH2`}>Current Vacancies</h1>
          </div>
        </div>
        <div className={`${classes.oRow} row`}>
          {jobList.map((item, index) => (
            <div key={index} className={`${classes.oColJobList} col`}>
              <div className={`${classes.oCard}`}>
                <div className={`${classes.mHead}`}>
                  <a
                    className={`${classes.aLink}`}
                    href={`/v/${item.fields.slug}`}
                  >
                    <span>{item.fields.title}</span>
                  </a>
                </div>
                <div className={`${classes.mBody}`}>
                  {documentToReactComponents(item.fields.teaserCopy)}
                  <div className={`${classes.mFooter}`}>
                    <a
                      className={`${classes.aLink} aTextLink`}
                      href={`/v/${item.fields.slug}`}
                    >
                      READ MORE ...
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
      <Footer {...PageFooter} />
    </div>
  );
}

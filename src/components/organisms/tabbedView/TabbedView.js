import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import classes from "./TabbedView.module.scss";

export default function TabbedView(contentModule) {
  const { title, showTitle, tabs } = contentModule.contentModule;
  return (
    <section className={classes.oTabbedView}>
      {showTitle ? (
        <div className={`${classes.oContainer} container`}>
          <div className={`${classes.oRow} row`}>
            <div className={`${classes.oCol} col`}>
              <h2 className={`${classes.aTitle} fntH2`}>{title}</h2>
            </div>
          </div>
        </div>
      ) : null}
      <Tabs>
        <TabList className={classes.oTabs}>
          {tabs.map((item, index) => (
            <Tab key={index} className={`${classes.mTab} fnt18`}>
              <span>{item.fields.title}</span>
            </Tab>
          ))}
        </TabList>
        {tabs.map((item, index) => (
          <TabPanel key={index} className={`${classes.oTab} oTab`}>
            {documentToReactComponents(item.fields.copy)}
          </TabPanel>
        ))}
      </Tabs>
    </section>
  );
}

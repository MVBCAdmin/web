import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./TwoColumnMediaText.module.scss";

function TwoColumnMediaText({ contentModule }) {
  const [mobileView, setMobileView] = useState();
  const { title, copy, image, videoLink, mediaOnLeft, customClass } =
    contentModule;

  useEffect(() => {
    setMobileView(isMobile);
  }, []);

  return (
    <section
      className={`${classes.oTextImageBlock} ${
        videoLink ? classes.noHeight : classes.fullHeight
      } ${classes[`${customClass}`]}`}
    >
      <div className={`${classes.oContainer} container`}>
        {mobileView ? (
          <div className={`${classes.oRow} row no-gutters`}>
            <div
              className={`${classes.oColImage} ${classes.oContentCol} col-12 col-md-6`}
            >
              <h2 className={`${classes.aTitle} fntH2`}>{title}</h2>
              {videoLink ? (
                <div className={`${classes.mVideo}`}>
                  <iframe
                    width="560"
                    height="315"
                    src={videoLink}
                    className={`${classes.aVideo}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <figure
                  className={`${classes.mImage}`}
                  style={{
                    backgroundImage: `url(http:${image.fields.file.url})`,
                  }}
                ></figure>
              )}
            </div>
            <div
              className={`${classes.oColText} ${classes.oContentCol} col-12 col-md-6`}
            >
              <div className={`${classes.mCopy} mCopy`}>
                {documentToReactComponents(copy)}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${classes.oRow} row no-gutters ${
              mediaOnLeft ? classes.left : classes.right
            }`}
          >
            <div
              className={`${classes.oColText} ${classes.oContentCol} col-12 col-md-6`}
            >
              {!mediaOnLeft ? (
                <h2 className={`${classes.aTitle} fntH2`}>{title}</h2>
              ) : null}

              <div className={`${classes.mCopy} mCopy`}>
                {documentToReactComponents(copy)}
              </div>
            </div>
            <div
              className={`${classes.oColImage} ${classes.oContentCol} col-12 col-md-6`}
            >
              {!mediaOnLeft ? null : (
                <h2 className={`${classes.aTitle} fntH2`}>{title}</h2>
              )}
              {videoLink ? (
                <div className={`${classes.mVideo}`}>
                  <iframe
                    width="560"
                    height="315"
                    src={videoLink}
                    className={`${classes.aVideo}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <figure
                  className={`${classes.mImage}`}
                  style={{
                    backgroundImage: `url(http:${image.fields.file.url})`,
                  }}
                ></figure>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TwoColumnMediaText;

import classes from "./Footer.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

export default function Footer({ contentModule }) {
  // Handle case when footer data is not available yet
  if (!contentModule) {
    return null;
  }

  const { title, logo, columnOneCopy, columnTwoCopy, socialMediaMenu } =
    contentModule;

  return (
    <footer className={classes.oFooter}>
      <div className="container">
        <div className="row">
          {/* Logo Column */}
          <div className={`${classes.oLogoColumn} col-12 col-md-4`}>
            {logo && (
              <div className={classes.mLogo}>
                <Image
                  src={logo.url}
                  alt={logo.title || title || "Logo"}
                  width={logo.width || 200}
                  height={logo.height || 100}
                  className="img-fluid"
                />
              </div>
            )}
          </div>

          {/* Column One */}
          <div className={`${classes.oColumnOne} col-12 col-md-4`}>
            {columnOneCopy && (
              <div className={classes.mColumnContent}>
                {documentToReactComponents(columnOneCopy.json)}
              </div>
            )}
          </div>

          {/* Column Two */}
          <div className={`${classes.oColumnTwo} col-12 col-md-4`}>
            {columnTwoCopy && (
              <div className={classes.mColumnContent}>
                {documentToReactComponents(columnTwoCopy.json)}
              </div>
            )}
          </div>
        </div>

        {/* Social Media Links - Full Width */}
        {socialMediaMenu && (
          <div className={`${classes.oSocialMedia} row`}>
            <div className="col-12">
              <div className={classes.mSocialMenu}>
                <ul className={classes.aSocialList}>
                  {socialMediaMenu.menuItemsCollection?.items.map(
                    (item, index) => (
                      <li key={index} className={classes.mSocialItem}>
                        {item.customClass === "social-media" ? (
                          // Social media icon only (no text)
                          item.isExternal ? (
                            <a
                              href={item.url}
                              className={item.customClass}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={item.label}
                              style={{
                                width: "40px",
                                height: "40px",
                                display: "inline-block",
                                backgroundImage: `url(${item.image?.url})`, // Use image field URL
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                textIndent: "-9999px", // Hide text
                                overflow: "hidden",
                              }}
                            >
                              {item.label}
                            </a>
                          ) : (
                            <a
                              href={item.url}
                              className={item.customClass}
                              aria-label={item.label}
                              style={{
                                width: "40px",
                                height: "40px",
                                display: "inline-block",
                                backgroundImage: `url(${item.image?.url})`, // Use image field URL
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                textIndent: "-9999px", // Hide text
                                overflow: "hidden",
                              }}
                            >
                              {item.label}
                            </a>
                          )
                        ) : // Regular menu item with text
                        item.isExternal ? (
                          <a
                            href={item.url}
                            className={item.customClass}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                          >
                            {item.label}
                          </a>
                        ) : (
                          <a
                            href={item.url}
                            className={item.customClass}
                            aria-label={item.label}
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

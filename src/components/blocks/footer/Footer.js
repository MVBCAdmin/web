import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./Footer.module.scss";
import { ImgixProvider } from "@/components/molecules/imgixProvider/ImgixProvider";
import { ImgixImage } from "@/components/atoms/imgixImage/ImgixImage";

export default function Footer(props) {
  const date = new Date();
  const year = date.getFullYear();
  const { logo, address, copy, footerMenusCollection, footerMenus } = props;
  const contactMenu = footerMenusCollection?.items[0].menuLinksCollection.items;
  const legalMenu = footerMenusCollection?.items[1].menuLinksCollection.items;
  const { IMGIX_URL } = require("../../../helpers/contentful-config");
  console.log("its here!!!", IMGIX_URL);
  return (
    <section className={classes.oFooter}>
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row no-gutters`}>
          <div className={`${classes.oCol} col-12 col-md-4`}>
            <Link href={`/`}>
              <figure className={`${classes.mImage}`}>
                {logo.fields ? (
                  <ImgixProvider>
                    <ImgixImage
                      src={logo.fields.file.url}
                      height={logo.fields.file.details.image.height}
                      width={logo.fields.file.details.image.width}
                      alt={logo.title}
                      className={`${classes.aImage}`}
                    />
                  </ImgixProvider>
                ) : (
                  <figure
                    className={`${classes.aImageBG}`}
                    style={{
                      backgroundImage: `url(${process.env.IMGIX_PROVIDER}${logo.url})`,
                    }}
                  ></figure>
                )}
              </figure>
            </Link>
          </div>
          <div className={`${classes.oCol} col-12 col-md-4`}>
            {address.json ? (
              <div className={`${classes.mAddress} fnt18`}>
                {documentToReactComponents(address.json)}
              </div>
            ) : (
              <div className={`${classes.mAddress} fnt18`}>
                {documentToReactComponents(address)}
              </div>
            )}
            <ul className={`${classes.oNavigation} ${classes.footerMenu}`}>
              {contactMenu ? (
                <>
                  {contactMenu.map((item, index) => (
                    <li key={index} className={`${classes.mMenuItem} fnt18`}>
                      <Link href={item.url} className={classes.oLinkItem}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {footerMenus[0].fields.menuLinks.map((item, index) => (
                    <li key={index} className={`${classes.mMenuItem} fnt18`}>
                      <Link
                        href={item.fields.url}
                        className={classes.oLinkItem}
                      >
                        {item.fields.label}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className={`${classes.oCol} col-12 col-md-4`}>
            <ul className={`${classes.oNavigation} ${classes.footerMenu}`}>
              {legalMenu ? (
                <>
                  {legalMenu.map((item, index) => (
                    <li key={index} className={`${classes.mMenuItem} fnt18`}>
                      <Link href={item.url} className={classes.oLinkItem}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {footerMenus[1].fields.menuLinks.map((item, index) => (
                    <li key={index} className={`${classes.mMenuItem} fnt18`}>
                      <Link
                        href={item.fields.url}
                        className={classes.oLinkItem}
                      >
                        {item.fields.label}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
            <div className={`${classes.mCredits}`}>
              {copy.json ? (
                <>{documentToReactComponents(copy.json)}</>
              ) : (
                <>{documentToReactComponents(copy)}</>
              )}

              <p>
                © Copyright {year}. Site by &nbsp;
                <a href="http://www.kdee.co.za/" target="_blank">
                  KDee
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

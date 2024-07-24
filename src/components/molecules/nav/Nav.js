import { useState } from "react";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import classes from "./Nav.module.scss";

export default function Nav() {
  const [isActive, setIsActive] = useState();
  const handleToggle = () => setIsActive(!isActive);

  return (
    <nav className={classes.navMain}>
      <span onClick={handleToggle} className={classes.burgerWrapper}>
        <BurgerMenu />
      </span>
      <div
        className={`${classes.mNavMobile} ${
          isActive ? `${classes.navOpen}` : `${classes.navClosed}`
        }`}
      >
        <div onClick={handleToggle} className={classes.mNavBurger}>
          <BurgerMenu handleToggle={handleToggle} isActive={isActive} />
        </div>
        <ul className={classes.mMenu}>
          <li className={classes.navLink}>
            <a className={classes.aLink} href="#top" onClick={handleToggle}>
              Home
            </a>
          </li>
          <li className={classes.navLink}>
            <a className={classes.aLink} href="#about" onClick={handleToggle}>
              About
            </a>
          </li>
          <li className={classes.navLink}>
            <a className={classes.aLink} href="#tania" onClick={handleToggle}>
              Tania Molteno
            </a>
          </li>
          <li className={classes.navLink}>
            <a className={classes.aLink} href="#adele" onClick={handleToggle}>
              Adele Segers
            </a>
          </li>
          <li className={classes.navLink}>
            <a
              className={classes.aLink}
              href="#management"
              onClick={handleToggle}
            >
              Talent Management Solutions
            </a>
          </li>
          <li className={classes.navLink}>
            <a
              className={classes.aLink}
              href="#consulting"
              onClick={handleToggle}
            >
              Labour Consulting
            </a>
          </li>
          <li className={classes.navLink}>
            <a
              className={classes.aLink}
              href="#training"
              onClick={handleToggle}
            >
              Training
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

import classes from "./Menu.module.scss";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

export default function Menu(contentModule) {
  gsap.registerPlugin(ScrollTrigger);
  const navbarRef = useRef(null);

  useEffect(() => {
    const showNav = gsap
      .fromTo(
        navbarRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
        }
      )
      .progress(1);
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showNav.play() : showNav.reverse();
      },
    });
  }, []);

  const { menuItemsCollection } = contentModule.contentModule;
  return (
    <nav className={classes.oNav} ref={navbarRef}>
      <ul className={classes.oMenu}>
        {menuItemsCollection?.items.map((item, index) => (
          <li key={index} className={classes.mItem}>
            {item.isExternal ? (
              <a
                href={item.url}
                className={item.customClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <Link href={item.url} className={item.customClass}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

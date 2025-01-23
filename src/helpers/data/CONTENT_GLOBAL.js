export const MAIN_MENU = `
  componentMenu(id: "2g1h9wpN20AnfxYaWq8N96") {
    title
    customClass
    menuItemsCollection {
      items {
        ... on SubcomponentLink {
          label
          url
          isExternal
          customClass
        }
      }
    }
  }
`;

export const PAGE_HERO = `
  componentHeroBanner(id: "20rXOC48shmzfiM67oqfQF") {
    title
    imagesCollection {
      items {
        title
        url
        width
        height
      }
    }
  }
`;

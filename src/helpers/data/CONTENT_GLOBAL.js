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

export const FOOTER_CONTENT = `
  query {
    componentFooter(id: "J0CAOsQiy1HfXabwSyxYA") {
      title
      logo {
        title
        url
        width
        height
      }
      columnOneCopy {
        json
      }
      columnTwoCopy {
        json
      }
      socialMediaMenu {
        menuItemsCollection {
          items {
            ... on SubcomponentLink {
              label
              url
              isExternal
              customClass
              image {
                title
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

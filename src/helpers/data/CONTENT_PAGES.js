// const { MAIN_MENU } = require("./CONTENT_GLOBAL");

export const PAGE_CONTENT = `
  query GetPage($slug: String!) {
    pagePageCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        componentsCollection(limit: 5) {
          items {
            ... on ComponentHeroBanner {
              title
              imagesCollection {
                items {
                  url
                }
              }
            }
            ... on SubcomponentBodyText {
              title
              copy {
                json
              }
              customClass
            }
          }
        }
      }
    }
  }
`;

export const PAGE_SLUG = `
  query {
    pagePageCollection {
      items {
        slug
      }
    }
  }
`;

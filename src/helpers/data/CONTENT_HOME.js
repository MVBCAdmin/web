const { MAIN_MENU } = require("./CONTENT_GLOBAL");

export const HOME_CONTENT = `
query GetHome($slug: String!) {
  pageHomepageCollection(where: { slug: $slug }, limit: 1) {
    items {
      title
      slug
      componentListCollection(limit: 5) {
        items {
          ... on ComponentHeroBanner {
            title
            copy {
              json
            }
            image {
              title
              url
              width
              height
            }
            imagesCollection {
              items {
                url
              }
            }
          }
        }
      }
    }
  }
}
`;

export const HOME_SLUG = `
query {
  pageHomepageCollection {
    items {
      title
      slug
    }
  }
}
`;

export const HOME_MENU = `
  query {
    ${MAIN_MENU}
  }
`;

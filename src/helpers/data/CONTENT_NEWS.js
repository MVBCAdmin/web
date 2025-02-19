const { MAIN_MENU, PAGE_HERO } = require("./CONTENT_GLOBAL");

export const NEWS_CONTENT = `
  query GetPage($slug: String!) {
    pageBlogCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        copy {
          json
        }
      }
    }
  }
`;

export const NEWS_SLUG = `
  query {
    pageBlogCollection {
      items {
        slug
      }
    }
  }
`;

export const NEWS_LIST = `
  query {
    pageBlogCollection {
      items {
        title
        slug
        ... on PageBlog {
          title
          isFeatured
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
`;

export const NEWS_MENU = `
  query {
    ${MAIN_MENU}
  }
`;

export const NEWS_HERO = `
  query {
    ${PAGE_HERO}
  }
`;

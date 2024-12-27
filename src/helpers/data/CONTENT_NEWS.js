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

export const HOME_CONTENT = `
query GetHome($slug: String!)  {
    pageHomepageCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        componentsCollection {
          items {
            __typename
          }
        }
      }
    }
}
`;

export const HOME_SLUG = `
query {
    pageHomepageCollection{
    items {
      title
      slug
    }
  }
}
`;

import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 5) {
      edges {
        node {
          id
          name
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

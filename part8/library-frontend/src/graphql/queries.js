import { gql } from "@apollo/client";
import { BOOK_DETAILS } from "./fragments";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
export const FAV_GENRE_BOOKS = gql`
  query favoriteGenreBooks($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

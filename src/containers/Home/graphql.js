import gql from 'graphql-tag'

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      firstName
      lastName
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title
    }
  }
`

export const ADD_AUTHOR = gql`
  mutation addAuthor($authorInput: AuthorInput!) {
    addAuthor(input: $authorInput) {
      id
      firstName
      lastName
    }
  }
`

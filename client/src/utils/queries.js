import { gql } from '@apollo/client';

export const GET_ME = gql`
query Query {
  me {
    username
    savedBooks {
      title
      link
      image
      description
      bookId
      authors
    }
  }
}
`
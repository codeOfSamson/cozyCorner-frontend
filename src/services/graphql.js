import { gql } from "@apollo/client";

export const GET_ALL_RECORDS = gql`
  query {
    getAllRecords {
      _id
      data
      source
      timestamp
    }
  }
`;

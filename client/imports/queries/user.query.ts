import gql from 'graphql-tag';

export interface User {
    _id: string;
    username: string;
    picture: string;
}

export const userQuery = gql`
query getUser($id: String){
      user(id : $id){
      _id
      name
      picture
    }
}`;

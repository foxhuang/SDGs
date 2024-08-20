import { RcFile } from 'antd/es/upload/interface';
import gql from 'graphql-tag';
import {   uploadClient } from './hybase_service';


const UPLOAD_CSV = gql`
  mutation UploadCSV($file: Upload!) {
    uploadCSVFile(Input: $file) {  
        message
        success
    }
  }
`;



const UPLOAD_MUTATION = gql`
  mutation ($file: Upload!) {
    result: upload(Input: $file) {
      success
      uid
      settings
    }
  }
`; 


export async function upload(params: RcFile) {
  return uploadClient
    .mutate({
      mutation: UPLOAD_CSV,
      variables: {
        file: params,
      },
    })
    .then((res) => {
        console.log(res.data.result);
      return res.data.result;
    });
}


export async function upload1(params: RcFile) {
  return uploadClient
    .mutate({
      mutation: UPLOAD_MUTATION,
      variables: {
        file: params,
      },
    })
    .then((res) => {
      return res.data.result;
    });
}
 
import axios from 'axios';

export default class Currency {
  static async convert(firstCurr, secondCurr, amt) {
    try {
      let response = axios.get(`https://v6.exchangerate-api.com/v6/bb0b3db76944e54e64a43d98/pair/${firstCurr}/${secondCurr}/${amt}`);
      console.log('axios get', response);
      return (await response).data;
    }
    catch (err) {
      console.log('err', err);
      return err;
    }
  }
}


// export function Project() {
// }

// example commits for the following:
// Good Fail: Add first test and Example Class.
// Passing: Add constructor logic, pass first test.
import axios from 'axios';

export default class Currency {
  static async convert(firstCurr, secondCurr, amt) {
    try {
      let response = axios.get(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${firstCurr}/${secondCurr}/${amt}`);
      return (await response).data;
    }
    catch (err) {
      return err;
    }
  }
}

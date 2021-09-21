import axios from 'axios';

export default class Currency {
  static async convert(firstCurr, secondCurr, amt) {
    const conversionRate = window.localStorage.getItem(`${firstCurr} - ${secondCurr}`);
    if (conversionRate) {
      const result = parseFloat(amt) * parseFloat(conversionRate);
      return {conversion_result: result, conversion_rate: conversionRate};
    } else {
      try {
        let response = await axios.get(`https://v6.exchangerate-api.com/v6/bb0b3db76944e54e64a43d98/pair/${firstCurr}/${secondCurr}/${amt}`);
        window.localStorage.setItem(`${firstCurr} - ${secondCurr}`, response.data.conversion_rate);
        return response.data;
      }
      catch (err) {
        return err;
      }
    }
  }
}

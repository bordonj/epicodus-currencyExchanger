import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/curr-service';

$(document).ready(() => {
  $('#currInput').on('submit', (e) => {
    e.preventDefault();
    let firstInput = $('#firstCurr').val();
    console.log('firstInput', firstInput);
    let secondInput = $('#secondCurr').val();
    console.log('secondInput', secondInput);
    Currency.convert(firstInput, secondInput)
      .then(res => {
        $('.output').html(res.conversion_rate);
        console.log('res', res);
        console.log('res', res.conversion_rate);
      }); 
  });
});



/* NOTES FOR DEV */
// https://v6.exchangerate-api.com/v6/bb0b3db76944e54e64a43d98/pair/EUR/GBP

// PHP	Philippine Peso	Philippines
// THB	Thai Baht	Thailand
// TWD	New Taiwan Dollar	Taiwan
// VND	Vietnamese Đồng	Vietnam
// SGD	Singapore Dollar	Singapore
// JPY	Japanese Yen	Japan
// KRW	South Korean Won	South Korea
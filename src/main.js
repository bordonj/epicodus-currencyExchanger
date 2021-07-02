import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/curr-service';

let grabElements = () => {
  let amt = parseFloat($('#mine').val());
  let amt2 = parseFloat($('#mine').val());
  let firstInput = $('#dropDown1').val();
  console.log('firstInput', firstInput);
  let secondInput = $('#dropDown2').val();
  console.log('secondInput', secondInput);
  return [firstInput, secondInput, amt, amt2];
};

$(document).ready(() => {
  $('#mine').on('change', () =>{
    if ($('#mine').val() === '0') {
      $('#want').attr("value", `0`);
    } else {
      let elArr = grabElements();
      Currency.convert(elArr[0], elArr[1], elArr[2])
        .then(res => {
          console.log('res', res);
          $('#want').attr("value", `${res.conversion_result}`);
          $('.conversion').html(`
            <p>${elArr[2]} ${elArr[0]} equals</p>
            <h2>${elArr[1]} ${res.conversion_result}</h2>
            <p>converstion rate: ${res.conversion_rate}</p>
          `);
        });
    }
  });











  //below used for checking logic
  let amt = parseFloat($('#inputAmt').val());
  console.log('amt input', amt);
  $('#currInput').on('submit', (e) => {
    e.preventDefault();
    amt = parseFloat($('#inputAmt').val());
    console.log('amt input', amt);
    let firstInput = $('#firstCurr').val();
    console.log('firstInput', firstInput);
    let secondInput = $('#secondCurr').val();
    console.log('secondInput', secondInput);
    Currency.convert(firstInput, secondInput, amt)
      .then(res => {
        $('.output').html(`
          <p>converstion rate: ${res.conversion_rate}</p>
          <p>converstion result: ${res.conversion_result}</p>
        `);
        console.log('res', res);
        console.log('res', res.conversion_rate);
      }); 
  });
  $('select#firstCurr').on('change', () => {
    let firstInput = $('#firstCurr').val();
    console.log('firstInput', firstInput);
    let secondInput = $('#secondCurr').val();
    console.log('secondInput', secondInput);
    Currency.convert(firstInput, secondInput, amt)
      .then(res => {
        $('.output').html(`
          <p>converstion rate: ${res.conversion_rate}</p>
          <p>converstion result: ${res.conversion_result}</p>
        `);
        console.log('res', res);
        console.log('res', res.conversion_rate);
      }); 
  });
  $('select#secondCurr').on('change', () => {
    let firstInput = $('#firstCurr').val();
    console.log('firstInput', firstInput);
    let secondInput = $('#secondCurr').val();
    console.log('secondInput', secondInput);
    Currency.convert(firstInput, secondInput, amt)
      .then(res => {
        $('.output').html(`
          <p>converstion rate: ${res.conversion_rate}</p>
          <p>converstion result: ${res.conversion_result}</p>
        `);
        console.log('res', res);
        console.log('res', res.conversion_rate);
      }); 
  });
});



// TO CHANGE THE PLACEHOLDER VALUE
// $(document).ready(function(){ 
//   $('form').find("input[type=textarea], input[type=password], textarea").each(function(ev)
//   {
//     if(!$(this).val()) { 
//       $(this).attr("placeholder", "Type your answer here");
//   }
//   });
// });
/* NOTES FOR DEV */
// https://v6.exchangerate-api.com/v6/bb0b3db76944e54e64a43d98/pair/EUR/GBP

// PHP	Philippine Peso	Philippines
// THB	Thai Baht	Thailand
// TWD	New Taiwan Dollar	Taiwan
// VND	Vietnamese Đồng	Vietnam
// SGD	Singapore Dollar	Singapore
// JPY	Japanese Yen	Japan
// KRW	South Korean Won	South Korea
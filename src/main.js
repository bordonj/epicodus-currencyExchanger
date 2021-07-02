import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/curr-service';

let grabElements = () => {
  let amt = parseFloat($('#mine').val());
  let amt2 = parseFloat($('#want').val());
  let firstInput = $('#dropDown1').val();
  console.log('firstInput', firstInput);
  let secondInput = $('#dropDown2').val();
  console.log('secondInput', secondInput);
  return [firstInput, secondInput, amt, amt2];
};

let displayElements = (firstInput, secondInput, amt, res, id) => {
  $(`#${id}`).prop("value", `${res.conversion_result}`);
  console.log('displayElement ID', id);
  console.log('dE res.conRes', res.conversion_result);
  $('.conversion').html(`
    <p>${amt} ${firstInput} equals</p>
    <h2>${secondInput} ${res.conversion_result}</h2>
    <p>conversion rate: ${res.conversion_rate}</p>
  `);
};

let displayErr = (err) => {
  $('.conversion').text(`${err}`);
};

$(document).ready(() => {
  $('#mine').on('change', () =>{
    if ($('#mine').val() === '0') {
      $('#want').prop("value", `0`);
    } else {
      let elArr = grabElements();
      console.log('mine', elArr);
      Currency.convert(elArr[0], elArr[1], elArr[2])
        .then(res => {
          if(res instanceof Error) {
            throw Error('error to get a correct API response');
          }
          console.log('res', res);
          displayElements(elArr[0], elArr[1], elArr[2], res, 'want');
        })
        .catch(err => displayErr(err.message));
    }
  });
  $('#want').on('change', () => {
    if ($('#want').val() === '0') {
      $('#mine').prop("value", `0`);
    } else {
      let elArr = grabElements();
      console.log('want elArr', elArr);
      Currency.convert(elArr[1], elArr[0], elArr[3])
        .then(res => {
          if(res instanceof Error) {
            throw Error('error to get to res');
          }
          console.log('res', res);
          console.log('elArr', elArr);
          displayElements(elArr[1], elArr[0], elArr[3], res, 'mine');
        })
        .catch(err => displayErr(err.message));
    }
  });


  $('#dropDown1').on('change', () => {
    let elArr = grabElements();
    console.log('want elArr', elArr);
    Currency.convert(elArr[0], elArr[1], elArr[2])
      .then(res => {
        if(res instanceof Error) {
          throw Error('error to get to res');
        }
        console.log('res', res);
        console.log('elArr', elArr);
        displayElements(elArr[0], elArr[1], elArr[2], res, 'want');
        $('#want').prop("value", `${res.conversion_result}`);
      })
      .catch(err => displayErr(err.message));
  
  });
  $('#dropDown2').on('change', () => {
    let elArr = grabElements();
    console.log('want elArr', elArr);
    Currency.convert(elArr[1], elArr[0], elArr[3])
      .then(res => {
        if(res instanceof Error) {
          throw Error('error to get to res');
        }
        console.log('res', res);
        console.log('elArr', elArr);
        displayElements(elArr[1], elArr[0], elArr[3], res, 'mine');
      })
      .catch(err => displayErr(err.message));
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
//       $(this).prop("placeholder", "Type your answer here");
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
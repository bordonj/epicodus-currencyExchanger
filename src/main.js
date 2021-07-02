import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/curr-service';

let grabElements = () => {
  let amt = parseFloat($('#mine').val()).toFixed(2);
  let amt2 = parseFloat($('#want').val()).toFixed(2);
  let firstInput = $('#dropDown1').val();
  let secondInput = $('#dropDown2').val();
  return [firstInput, secondInput, amt, amt2];
};

let displayElements = (firstInput, secondInput, amt, res, id) => {
  $(`#${id}`).prop("value", `${res.conversion_result}`);
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
  let onFirstLoad = grabElements();
  Currency.convert(onFirstLoad[0], onFirstLoad[1], onFirstLoad[2])
    .then(res => {
      if(res instanceof Error)  {
        throw Error('error to get correct API response');
      }
      displayElements(onFirstLoad[0], onFirstLoad[1], onFirstLoad[2], res, 'want');
    })
    .catch(err => displayErr(err.message));

  $('#mine').on('change', () =>{
    if ($('#mine').val() === '0') {
      let elArr = grabElements();
      $('#want').prop("value", `0`);
      $('.conversion').html(`
      <p>0 ${elArr[0]} equals</p>
      <h2>${elArr[1]} 0</h2>
    `);
    } else {
      let elArr = grabElements();
      Currency.convert(elArr[0], elArr[1], elArr[2])
        .then(res => {
          if(res instanceof Error) {
            throw Error('error to get a correct API response');
          }
          displayElements(elArr[0], elArr[1], elArr[2], res, 'want');
        })
        .catch(err => displayErr(err.message));
    }
  });
  $('#want').on('change', () => {
    if ($('#want').val() === '0') {
      $('#mine').prop("value", `0`);
      let elArr = grabElements();
      $('#want').prop("value", `0`);
      $('.conversion').html(`
      <p>0 ${elArr[1]} equals</p>
      <h2>${elArr[0]} 0</h2>
    `);
    } else {
      let elArr = grabElements();
      Currency.convert(elArr[1], elArr[0], elArr[3])
        .then(res => {
          if(res instanceof Error) {
            throw Error('error to get to res');
          }
          displayElements(elArr[1], elArr[0], elArr[3], res, 'mine');
        })
        .catch(err => displayErr(err.message));
    }
  });


  $('#dropDown1').on('change', () => {
    let elArr = grabElements();
    Currency.convert(elArr[0], elArr[1], elArr[2])
      .then(res => {
        if(res instanceof Error) {
          throw Error('error to get to res');
        }
        displayElements(elArr[0], elArr[1], elArr[2], res, 'want');
        $('#want').prop("value", `${res.conversion_result}`);
      })
      .catch(err => displayErr(err.message));
  
  });
  $('#dropDown2').on('change', () => {
    let elArr = grabElements();
    Currency.convert(elArr[1], elArr[0], elArr[3])
      .then(res => {
        if(res instanceof Error) {
          throw Error('error to get to res');
        }
        displayElements(elArr[1], elArr[0], elArr[3], res, 'mine');
      })
      .catch(err => displayErr(err.message));
  });
});

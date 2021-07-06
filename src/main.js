import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency-service';

const addCommas = numStr => {
  let counter = 0;
  let wholeNumStr = '';

  for (let i = numStr.length - 1; i >= 0; i--) {
    counter++;
    wholeNumStr = numStr[i] + wholeNumStr;
    if (counter % 3 === 0 && i !== 0) {
      wholeNumStr = ',' + wholeNumStr;
    } 
  }
  return wholeNumStr;
};

const evalNum = (numStr) => {
  if (numStr.includes('.')) {
    let numSplit = numStr.split('.');
    let numWhole = numSplit[0];
    let numDecimal = numSplit[1];
    let numFixDecimal = (numDecimal[0] === '0' && numDecimal[1] === '0') ?
      numDecimal.slice(0, 4) :
      numDecimal.slice(0, 2);
    let numFixWhole = numWhole.length > 3 ?
      addCommas(numWhole) :
      numWhole;
    return `${numFixWhole}.${numFixDecimal}`;
  } else {
    let numFixWhole = numStr.length > 3 ?
      addCommas(numStr) :
      numStr;
    return numFixWhole;
  }
};

const grabElements = () => {
  let amt;
  if ($('#mine').val().includes(',')) {
    amt = parseFloat($('#mine').val().split(',').join('')).toFixed(2);
  } else {
    amt = parseFloat($('#mine').val()).toFixed(2);
  }
  let amt2;
  if ($('#want').val().includes(',')) {
    amt2 = parseFloat($('#want').val().split(',').join('')).toFixed(2);
  } else {
    amt2 = parseFloat($('#want').val()).toFixed(2);
  }
  let firstInput = $('#dropDown1').val();
  let secondInput = $('#dropDown2').val();
  return [firstInput, secondInput, amt, amt2];
};

const displayElements = (firstInput, secondInput, amt, res, id) => {
  $(`#${id}`).prop("value", `${evalNum(res.conversion_result.toString())}`);
  $('.conversion').html(`
    <p>${evalNum(amt)} ${firstInput} equals</p>
    <h2>${secondInput} ${evalNum(res.conversion_result.toString())}</h2>
    <p>conversion rate: ${evalNum(res.conversion_rate.toString())}</p>
  `);
};

const displayErr = (err) => {
  $('.conversion').text(`${err}`);
};

$(document).ready(() => {
  let onFirstLoad = grabElements();
  Currency.convert(onFirstLoad[0], onFirstLoad[1], onFirstLoad[2])
    .then(res => {
      if(res instanceof Error)  {
        throw Error('error in requesting API response');
      }
      displayElements(onFirstLoad[0], onFirstLoad[1], onFirstLoad[2], res, 'want');
    })
    .catch(err => displayErr(err.message));

  $('#mine').on('change', () => {
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
            throw Error('invalid input to get correct API response');
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
            throw Error('invalid input to get correct API response');
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
          if (res.message.includes('400')) {
            alert('RBY is only a language here');
          }
          throw Error('this currency is fake!');
        }
        displayElements(elArr[0], elArr[1], elArr[2], res, 'want');
        $('#want').prop("value", `${evalNum(res.conversion_result.toString())}`);
      })
      .catch(err => displayErr(err.message));
  });
  
  $('#dropDown2').on('change', () => {
    let elArr = grabElements();
    Currency.convert(elArr[0], elArr[1], elArr[2])
      .then(res => {
        if(res instanceof Error) {
          if (res.message.includes('400')) {
            alert('RBY is only a language here');
          }
          throw Error('this currency is fake!');
        }
        displayElements(elArr[0], elArr[1], elArr[2], res, 'want');
      })
      .catch(err => displayErr(err.message));
  });
});

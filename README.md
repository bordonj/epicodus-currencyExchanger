# _Currency Exchanger_

#### _Currency Exchanger - 07/02/21 - Code Review007_

#### By _**Jennifer Bordon**_

## Technologies Used

* _Git_
* _HTML_
* _CSS_ 
* _Bootstrap_
* _jQuery_
* _JavaScript_
* _npm_
* _webpack_
* _eslint_



## Description
The _Currency Exchanger_ is an application used to display currency conversions. 
- A user can open the application and immediately see the default result of 1 United States Dollar (USD) converted to the amount in Singapore Dollars (SGD). 
- Upon changing any input or dropdown selection, once a user clicks out onto the window, the result will update. 
  - The user can type in any amount in the respective inputs next to its dropdown selected currency, and upon 'clicking out', the result will be reflected on the dom with both the currency value and its currency name (e.g., USD, SGD, KRW). 
  - A user can also choose a different dropdown choice for the currency to see updated conversion results. 

## Setup/Installation Requirements
* Clone this project into your preferred directory
* In that directory, there should now be a directory labeled "repoName"
* run `npm i` to install respective plugins/packages
* retrieve API key
  - visit https://www.exchangerate-api.com/ 
  - press `Get Free Key!` to sign up for an account, and verify email
  - make a file called `.env` in your root folder
  - copy your key and replace [your-api-key] in the following string `API_KEY=[your-api-key]`
  - paste the string with your key into your `.env` file
  - make sure you run `npm start` after you update this `.env` file so it rebuilds the files with this key
* after the above, run `npm start` to see a live server of the app
* on the live server, you can enter either inputs, or use the dropdown menu to change currencies
* there is one fake currency, (RBY) that should show that the currency doesn't exist if you choose it

## Github Pages link

[Click here](https://github.com/bordonj/epicodus-currencyExchanger) for the Github Pages link. 

## Known Bugs

* _at the moment, developer is not smart enough to account for inputting commas, or outputting commas_

## License

Distributed under the MIT License. See LICENSE for more information.


## Contact Information

_jennifer.bordon@gmail.com_
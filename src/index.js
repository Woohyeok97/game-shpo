import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './commponents/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import items from './game-data.js'

 
let item = items
function reducer(state = item, action) {
  return state
}

let sales30 = [item[2],item[19],item[15]].map((a)=> { a.sale = 30; return a })
let sales40 = [item[23],item[17],item[12]].map((a)=> { a.sale = 40; return a })
let sales50 = [item[8],item[16],item[22]].map((a)=> { a.sale = 50; return a} )
function sale30(state = sales30, action) {
  return state
}
function sale40(state = sales40, action) {
  return state
}
function sale50(state = sales50, action) {
  return state
}

let carts = []
function cart(state = carts, action) {
  let copy = [...state]
  switch (action.type) {
    case '장바구니담기':
        if(copy.includes(item[action.payload])) {
          return copy
        } else {
          copy.push(item[action.payload])
          copy = [...new Set(copy)]
          return copy
        }
      break;
    case '장바구니제거' :
      let del = copy.filter((a)=> a.id !== action.payload)
      return del
    break 
    case '장바구니전부제거' :
      copy = []
      return copy
     break;  
    default:
        return state
      break;
  }

}

let switchs = false
function 스위치(state = switchs, action) {
  switch (action.type) {
    case '스위치true':
      state = true
      return state
      break;
    case '스위치false':
      state = false
      return state
      break;
    default:
      return state
      break;
  }
}

let modalCheck = false
function modal(state = modalCheck, action) {
  switch (action.type) {
    case '모달on' :
      state = true
      return state
      break;
    case '모달off' :
      state = false
      return state
      break;
    default:
      return state
      break;
  }
}

let modalState = null
function modalType(state = modalState, action) {
  switch (action.type) {
    case 'cartin':
      state = 'cartin'
      return state
      break;
    case 'cartSuccess' :
      state = 'cartSuccess'
      return state
      break;
    case 'cartRemove' :
      state = 'cartRemove'
      return state
      break;
    case '힝' :
      state = '힝'
      return state
      break;
    case 'cartAllRemove' :
      state = 'cartAllRemove'
      return state
      break;
    case 'alreadyCart' :
      state = 'alreadyCart'
      return state
      break;      
    case 'login':
      state = 'login'
      return state
      break;
    default:
      return state
      break;
  }
}


let store = createStore(combineReducers({ 
  reducer, sale30, sale40, sale50,
  스위치, cart , modal, modalType
}))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

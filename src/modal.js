import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

function Modal(props) {
  let 모달종류 = useSelector((state)=> state.모달종류)
  let cart = useSelector((state) => state.cart)
  let 보여줄UI = {
    cartin: <CartIn detailNum={props.detailNum}/>,
    cartSuccess: <CartSuccess />,
    alreadyCart: <AlreadyCart detailNum={props.detailNum}/>,
    cartRemove: <CartRemove detailNum={props.detailNum}/>,
    cartAllRemove: <CartAllRemove/>,
    login: <Login />,
    힝: <힝/>,
  }
  return(
    <div className="modals">
      <div className="modal-child">
      { 보여줄UI[모달종류] }
      </div>
    </div>
  )
}

function CartIn(props) {
  let dispatch = useDispatch()
  let item = useSelector((state)=> state.reducer )
  let cart = useSelector((state) => state.cart)
  function already() {
    if(cart.includes(item[props.detailNum])) {
      dispatch({ type:'alreadyCart' })
    }
  }

  return(
    <div className="cartin">
      <p>{item[props.detailNum].title}을(를) 장바구니에 담을까용?</p>
      <button onClick={()=>{ 
        dispatch({ type:'장바구니담기' , payload: item[props.detailNum].id });
        dispatch({ type:'cartSuccess' });
        already()
        }}>장바구니 담기</button>
      <button onClick={()=>{ 
        dispatch({ type:'모달off' })}
        }>NOPE!</button>
    </div>
  )
}

function CartSuccess(props) {
  let dispatch = useDispatch()
  let history = useHistory()
  return(
    <div className="cart-success">
      <p>장바구니에 담았습니다!</p>
      <button onClick={()=>{ 
        history.push('/cart');
        dispatch({ type:'스위치false' })
        }}>장바구니로 고고씽</button>
      <button onClick={()=>{ dispatch({ type:'모달off' }) }}>닫기</button>
    </div>
  )
}

function AlreadyCart(props) {
  let dispatch = useDispatch()
  let history = useHistory()
  let item = useSelector((state)=> state.reducer )
  return(
    <div className="already-cart">
      <p>{item[props.detailNum].title}은 이미 장바구니에 있습니다!</p>
      <button onClick={()=>{ 
        history.push('/cart');
        dispatch({ type:'스위치false' })
        }}>장바구니로 고고씽</button>
      <button onClick={()=>{ dispatch({ type:'모달off' }) }}>닫기</button>
    </div>
  )
}

function CartRemove(props) {
  let dispatch = useDispatch()
  let item = useSelector((state)=> state.reducer )
  let cart = useSelector((state) => state.cart)
  let timer

  return(
    <div className="cart-remove">
      <p>{item[props.detailNum].title}을 제거 할까요..?</p>
      <button onClick={()=>{ 
        dispatch({ type:'장바구니제거', payload: item[props.detailNum].id });
        dispatch({ type:'힝' });
        dispatch({ type:'스위치false' });
       }}>예쑤~</button>
      <button onClick={()=>{ dispatch({ type:'모달off' }) }}>NOPE!</button>
    </div>
  )
}

function CartAllRemove() {
  let dispatch = useDispatch()
  return(
    <div className="cart-all-remove">
      <p>장바구니를 비우시겠습니까?</p>
      <button onClick={()=>{
        dispatch({ type:'장바구니전부제거' });
        dispatch({ type:'힝' })
      }}>장바구니비우기</button>
    </div>
  )
}

function 힝() {
  let dispatch = useDispatch()
  let timer = setTimeout(()=>{ dispatch({ type:'모달off' }) }, 700);
  return(
    <div className="힝">
      <p>힝~</p>
    </div>
  )
}

function Login(props) {
  let dispatch = useDispatch()
  
  return (
    <div className="login">
      <p>로그인 하실래용?</p>
      <button onClick={()=>{ dispatch({ type:'모달off' })}}>안해이씨</button>
    </div>
  )
}

export default Modal
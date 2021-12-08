import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

//Material UI Commponents
import { Typography } from "@material-ui/core";
import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Card, CardHeader, CardContent, CardActions, } from '@material-ui/core'

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
      <Card elevation={3}>
        <CardHeader title="알림창"/>
        <CardContent>
          <Typography variant="h5">{item[props.detailNum].title}을(를) 장바구니에 담을까용?</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{
              dispatch({ type:'장바구니담기' , payload: item[props.detailNum].id });
              dispatch({ type:'cartSuccess' });
              already() }}>장바구니 담기</Button>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ 
            dispatch({ type:'모달off' })} }>NOPE!</Button>
        </CardActions>
      </Card>
    </div>
  )
}

function CartSuccess(props) {
  let dispatch = useDispatch()
  let history = useHistory()
  return(
    <div className="cart-success">
      <Card elevation={3}>
        <CardHeader title="알림창"/>
        <CardContent>
          <Typography variant="h5">장바구니에 담았습니다!</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ 
            history.push('/cart');
            dispatch({ type:'스위치false' }) }}>장바구니로 고고씽</Button>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ dispatch({ type:'모달off' }) }}>닫기</Button>
        </CardActions>
      </Card>
    </div>
  )
}

function AlreadyCart(props) {
  let dispatch = useDispatch()
  let history = useHistory()
  let item = useSelector((state)=> state.reducer )
  return(
    <div className="already-cart">
      <Card elevation={3}>
        <CardHeader title="알림창"/>
        <CardContent>
          <Typography variant="h5">{item[props.detailNum].title}은 이미 장바구니에 있습니다!</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ 
            history.push('/cart');
            dispatch({ type:'스위치false' }) }}>장바구니로 고고씽</Button>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ dispatch({ type:'모달off' }) }}>닫기</Button>
        </CardActions>
      </Card>
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
      <Card elevation={3}>
        <CardHeader title="알림창"/>
        <CardContent>
          <Typography variant="h5">{item[props.detailNum].title}을 제거 할까요..?</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ 
            dispatch({ type:'장바구니제거', payload: item[props.detailNum].id });
            dispatch({ type:'힝' });
            dispatch({ type:'스위치false' }) }}>예쑤~</Button>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ dispatch({ type:'모달off' }) }}>NOPE!</Button>
        </CardActions>
      </Card>
    </div>
  )
}

function CartAllRemove() {
  let dispatch = useDispatch()
  return(
    <div className="cart-all-remove">
      <Card elevation={3}>
        <CardHeader title="알림창" />
        <CardContent>
          <Typography variant="h5">장바구니를 비우시겠습니까?</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small"
          onClick={()=>{
          dispatch({ type:'장바구니전부제거' });
          dispatch({ type:'힝' }) }}>장바구니비우기</Button>
        </CardActions>
      </Card>
    </div>
  )
}

function 힝() {
  let dispatch = useDispatch()
  let timer = setTimeout(()=>{ dispatch({ type:'모달off' }) }, 700);
  return(
    <div className="힝">
      <Card elevation={3}>
        <CardHeader title="알림창"/>
        <CardContent>
          <Typography variant="h6">힝~</Typography>
        </CardContent>
      </Card>
    </div>
  )
}

function Login(props) {
  let dispatch = useDispatch()
  
  return (
    <div className="login">
      <Card elevation={3}>
        <CardHeader title="로그인" />
        <CardContent>
          <Typography variant="body1" component="p1">아이디 & 비밀번호를 입력해주세요.</Typography>
          <br/>
          <TextField label="아이디 입력" variant="outlined" size="small" />
          <br/>
          <TextField label="비밀번호 입력" variant="outlined" size="small" />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small">로그인</Button>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ dispatch({ type:'모달off' })}}>안해이씨</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Modal
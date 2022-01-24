import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

//Material UI Commponents
import { Typography } from "@material-ui/core";
import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Card, CardHeader, CardContent, CardActions, } from '@material-ui/core'

function Modal(props) {
  let modalType = useSelector((state)=> state.modalType)
  let cart = useSelector((state) => state.cart)
  let [removeItem, setRemoveItem] = useState()

  let showUI = {
    cartin: <PutCart itemNum={props.itemNum}/>,
    cartSuccess: <PutSuccess />,
    alreadyCart: <AlreadyCart itemNum={props.itemNum}/>,
    cartRemove: <CartRemove cartNum={props.cartNum}/>,
    cartAllRemove: <CartAllRemove/>,
    login: <Login />,
    힝: <힝/>,
  }
  return(
    <div className="modals">
      <div className="modal-child">
      { showUI[modalType] }
      </div>
    </div>
  )
}

function PutCart(props) {
  let dispatch = useDispatch()
  let item = useSelector((state)=> state.reducer )
  let cart = useSelector((state) => state.cart)
  function already() {
    if(cart.includes(item[props.itemNum])) {
      dispatch({ type:'alreadyCart' })
    }
  }
  return(
      <Card elevation={3}>
        <CardHeader title="알림창"/>
        <CardContent>
          <Typography variant="h5">{item[props.itemNum].title}을(를) 장바구니에 담을까용?</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{
              dispatch({ type:'장바구니담기' , payload: item[props.itemNum].id });
              dispatch({ type:'cartSuccess' });
              already() }}>장바구니 담기</Button>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ 
            dispatch({ type:'모달off' })} }>NOPE!</Button>
        </CardActions>
      </Card>
  )
}

function PutSuccess(props) {
  let dispatch = useDispatch()
  let history = useHistory()
  return(
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
  )
}

function AlreadyCart(props) {
  let dispatch = useDispatch()
  let history = useHistory()
  let item = useSelector((state)=> state.reducer )
  return(
      <Card elevation={3}>
        <CardHeader title="알림창"/>
        <CardContent>
          <Typography variant="h5">{item[props.itemNum].title}은 이미 장바구니에 있습니다!</Typography>
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
  )
}

function CartRemove(props) {
  let dispatch = useDispatch()
  let item = useSelector((state)=> state.reducer )
  let cart = useSelector((state) => state.cart)

  return(
      <Card elevation={3}>
        <CardHeader title="알림창"/>
        <CardContent>
          <Typography variant="h5">{cart[props.cartNum].title}을 제거 할까요..?</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ 
            dispatch({ type:'장바구니제거', payload: cart[props.cartNum].id });
            dispatch({ type:'힝' });
            dispatch({ type:'스위치false' }) }}>예쑤~</Button>
          <Button variant="contained" color="primary" size="small"
            onClick={()=>{ dispatch({ type:'모달off' }) }}>NOPE!</Button>
        </CardActions>
      </Card>
  )
}

function CartAllRemove() {
  let dispatch = useDispatch()
  return(
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
          <Button variant="contained" color="primary" size="small"
          onClick={()=>{ dispatch({ type:'모달off' }) }}>NOPE!</Button>
        </CardActions>
      </Card>
  )
}

function 힝() {
  let dispatch = useDispatch()
  let timer = setTimeout(()=>{ dispatch({ type:'모달off' }) }, 700);
  return(
      <Card elevation={3}>
        <CardHeader title="알림창"/>
        <CardContent>
          <Typography variant="h6">힝~</Typography>
        </CardContent>
      </Card>
  )
}

function Login(props) {
  let dispatch = useDispatch()
  
  return (
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
  )
}

export default Modal
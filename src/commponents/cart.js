import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import '../css/cart.scss' 
import { SalePriceBox, PriceBox } from "./App";
import { CSSTransition } from "react-transition-group";


//Material UI Commponents
import { commonMaterial } from './commom-material';
import { Typography } from "@material-ui/core";
import { Button } from '@material-ui/core'
import { Container, Grid, Box } from '@material-ui/core'
import { Card, CardContent, CardMedia } from '@material-ui/core'



function Cart(props) {
  let dispatch = useDispatch()
  let classes = commonMaterial()
  let cart = useSelector((state) => state.cart)
  let sale50 = useSelector((state)=> state.sale50 )
  let [버튼, 버튼변경] = useState(false)
  let [count, setCount] = useState(0)

  
  //carousel 함수
  let timer = useRef()
  let autoPlay = useRef()
  autoPlay.current = plusCount

  function 자동카운트() {
    function startCount() {
      autoPlay.current()
      버튼변경(false)
    }
    timer.current = setInterval(startCount, 4000)
  }
  function plusCount() {
    if(count < sale50.length - 1) { setCount(count + 1) }
    else { setCount(0) }
    버튼변경(false)
  }

  //useEffect 모음
  useEffect(()=>{
    dispatch({ type: '스위치true' })
  },[cart])
  useEffect(()=>{
    자동카운트();
    return ()=>{ clearInterval(timer.current) }
  },[])
  useEffect(()=>{
    return ()=>{
      dispatch({ type: '모달off' })
    }
  },[])
 

  return(
    <div className="Root">

      <section>
        <Container maxWidth="md">
        <Box sx={{ marginBottom:'20px' }}>
          <Typography className={classes.title} variant="h3" align='center'>장바구니</Typography>
          <Grid container spacing={6}>
            <Grid item container xs={8}>
              <Grid item xs={12}>
                <CartItem cart={cart} changeCartNum={props.changeCartNum}/>
              </Grid>
              <Grid item xs={12}>
                <Payment/>
              </Grid>
            </Grid>
              <Grid item xs={4}>
                <Box sx={{ paddingBottom:'10px' }}>
                  <Typography variant="h6" color="secondary" align="center">50% 할인상품!</Typography>
                </Box>
                <CSSTransition in={버튼} classNames="wow" timeout={1000}>
                  <Promotion 카운트={count} 버튼변경={버튼변경}/>
                </CSSTransition>
              </Grid>     
          </Grid>
        </Box>
        </Container>
      </section>
    </div>
  )
}

function CartItem(props) {
  let dispatch = useDispatch()
  let cart = props.cart
  let classes = commonMaterial()

  //app.js에 cartnumber보내기
  function transmitCartNum(num) {
    props.changeCartNum(num)
  }
  
  return cart.map((a, i)=>{
    return(
      <Box sx={{ paddingBottom:"20px" }}>
      <Card className={classes.card} >
        <Box sx={{ width:'40%' }}>
          <CardMedia component="img" src={ a.img } className={classes.img}/>
        </Box>
        <Box sx={{ position:'relative' , width: '100%'}}>
        <CardContent>
          <Box>
            <Typography variant="h5">
            { a.title }
            </Typography>
            { a.sale
              ? <SalePriceBox item={a}/>
              : <PriceBox item={a}/>
            }
          </Box>
          <Box sx={{ position:'absolute', top:'10px', right:'1px'}}>
            <Button variant="text" size="small"
              onClick={()=>{
              dispatch({ type: '모달on'});   
              dispatch({ type: 'cartRemove' });
              transmitCartNum(i)
              }}>✖️</Button>
          </Box>
        </CardContent>
        </Box>
      </Card>
      </Box>
    )
  })
   
}

function Payment() {
  let cart = useSelector((state) => state.cart)
  let dispatch = useDispatch()
  let classes = commonMaterial()
  
  function sum() {
    let total = 0 
    for(let i = 0; i < cart.length; i++) {
      if(cart[i].sale) { cart[i].totalPirce = cart[i].price - (cart[i].price * (cart[i].sale / 100)) }
      else{ cart[i].totalPirce = cart[i].price }
      total = total + cart[i].totalPirce
    }
    return total
  }
  return(
    <Box sx={{ marginTop:'40px', marginBottom:'30px' }}>
    <Typography className={classes.title} variant="h3" align='center'></Typography>
    <Grid container>
      <Grid item container xs={5} spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" size='medium'
            onClick={()=>{}}>구매하기</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" size="medium"
            onClick={()=>{
            dispatch({ type: 'cartAllRemove' });
            dispatch({ type: '모달on' }) }}>장바구니 비우기</Button>
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="h5" align="right">총합 ⭐️ : { sum().toLocaleString() } 원</Typography>
      </Grid>
    </Grid>
    </Box>
  )
}


function Promotion(props) {
  let dispatch = useDispatch()
  let sale50 = useSelector((state)=> state.sale50 )
  let classes = commonMaterial()
  let history = useHistory()
  let 카운트 = props.카운트

  useEffect(()=>{
    props.버튼변경(true)
  },)
  return(
    <Box sx={{ marginBottom:'50px' }}>
      <Card elevation={5}
        onClick={()=>{
        history.push(`/detail/${sale50[카운트].id}`);
        dispatch({ type:'스위치false' }) }}>
        <CardMedia component="img" src={sale50[카운트].img}/>
        <CardContent>
          <Box sx={{ paddingBottom:'15px' }}>
            <Typography variant="h5" align="center">{ sale50[카운트].title }</Typography>
          </Box>
          <Box className={classes.gridItems}>
            <SalePriceBox item={sale50[카운트]}/>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Cart
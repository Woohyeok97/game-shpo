
//라이브러리 & API
import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

//데이터 & 파일
import '../css/App.scss';
import Detail from './detail'
import AllGame from './allgame'
import Cart from './cart'
import Modal from './modal'

//Material UI Commponents
import { commonMaterial } from './commom-material';
import { Card, CardContent, CardHeader, CardMedia, Typography,} from "@material-ui/core";
import { Button } from '@material-ui/core'
import { Grid, Box, Container } from '@material-ui/core';
import LensIcon from '@material-ui/icons/Lens';



function App() {
  //변수 & state 모음
  let item = useSelector((state)=> state.reducer )
  let modal = useSelector((state)=> state.modal )
  let sale30 = useSelector((state)=> state.sale30 )
  let sale40 = useSelector((state)=> state.sale40 )
  let sale50 = useSelector((state)=> state.sale50 )
  
  let history = useHistory();
  let dispatch = useDispatch()
  const classes = commonMaterial()

  //슬라이드상품
  let recommend = [item[7], item[1], item[13], item[8], item[14], item[16]]
  let [count, setCount] = useState(0)

  //프로모션 상품
  let [promotionItem, setpromotionItem] = useState(sale30)
  let [promoCount, setPromoCount] = useState(0)
  //Nav토글
  let 스위치 = useSelector((state)=> state.스위치)
  let timer = useRef()
  let autoPlay = useRef()
  autoPlay.current = plusCount
  //자동화면 올리기
  const topRef = useRef(null)
  function topScroll() {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  //함수 모음
  function 자동카운트() {
    function startCount() {
      dispatch({ type:'스위치false' })
      autoPlay.current()
    }
    timer.current = setInterval(startCount, 4000)
  }
  function 타이머잠깐회수() {
    clearInterval(timer.current)
    timer.current = setTimeout(자동카운트, 4000)
  }
  function plusCount() {
    if(count < recommend.length - 1) { setCount(count + 1) }
    else { setCount(0) }
    dispatch({ type:'스위치false' })
  }
  function minusCount() {
    if(count > 0) { setCount(count - 1) }
    else { setCount(recommend.length - 1) }
    dispatch({ type:'스위치false' })
  }
  
  //detail.js에서 id값받기
  let [itemNum, setItemNum] = useState()
  function changeItemlNum(a) {
    setItemNum(a)
  }
  //cart.js에서 cartnumber받기
  let [cartNum, setCartNum] = useState()
  function changeCartNum(a) {
    setCartNum(a)
  }

  //useEffect사용 
  useEffect(()=>{
    topScroll();
    setPromoCount(0);
  },[])

  useEffect(()=>{
    switch (promoCount) {
      case 1:
        setpromotionItem([...promotionItem, ...sale40])
        break;
      case 2:
        setpromotionItem([...promotionItem, ...sale50])
        break;
    }
  },[promoCount])

  useEffect(()=>{
    return dispatch({ type: '모달off' });
  },[])
  
  useEffect(()=>{
    자동카운트();
    return ()=> { clearInterval(timer.current); clearTimeout(timer.current) }
  },[])

    
  return (
    <div className="Root">

      { true === modal && <Modal itemNum={itemNum} cartNum={cartNum} /> }
      {/* 상단메뉴 */}
      <header ref={topRef} className="nav">
        <Container maxWidth="md">
          <div className='navbar'>
            <div className="logo">   
                <img onClick={()=>{ history.push('/');
                    dispatch({ type:'스위치false' })} } src="/assets/steam.svg"/>
            </div>
              <ul className="menu">
                <li onClick={()=>{ history.push('/cart');
                    dispatch({ type:'스위치false' }) }}>장바구니</li>       
                <li onClick={()=>{ history.push('/allgame');
                    dispatch({ type:'스위치false' }) }}>제품목록</li>
                <li onClick={()=>{ 
                  dispatch({ type: '모달on' });
                  dispatch({ type: 'login' });
                  }}>로그인</li>
              </ul>           
          </div>
        </Container>
      </header>
      
      
        
      
      
    <Switch>

     <Route path="/allgame">
        <CSSTransition in={스위치} classNames="wow" timeout={1000}>
          <AllGame topScroll={topScroll}/>
        </CSSTransition>
      </Route>

      <Route path="/detail/:id">
        <CSSTransition in={스위치} classNames="wow" timeout={1000}>
          <Detail topScroll={topScroll} changeItemNum={changeItemlNum}/>
        </CSSTransition>
      </Route>

      
      <Route path="/cart">
        <CSSTransition in={스위치} classNames="wow" timeout={1000}>
         <Cart topScroll={topScroll} changeCartNum={changeCartNum}/>
        </CSSTransition>
      </Route>
      

      <Route path="/">
      {/* {비쥬얼섹션} */}
      <section className="visual">
        <Container maxWidth="md">
          <Typography className={classes.title} variant="h3" align='center'>ROCOMMEND</Typography>
          <Grid container alignItems='center'>
            <Grid item xs={12}>
              <CSSTransition in={스위치} classNames="wow" timeout={1000}>
                <CarouselImage item={item} 카운트={count} recommend={recommend} classes={classes} />
              </CSSTransition>
            </Grid>
            <Grid item xs={7}>
              <CarouselInfo recommend={recommend} count={count} />
            </Grid>
            <Grid item xs={5}>
              <CarouselMovement recommend={recommend} count={count} 
                minusCount={minusCount} plusCount={plusCount} 타이머잠깐회수={타이머잠깐회수} setCount={setCount}/>
            </Grid>
          </Grid>
              
        </Container>
      </section>


      {/* 프로모션섹션 */}
      <section className="promotion">
        <Container maxWidth="md">
          <Typography className={classes.title} variant="h3" align='center'>
            SPECIAL OFFERS
          </Typography>
          <Grid container justifyContent="center" spacing={4} >     
            { promotionItem.map((a, i)=>{
                return <ShowPromotion  promotionItem={ a } classes={classes}/> })}
            <Grid item>
              { true === promoCount < 2 &&
                <Button variant="contained" color="primary" size="large" align="center" style={{ margin:'50px' }}
                onClick={()=>{ setPromoCount(promoCount + 1) }}>더보여줘!</Button> }
            </Grid>
          </Grid>
        </Container>
      </section>    
      </Route>
      

      <Route exact path=""></Route>
      <Route exact path=""></Route>
    </Switch>

    <Footer/>

    </div>
  );
}

function CarouselImage(props) {
  useEffect(() => {
    dispatch({ type: '스위치true' })
  })

  let history = useHistory()
  let dispatch = useDispatch()
  let slideContent = props.recommend.map((a, i)=>{ return <img src={ a.img }/> })
  let item = props.recommend[props.카운트]

  return(
    <div className="carousel-img" onClick={()=>{
      history.push(`detail/${ item.id }`); dispatch({ type:'스위치false' }) }}>
      { slideContent[props.카운트] }
    </div> 
  )
}
function CarouselInfo(props) {
  if(props.count >= 0 && props.count < props.recommend.length){
  return(
    <Box sx={{ margin:"10px 0" }}>
      <Box sx={{ paddingBottom: '10px' }}>
        <Typography component="h2" variant="h4" color='initial'>
          { props.recommend[props.count].title }
        </Typography>
      </Box>
      <Box>
        { props.recommend[props.count].sale
        ? <SalePriceBox item={props.recommend[props.count]} />
        : <PriceBox item={props.recommend[props.count]}  /> }
      </Box>
    </Box>
  )}
}
function CarouselMovement(props) {
  const dispatch = useDispatch()
  return (
    <Box>
      <Grid container  justifyContent="space-between" alignItems="center">
        <Grid item>
          <Button color="primary" size="large" align="center" variant="contained"
            onClick={()=>{ dispatch({ type:'스위치false' }); props.minusCount(); props.타이머잠깐회수() }}>
          ◀︎</Button>
        </Grid>
        <Grid item>
        <CarouselDot a={props.recommend} count={props.count} setCount={props.setCount} 타이머잠깐회수={props.타이머잠깐회수}/>
        </Grid>
        <Grid item>
          <Button color="primary" size="large" align="center" variant="contained"
            onClick={()=>{ dispatch({ type:'스위치false' }); props.plusCount(); props.타이머잠깐회수() }}>
          ►</Button>
        </Grid>
      </Grid>
    </Box>
  )
}
export function CarouselDot(props) {
  const dispatch = useDispatch()
  const classes = commonMaterial()
  return(
    props.a.map((a, i)=>{
      if(i !== props.count){ 
        return <LensIcon className={classes.carouselDot} fontSize="medium"
        onClick={()=>{ dispatch({ type:'스위치false' }); props.setCount(i); props.타이머잠깐회수() }} /> 
      }
      if(i === props.count){ 
        return <LensIcon className={classes.NowCarouselDot} fontSize="medium"
        onClick={()=>{ dispatch({ type:'스위치false' }); props.setCount(i); props.타이머잠깐회수() }} /> 
      }
  }))
}

function ShowPromotion(props) {
  let history = useHistory()
  let dispatch = useDispatch()
  let classes = props.classes
  return (
<>
  <Grid item container xs={4} className="promotion-content" >
    <Card elevation={5}>
      <CardMedia component="img" src={ props.promotionItem.img } />
      <CardContent>
        <Grid container alignItems="center" spacing={1}>
          <Grid item className={classes.gridItems} >
            <Typography variant="h5" align="center">{ props.promotionItem.title }</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" mt='2'>
              주말특가! 
            </Typography>
          </Grid>
          <Grid item>
            <SalePriceBox item={props.promotionItem}/>
          </Grid>
          <Grid item container justifyContent="center">
            <Box sx={{ paddingTop:'10px' }}>
              <Button size="large" color="primary" variant="contained" onClick={()=>{
              history.push(`detail/${ props.promotionItem.id }`); dispatch({ type:'스위치false' }) }}>구매하러가기</Button>
            </Box>
          </Grid>    
        </Grid>
      </CardContent>
    </Card>
  </Grid>
</>    
  )
}

function Footer() {
  let classes = commonMaterial()
  return(
    <Box className={classes.footer}>
      <Container maxWidth="md">
        <Box sx={{ height:'15vw'}}>
          안녕하세요 하단입니다~
        </Box>
      </Container>
    </Box>
  )
}



export function PriceBox(props) {
  let classes = commonMaterial()
  return (
    <Box className={classes.priceBox}>
      <Box className={classes.salePriceBox}>
        <Typography className={classes.salePrice}>
          ₩ { props.item.price.toLocaleString() }
        </Typography>
      </Box>
    </Box>
  )
}

export function SalePriceBox(props) {
  let classes = commonMaterial()
  return(
    <Box className={classes.priceBox}>
      <Typography className={classes.saleBox}>
        { props.item.sale }%
      </Typography>
      <Box className={classes.salePriceBox}>
        <Typography className={classes.originPrice}>
          ₩ { props.item.price.toLocaleString() }
        </Typography>
        <Typography className={classes.salePrice}>
          ₩ { makeSalePrice(props.item).toLocaleString() }
        </Typography>
      </Box>
    </Box>
  )
}


//세일가격생성기
export function makeSalePrice(item) {
  let price = item.price - (item.price * (item.sale/100))
  return price
}

export default App;

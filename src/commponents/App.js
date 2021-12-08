
//라이브러리 & API
import React, { useState, useEffect, useRef } from 'react';
import { Route, Link, Switch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

//데이터 & 파일
import '../css/App.scss';
import items from '../game-data.js'
import Detail from './detail'
import AllGame from './allgame'
import Cart from './cart'
import Modal from './modal'

//Material UI Commponents
import { Typography } from "@material-ui/core";
import { Button } from '@material-ui/core'
import { Container, Box } from '@material-ui/core';


function App() {
  //변수 & state 모음
  let item = useSelector((state)=> state.reducer )
  let modal = useSelector((state)=> state.modal )
  let sale30 = useSelector((state)=> state.sale30 )
  let sale40 = useSelector((state)=> state.sale40 )
  let sale50 = useSelector((state)=> state.sale50 )
  
  let history = useHistory();
  let dispatch = useDispatch()

  //슬라이드상품
  let [recommend, setRecommend] = useState([item[7], item[1], item[13], item[8], item[14], item[16]])
  let [카운트, 카운트변경] = useState(0);

  //프로모션 상품
  let [promotionItem, setpromotionItem] = useState(sale30)
  let [promoCount, setPromoCount] = useState(0)
  //Nav토글
  let 스위치 = useSelector((state)=> state.스위치)
  let 타이머 = useRef()
  let autoPlay = useRef()
  autoPlay.current = 플러스시스템

  const topRef = useRef(null)
  function topScroll() {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  //함수 모음
  function 자동카운트() {
    function 카운트시작() {
      dispatch({ type:'스위치false' })
      autoPlay.current()
    }
    타이머.current = setInterval(카운트시작, 4000)
  }
  function 타이머잠깐회수() {
    clearInterval(타이머.current)
    타이머.current = setTimeout(자동카운트, 4000)
  }
  function 플러스시스템() {
    if(카운트 < recommend.length - 1) { 카운트변경(카운트 + 1) }
    else { 카운트변경(0) }
    dispatch({ type:'스위치false' })
  }
  function 마이너스시스템() {
    if(카운트 > 0) { 카운트변경(카운트 - 1) }
    else { 카운트변경(recommend.length - 1) }
    dispatch({ type:'스위치false' })
  }
  
  //detail.js에서 id값받기
  let [detailNum, setDetailNum] = useState()
  function changDetailNum(a) {
    setDetailNum(a)
  }

  //useEffect사용 
  useEffect(()=>{
    // topScroll();//잠깐만끌게잉
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
    자동카운트()
    return ()=> clearInterval(타이머.current) 
  },[])

    
  return (
    <div className="Root">

      { true === modal && <Modal detailNum={detailNum}/> }
      {/* 상단메뉴 */}
      <header ref={topRef} className="nav">
        <div className="inner">
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
        </div>
      </header>
      
      
        
      
      
    <Switch>

     <Route path="/allgame">
        <CSSTransition in={스위치} classNames="wow" timeout={1000}>
          <AllGame topScroll={topScroll}/>
        </CSSTransition>
      </Route>

      <Route path="/detail/:id">
        <CSSTransition in={스위치} classNames="wow" timeout={1000}>
          <Detail topScroll={topScroll} changDetailNum={changDetailNum}/>
        </CSSTransition>
      </Route>

      
      <Route path="/cart">
        <CSSTransition in={스위치} classNames="wow" timeout={1000}>
         <Cart topScroll={topScroll}/>
        </CSSTransition>
      </Route>
      

      <Route path="/">
      {/* {비쥬얼섹션} */}
      <section className="visual">
        <div className="inner">
          <Typography className="title" variant="h3" align='center'>ROCOMMEND</Typography>
          <div className="slide-container">
            <div className="slide-content-box">             
                <CSSTransition in={스위치} classNames="wow" timeout={1000}>
                  <ShowSlide 
                    item={item}  
                    카운트={카운트} 
                    recommend={recommend} />
                </CSSTransition>
                <SlideInfo recommend={recommend} 카운트={카운트}/>
            </div>
            <div className="slide-dot-box">
              {recommend.map((a, i)=>{
              if(i !== 카운트){ return <span className={"slide-dot"} onClick={()=>{ dispatch({ type:'스위치false' }); 카운트변경(i) }}>ㅡ</span>}
              if(i === 카운트){ return <span className={"now-dot"} onClick={()=>{ dispatch({ type:'스위치false' }); 카운트변경(i) }}>ㅡ</span>}
              })}
            </div>
            <div className="arrow-left">
              <button className="slide-btn" onClick={()=>{ dispatch({ type:'스위치false' }); 마이너스시스템(); 타이머잠깐회수() }}>왼쪽!</button>
            </div>
            <div className="arrow-right">
              <button className="slide-btn" onClick={()=>{ dispatch({ type:'스위치false' }); 플러스시스템(); 타이머잠깐회수() }}>오른쪽!</button>
            </div>
          </div>


        </div>
      </section>


      {/* 프로모션섹션 */}
      <section className="promotion">
        <div className="inner">
          <Typography className="title" variant="h4" align='center'>SPECIAL OFFERS 근데 아직 할인은 꿈도 꾸지마쇼!</Typography>
          
      
          <div className="promotion-box">     
            {promotionItem.map((a, i)=>{
              return <ShowPromotion  promotionItem={ a } />
            })}
          </div>
          <Button variant="contained" color="primary" size="large" align="center"
          onClick={()=>{ setPromoCount(promoCount + 1) }}>더보여줘!</Button>
        </div>
      </section>    
      </Route>
      

      <Route exact path=""></Route>
      <Route exact path=""></Route>
    </Switch>

    <Footer/>

    </div>
  );
}

function ShowSlide(props) {
  let history = useHistory()
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: '스위치true' })
  })
  let slideContent = props.recommend.map((a, i)=>{ return <img src={ a.img }/> })
  let item = props.recommend[props.카운트]
  return(
    <div className="slide-content" onClick={()=>{
      history.push(`detail/${ item.id }`); dispatch({ type:'스위치false' }) }}>
      { slideContent[props.카운트] }
    </div> 
  )
}

function SlideInfo(props) {
  if(props.카운트 >= 0 && props.카운트 < props.recommend.length){
  return(
    <div className = "slide-content-info">
      <p>TITLE : { props.recommend[props.카운트].title }</p>
      <p>더이상의 자세한 설명은 생략한다.</p>
      <p>장르 :  {props.recommend[props.카운트].genre }</p>
      <p>평가 : 그냥 미쳤음 ⭐⭐⭐⭐ </p>
      <p>가격 : { props.recommend[props.카운트].price } 원</p>
    </div> 
  )}
}

function ShowPromotion(props) {
  let history = useHistory()
  let dispatch = useDispatch()
  return (
    <div className="promotion-content" onClick={()=>{ history.push(`detail/${props.promotionItem.id}`)}}>
      <img src={ props.promotionItem.img } onClick={()=>{ dispatch({ type:'스위치false' })}}/>
      <div className="promotion-info">
        <p>{ props.promotionItem.title }</p>
        <p>주말특가!</p>
        <p>{ props.promotionItem.price }원이 아닌, 무려... 
        { props.promotionItem.price - (props.promotionItem.price * (props.promotionItem.sale / 100)) } 원! 😎</p>
      </div>
    </div>
  )
}



function Footer() {
  return(
    <footer className="footer">
      <div className="inner">
        <div className="footer-box">
          안녕하세요 하단입니다.
        </div>
      </div>
    </footer>
  )
}

export default App;

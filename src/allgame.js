import React, { useEffect, useImperativeHandle, useRef, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Nav, Card, Button, Carousel } from 'react-bootstrap'
import { CSSTransition } from "react-transition-group";

import './allgame.scss'
import Modal from './modal'


function AllGame(props) {
  let dispatch = useDispatch()

  let item = useSelector((state)=> state.reducer )
  let sale30 = useSelector((state)=> state.sale30 )
  let sale40 = useSelector((state)=> state.sale40 )
  let sale50 = useSelector((state)=> state.sale50 )

  let [mainImg, setMainImg] = useState(item[20].img)
  let [전체상품, 전체상품변경] = useState(item)
  let [슬라이드아이템, 슬라이드아이템변경] = useState([sale30, sale40, sale50])
  let [카운트, 카운트변경] = useState(0)
  let 스위치 = useSelector((state)=> state.스위치)
  let [버튼, 버튼변경] = useState(false)
  let 타이머 = useRef()
  let autoPlay = useRef()
  autoPlay.current = 플러스시스템

  useEffect(()=>{
    dispatch({ type: '스위치true' })
    return ()=>{
      dispatch({ type: '모달off' })
    }
  },[])

  useEffect(()=>{
    자동카운트()
    return ()=> clearInterval(타이머.current) 
  },[])

  useEffect(()=>{
    console.log(버튼)
  },[카운트])
  //자동카운트 동안에 버튼이 false로 안바뀌넹?/

  function 장르별찾기(장르) {
    let 찾음 = item.filter((item)=>{ return item.genre === 장르 })
    let copy = [...item]
    copy = 찾음
    전체상품변경(copy)
  }

  function 자동카운트() {
    function 카운트시작() {
      autoPlay.current()
      버튼변경(false)
    }
    타이머.current = setInterval(카운트시작, 4000)
  }

  function 타이머잠깐회수() {
    clearInterval(타이머.current)
    타이머.current = setTimeout(자동카운트, 4000)
  }
  function 플러스시스템() {
    if(카운트 < 2) { 카운트변경(카운트 + 1); }
    else { 카운트변경(0) }
    버튼변경(false)
  }
  function 마이너스시스템() {
    if(카운트 > 0) { 카운트변경(카운트 - 1) }
    else { 카운트변경(2) }
    버튼변경(false)
  }
  

  return(
  <div className="Root">
    <section className="visual">
      <div className="inner">
        <div className="main">
          <img src={ mainImg }/>
          <div className="main-text">
            <p>마음의 준비? 그런건 필요없습니다</p>
            <p>지금 당장 모든게임을 만나보세요</p>
          </div>
        </div>
      </div>
    </section>
    
    <section className="slide">
      <div className="inner">
        <p className="title">지금 할인중인 상품!</p>
        <CSSTransition in={버튼} classNames='wow' timeout={1000}>
          <div className="slide-box">
              <SlideContent 슬라이드아이템={슬라이드아이템} 카운트={카운트} 버튼변경={버튼변경} />
          </div>
        </CSSTransition>
        <button className='prev' onClick={()=>{ 마이너스시스템(); 타이머잠깐회수(); }}>왼쪽!</button>
        <button className='next' onClick={()=>{ 플러스시스템(); 타이머잠깐회수(); }}>오른쪽!</button>
        <div className="slide-dot-box">
          { 슬라이드아이템.map((a, i)=>{
            if(i !== 카운트) {return<span className="slide-dot" 
            onClick={()=>{ 버튼변경(false);  카운트변경(i)} }>ㅡ</span>}
            if(i === 카운트) {return<span className="now-dot"
            onClick={()=>{ 버튼변경(false);  카운트변경(i) }}>ㅡ</span>}
          })}
        </div>
        
        
      </div>
    </section>

    <section className="item-box">
      <div className="inner">
        <div className="item-tab">
          <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link eventKey="link-0" 
              onClick={()=>{ 전체상품변경(item) }}>전체상품</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" 
              onClick={()=>{ 장르별찾기('오픈월드') }}>오픈월드</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2" 
              onClick={()=>{ 장르별찾기('시뮬레이션') }}>시뮬레이션</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3" 
              onClick={()=>{ 장르별찾기('RPG') }}>RPG</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-4" 
              onClick={()=>{ 장르별찾기('스포츠') }}>스포츠</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-5" 
              onClick={()=>{ 장르별찾기('FPS') }}>FPS</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="item-container">
          <리스트받아라 전체상품={전체상품}/>
        </div>
      </div>
    </section>
    
  </div>
  )
}

function 리스트받아라(props) {
  let history = useHistory()
  let dispatch = useDispatch()
  return props.전체상품.map((a, i)=>{
    let salePrice = a.price - (a.price * (a.sale / 100))
    return(
        <div className="item-content">
          <div className="content-img" onClick={()=>{ history.push(`detail/${a.id}`) }}>
            <img src={a.img} onClick={()=>{ dispatch({ type:'스위치false' }) }}/>
          </div>
          <div className="content-info">
            <p>{ a.title }</p>
            { a.sale
            ? <p>원래가격{a.price}원, 세일가격!{salePrice}원!</p>
            : <p>{a.price}</p> }
          </div>
        </div>
    )
  })
}

function SlideContent(props) {
  let history = useHistory()
  let dispatch = useDispatch()
  useEffect(()=>{
    props.버튼변경(true)
  })
  return(
    props.슬라이드아이템[props.카운트].map((a, i)=>{
      let salePrice = a.price - (a.price * (a.sale / 100))
      return(
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={a.img} />
          <Card.Body>
            <Card.Title>{a.title}</Card.Title>
            <Card.Text>
              주말특가! {a.title} 을 할인된 가격에 만나보세요!
            </Card.Text>
            <div className="info">
              <div className="sale"> -{a.sale} %</div>
              <div className="price">
                <div className="origin">{a.price} 원</div>
                <div className="final">{salePrice} 원</div>
              </div>
            </div>
            <Button variant="primary" onClick={()=>{
              history.push(`/detail/${a.id}`);
              dispatch({ type:'스위치false' })
           }}>지금 구매하기</Button>
          </Card.Body>
        </Card>
      )
  })
  )
}

export default AllGame
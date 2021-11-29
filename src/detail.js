
//라이브러리 & API
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import YouTube from "react-youtube";
import axios from "axios";

//데이터 & 파일
import './detail.scss'


function Detail(props) {
  //변수 & State 모음
  let dispatch = useDispatch()

  let item = useSelector((state)=> state.reducer )
  let modal = useSelector((state)=> state.modal )
  let 모달종류 = useSelector((state)=> state.모달종류)
  let cart = useSelector((state) => state.cart)
  let { id } = useParams();
  let items = item.find((a)=>{ return a.id == id })

  let opts = {
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding : 1
    },
  };
  let 스위치 = useSelector((state)=> state.스위치)
  
  function detailNumSubmit() {
    props.changDetailNum(id)
  }
  //useEffect 사용
  
  useEffect(()=>{
    dispatch({ type: '스위치true' })
    return ()=>{
      dispatch({ type: '모달off' })
    }
  },[])

  useEffect(()=>{
    props.topScroll()
  },[])

  return(
    <div className="Root">
      
      <section className="item">
        <div className="inner">
          <p className="title">{ items.title }</p>
          <div className="item-box">
            <div className="item-content">
              <img src={ items.img }/>
            </div>
            <ItemInfo items={items}/>
          </div>
          <div className="item-buy">
            <button>구매하기</button>
            <button onClick={()=>{ 
              dispatch({ type: '모달on'});   
              dispatch({ type: 'cartin' });
              detailNumSubmit()
            }}>장바구니</button>

            { 
              items.sale
              ?  <span className="price"> { items.price } 원 아니고!  { items.price - (items.price * (items.sale / 100)) } 원</span>
              :  <span className="price"> { items.price } 원</span>
            }
          </div>
        </div>
      </section>


      <section className="info">
        <div className="inner">
          <div className="info-youtube">
            <YouTube videoId={items.youtube} opts={opts}></YouTube>
          </div>
          <div className="info-explain">
            <div className="explain-game">
              <p>게임에 대해</p>
              <div>{items.explain}</div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

function ItemInfo(props) {
  return(
    <div className="item-info">
      <div className="text">
        <div className="subtitle">평가 :</div>
        <div className="result"> 미친게임 ⭐⭐⭐⭐</div>
      </div>
      <div className="text">
        <div className="subtitle">장르 :</div>
        <div className="result">{ props.items.genre }</div>
      </div>
    </div>
  )
}


export default Detail
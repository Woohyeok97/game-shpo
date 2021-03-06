import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import './cart.scss'

function Cart(props) {
  let dispatch = useDispatch()

  let item = useSelector((state)=> state.reducer )
  let modal = useSelector((state)=> state.modal )
  let sale30 = useSelector((state)=> state.sale30 )
  let sale40 = useSelector((state)=> state.sale40 )
  let sale50 = useSelector((state)=> state.sale50 )
  let cart = useSelector((state) => state.cart)
  let 스위치 = useSelector((state)=> state.스위치)

  let [saleItem, setSaleItem] = useState([sale30, sale40, sale50])

  useEffect(()=>{
    dispatch({ type: '스위치true' })
  },[cart])
  useEffect(()=>{
    return ()=>{
      dispatch({ type: '모달off' })
    }
  },[])

  return(
    <div className="Root">
      <section>
        <div className="inner">
          <div className="title">
            <p>장바구니</p>
          </div>
        </div>
      </section>

      <section>
        <div className="inner">
          <div className="container">

            <div className="cart-box">
              <div className="item-tab">
                <CartItem/>
              </div>
              <div className="buy-tab">
                <Buynow/>
              </div>
              <div className="more-tab">
                <More/>
              </div>
            </div>
                <Promotion/>
            <div className="recommend">
              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CartItem(props) {
  let dispatch = useDispatch()
  let cart = useSelector((state) => state.cart)
   return cart.map((a, i)=>{
      return(
        <div className="cart-item">
          <div className="item-title">
            <img src={ cart[i].img }/>
            <span>{ cart[i].title }</span>
          </div>
          <div className="item-price">
            <div>{ cart[i].price }</div>
            <span onClick={()=>{ 
              dispatch({ type: '모달on'});   
              dispatch({ type: 'cartRemove' });
            }}>제거</span>
          </div>
        </div>
      )
    })
}

function Buynow() {
  let cart = useSelector((state) => state.cart)

  function sum() {
    let total = 0;
    for(let i = 0; i < cart.length; i++) {
      total = total + cart[i].price
    }
    return total
  }
  return(
    <div className="total">
      <div className="total-price">
        <p>총합 : { sum() } 원</p>
      </div>
      <div className="total-buynow">
        <button className="buynow-btn">구매하기</button>
      </div>
    </div>
  )
}

function More() {
  let dispatch = useDispatch()
  let history = useHistory()
  let cart = useSelector((state) => state.cart)
  return(
    <div className="">
      <div className="">
        <button onClick={()=>{
          dispatch({ type:'스위치false' });
          history.push('/allgame')
        }}>좀더 둘러보기</button>
      </div>
      <div className="">
        <button className="" onClick={()=>{ 
          dispatch({ type:'cartAllRemove' });
          dispatch({ type:'모달on' })
          }}>장바구니 비우기</button>
      </div>
    </div>
  )
}

function Promotion() {
  let dispatch = useDispatch()
  let sale50 = useSelector((state)=> state.sale50 )
  return(
    <div className="">
      {
        sale50.map((a, i)=>{
          return(
            <div>
              안녕하세요. 저는 세일입니다.
            </div>
          )
        })
      }
    </div>
  )
}

export default Cart
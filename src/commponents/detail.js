
//라이브러리 & API
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import YouTube from "react-youtube";

//데이터 & 파일
import '../css/detail.scss'
import { makeSalePrice } from "./App";
//Material UI Commponents
import { commonMaterial } from './commom-material';
import { Typography } from "@material-ui/core";
import { Button } from '@material-ui/core'
import { Container, Grid, Box } from '@material-ui/core'


function Detail(props) {
  //변수 & State 모음
  let dispatch = useDispatch()
  let classes = commonMaterial()

  let item = useSelector((state)=> state.reducer )
  let { id } = useParams();
  let items = item.find((a)=>{ return a.id == id })

  //YOUTUBE API
  let opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding : 1
    },
  };
  
  //App.js에 itemNum보내기
  function transmitItemNum() {
    props.changeItemNum(id)
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
        <Container maxWidth="md">
        <Box sx={{ marginBottom:'50px'}}>
        <Typography className={classes.title} variant="h3" align='center'>{ items.title }</Typography>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box sx={{ width:'100%', height: '100%'}} className='youtube-box'> 
                <YouTube videoId={items.youtube} opts={opts} height={'100%'}/>
              </Box>
            </Grid>
            <Grid item container xs={4} direction="column" justifyContent="space-between" spacing={2}>
              <Grid item>
                <Box>
                  <img className={classes.img} src={ items.img }/>
                </Box>
              </Grid>
              <Grid item>
                <ItemInfo items={items}/>
              </Grid>
              <Grid item container justifyContent="flex-start" spacing={2} >
                <Grid item>
                  <Button variant="contained" color="primary" size="large">구매하기</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" size="large"
                    onClick={()=>{
                    dispatch({ type: '모달on'});   
                    dispatch({ type: 'cartin' });
                    transmitItemNum() }}>장바구니 담기</Button>
                </Grid>
              </Grid>           
            </Grid>
          </Grid>
        </Box>  
        </Container>∫
      </section>


      <section className="info">
        <Container maxWidth="md">
          <Typography className={classes.title} variant="h3" align='center'>게임에 대해</Typography>
          <Box sx={{ marginBottom:'50px'}}>
            <Typography variant="body2">{items.explain}</Typography>
          </Box>
        </Container>
      </section>


    </div>
  )
}

function ItemInfo(props) {
  const items = props.items
  return(
    <>
      <Box>
        <Typography variant="body1">평가 : 미친게임 ⭐⭐⭐⭐</Typography>
        <Typography variant="body1">장르 : { items.genre }</Typography>
        <Typography variant="body1">가격 : 
          { 
            items.sale
            ?  <span className="price"> { items.price.toLocaleString() } 원 아니고! { makeSalePrice(items).toLocaleString() } 원</span>
            :  <span className="price"> { items.price.toLocaleString() } 원</span>
          }
        </Typography>
      </Box>
    </>
  )
}


export default Detail
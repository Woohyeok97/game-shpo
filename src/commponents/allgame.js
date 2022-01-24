//라이브러리 & API
import React, { useEffect, useRef, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import '../css/allgame.scss'
import { SalePriceBox, PriceBox, CarouselDot } from "./App";

//Material UI Commponents
import { commonMaterial } from "./commom-material";
import { Typography } from "@material-ui/core";
import { Button } from '@material-ui/core'
import { Grid, Box, Container, Tab} from '@material-ui/core';
import { Card, CardContent, CardHeader, CardMedia } from '@material-ui/core'
import { TabContext, TabList, TabPanel,} from '@material-ui/lab'

function AllGame() {
  //변수 & state 모음
  let dispatch = useDispatch()
  let classes = commonMaterial()
  let item = useSelector((state)=> state.reducer )
  let sale30 = useSelector((state)=> state.sale30 )
  let sale40 = useSelector((state)=> state.sale40 )
  let sale50 = useSelector((state)=> state.sale50 )

  let [전체상품, 전체상품변경] = useState(item)
  let [count, setCount] = useState(0)
  let [버튼, 버튼변경] = useState(false)
  let [tabValue, setTabValue] = useState('1')
  let carouselItem = [sale30, sale40, sale50]
  let timer = useRef()
  let autoPlay = useRef()
  autoPlay.current = plusCount


  //useEffect 모음
  useEffect(()=>{
    dispatch({ type: '스위치true' })
    return ()=>{
      dispatch({ type: '모달off' })
    }
  },[])
  useEffect(()=>{
    자동카운트();
    return ()=> { clearInterval(timer.current); clearTimeout(timer.current) }
  },[])

  //함수모음
  function genreChange(genre) {
    let find = item.filter((item)=>{ return item.genre === genre })
    let copy = [...item]
    copy = find
    전체상품변경(copy)
  }

  function 자동카운트() {
    function startCount() {
      autoPlay.current()
      버튼변경(false)
    }
    timer.current = setInterval(startCount, 4000)
  }
  function 타이머잠깐회수() {
    clearInterval(timer.current)
    timer.current = setTimeout(자동카운트, 4000)
  }
  function plusCount() {
    if(count < 2) { setCount(count + 1); }
    else { setCount(0) }
    버튼변경(false)
  }
  function minusCount() {
    if(count > 0) { setCount(count - 1) }
    else { setCount(2) }
    버튼변경(false)
  }

  function handleChange(event, newValue) {
    setTabValue(newValue)
  }
  

  return(
    
  <div className="Root">
    <section className="visual">
      <Container maxWidth="md">
        <Typography className={classes.title} variant="h3" align='center'>지갑 열어</Typography>
        <img className={classes.img} src={ item[20].img }/>
      </Container>
    </section>
    

    <section className="slide">
      <Container maxWidth="md">
        <Typography className={classes.title}variant="h3" align='center'>지금 할인중인 상품!</Typography>
        <Grid container>
          <CSSTransition in={버튼} classNames='wow' timeout={1000}>
            <Grid container item spacing={2}>
              <CarouselContent carouselItem={carouselItem} count={count} 버튼변경={버튼변경} />
            </Grid>
          </CSSTransition>
          <Grid item xs={12}>
            <CarouselMovement carouselItem={carouselItem} count={count} setCount={setCount}
              plusCount={plusCount} minusCount={minusCount} 타이머잠깐회수={타이머잠깐회수}/>
          </Grid>
        </Grid>
      </Container>
    </section>


    <section className="item-box">
      <Container maxWidth="md">
        <Typography className={classes.title}variant="h3" align='center'>모든상품 둘러보기</Typography>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="전체상품" value="1" onClick={()=>{ 전체상품변경(item) }}/>
              <Tab label="오픈월드" value="2" onClick={()=>{ genreChange('오픈월드') }}/>
              <Tab label="시뮬레이션" value="3" onClick={()=>{ genreChange('시뮬레이션') }}/>
              <Tab label="RPG" value="4" onClick={()=>{ genreChange('RPG') }}/>
              <Tab label="스포츠" value="5" onClick={()=>{ genreChange('스포츠') }}/>
              <Tab label="FPS" value="6" onClick={()=>{ genreChange('FPS') }}/>
            </TabList>
          </Box>
        </TabContext>
        <Box sx={{ padding:'40px 0' }}>
          <ItemList 전체상품={전체상품}/>
        </Box>
      </Container>
    </section>
    
  </div>
  )
}

function CarouselContent(props) {
  let history = useHistory()
  let dispatch = useDispatch()
  let classes = commonMaterial()
  useEffect(()=>{
    props.버튼변경(true)
  })
  return(
    props.carouselItem[props.count].map((a, i)=>{
      return(
        <Grid item xs={4}>
          <Card elevation={5}>
            <CardMedia component="img" src={a.img}/>
            <CardContent>
              <Grid container alignItems="center" spacing={1}>
                <Grid item className={classes.gridItems} >
                  <Typography variant="h5" align="center">{ a.title }</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" mt='2'>
                    주말특가! 
                  </Typography>
                </Grid>
                <Grid item>
                  <SalePriceBox item={a}/>
                </Grid>
                <Grid item container justifyContent="center">
                  <Box sx={{ paddingTop:'10px' }}>
                    <Button size="large" color="primary" variant="contained" 
                      onClick={()=>{
                      history.push(`/detail/${a.id}`);
                      dispatch({ type:'스위치false' }) }}>구매하러가기</Button>
                  </Box>
                </Grid>    
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )
  })
  )
}
function CarouselMovement(props) {
  return(
    <Box sx={{ margin:'30px 0' }}>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Button color="primary" size="large" align="center" variant="contained"
            onClick={()=>{ props.minusCount(); props.타이머잠깐회수();}}>
          ◀︎</Button> 
        </Grid>
        <Grid item>
          <CarouselDot a={props.carouselItem} count={props.count} setCount={props.setCount}/>
        </Grid>
        <Grid item>
          <Button color="primary" size="large" align="center" variant="contained"
            onClick={()=>{ props.plusCount(); props.타이머잠깐회수() }}>
          ►</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

function ItemList(props) {
  let history = useHistory()
  let dispatch = useDispatch()
  let classes = commonMaterial()
 
  return props.전체상품.map((a, i)=>{
    return(
      <Box sx={{ paddingTop:"18px" }}>
        <Card className={classes.card} elevation={5}>
          <Box sx={{ width:'30%' }}>
            <CardMedia component="img" src={ a.img } className={classes.img}/>
          </Box>
          <CardContent>
            <Typography variant="h4">
            { a.title }
            </Typography>
            {
              a.sale 
              ? <SalePriceBox item={a}/>
              : <PriceBox item={a}/>
            }
            <Box sx={{ paddingTop:'10px' }}>
            <Button size="medium" color="primary" variant="contained"
              onClick={()=>{ history.push(`/detail/${a.id}`) }}>구매하러가기</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>  
    )
  })
}



export default AllGame
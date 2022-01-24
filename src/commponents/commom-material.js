import { makeStyles, createStyles, Theme } from '@material-ui/core'

export const commonMaterial = makeStyles({
  gridItems: {
    boxSizing :'border-box',
    width : '100%'
  },
  box : {
    height : '100%',
    boxSizing: 'border-box',
  },
  text : {
    fontSize : '20px'
  },
  title : {
    margin : '10px 0px 30px',
    borderBottom: '2px solid grey',
    lineHeight: '2'
  },
  img : {
    width : '100%',
    height : '100%',
  },
  button : {
    display : 'flex',
    justifyContent : 'center'
  },
  card : {
    display : 'flex', 
  },
  priceBox : {
    display : 'flex',
    alignItems : 'center',
  },
  saleBox : {
    backgroundColor : '#a1cd44',
    padding : '5px 10px'
  },
  salePriceBox : {
    display : 'flex',
    backgroundColor : '#000000',
    opacity : '0.75',
    padding : '5px 10px'
  },
  originPrice : {
    color : '#7b8388',
    textDecoration : 'line-through',
    paddingRight : '10px'
  },
  salePrice : {
    color : '#FFFFFF',
  },
  footer : {
    color: '#969eab',
    backgroundColor : '#171a21',
  },
  carouselDot : {
    color: '#767e88',
    transition: '0.8s',
    padding: "5px",   
  },
  NowCarouselDot : {
    color: '#c6d4df',
    padding: "5px",  
  }
})
import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../../../../components/commonThings/footer/Footer'
import Myheader from '../../../../components/commonThings/header/MyHeader'
import './ShopHomePage.css'
import shopImg from './salonImg.jpg'
import shopOpenVector from './shopOpen.png'
import yellowLoading from './yellowLoading.gif'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ServicesSelector from '../../../../components/userSide/shopSide/addServices/ServiceSelector'
import { useNavigate } from 'react-router-dom'
import QueueTable from '../../../../components/commonThings/queue/QueueTable'

function ShopHomePage() {


  


  
  return (
    <div className=' shop_home_page' >
        <Myheader/>
        <MainPage/> 
        <Footer/>
    </div>
  )
}

export default ShopHomePage


const MainPage = ()=> {


  const navigate = useNavigate()
  return(
    <div className="shop_home_main">
      <div className=" content_container bg-dark container">
        {/* <div className="shop_badge">
          <p>Hair Salon</p>
        </div> */}
        <div className="queue_top">
        <Grid container style={{height:'100%',}} spacing={0}>
          <Grid item className="content  " xs={12} sm={8}>
            
            <QueueTable/>

            
            
          </Grid>
          <Grid item className="content " xs={12} sm={4}>

              
            
          </Grid>
          
        </Grid>
          
        </div>
        

      </div>
      
    </div>
  )
}



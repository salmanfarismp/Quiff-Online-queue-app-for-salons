import {Avatar, Button, Card, CardHeader, Fab, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import Footer from '../../components/_commonThings/footer/Footer'
import Myheader from '../../components/_commonThings/header/MyHeader'
import '../_shop/shopHome/ShopHomePage.css'
import { useNavigate } from 'react-router-dom'
import QueueTable from '../../components/_commonThings/shopContent/QueueTable'
import ShopHeader from '../../components/_commonThings/shopContent/ShopHeader'
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import NavigationIcon from '@mui/icons-material/Navigation';

import SendIcon from '@mui/icons-material/Send';

import Chat from '../../components/_commonThings/Chat'



function QueueViewPage({props}) {

 

  const navigate = useNavigate()

 


  
  return (
    
    <div className=' shop_home_page' >
        <Myheader/>
        <div className="shop_home_main">
      <div className=" content_container bg-dark container">
         <ShopHeader customer_queue_view />
        
        

      </div>
      
    </div>
        <Footer/>
    </div>
  )
}

export default QueueViewPage








  

import React, { useContext, useEffect, useState } from 'react'
import {  Button, Fab, Grid, Typography } from '@mui/material'
import shakeHand from './shakeHand.png'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import yellowLoading from './yellowLoading.gif'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ServicesSelector from '../../../components/_shop/addServices/ServiceSelector'
import { useNavigate } from 'react-router-dom'
import PlanCards from '../../../components/_shop/PlanCards'
import ShopDetailsContent from '../../../components/_shop/shopHome/ShopDetailsContent'
import OwnerDetailsContent from '../../../components/_shop/shopHome/OwnerDetailsContent'
import ManageServicesContent from '../../../components/_shop/shopHome/ManageServicesContent'
import ViewPlansContent from '../../../components/_shop/shopHome/ViewPlansContent'
import ViewReviewsContent from '../../../components/_shop/shopHome/ViewReviewsContent'
import BlockUsersContent from '../../../components/_shop/shopHome/BlockUsersContent'
import ShopHeader from '../../../components/_commonThings/shopContent/ShopHeader'
import axios from 'axios'
import QueueTable from '../../../components/_commonThings/shopContent/QueueTable'
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import AddCustomer from '../../../components/_commonThings/shopContent/AddCustomer'
import ShopQueue from './ShopQueue';
import AuthContext from '../../../contexts/AuthContext';
import KeepShopLive from '../../../contexts/UserContext/KeepShopLiveContext';

export default function MainPage() {





    const [activeContent, setActiveContent] = useState(0)
  
    function getMainPageContent(step) {
      switch (step) {
        case 0:
          return <ViewReviewsContent/>;
        case 1:
          return <ViewPlansContent/>;
        case 2:
          return <ManageServicesContent/>;
        case 3:
          return <ShopDetailsContent />;
        case 4:
          return <OwnerDetailsContent />;
        case 5:
          return <BlockUsersContent/>;
        default:
          throw new Error('Unknown step');
      }
    }
  
    const {user} = useContext(AuthContext)
    const {shopisLive,setShopisLive} = useContext(KeepShopLive)
    const [shop, setshop] = useState(null)
  
    const getshop = async () =>{
      try {
       
        const response = await axios.get(`http://127.0.0.1:8000/api/shop_home/${user?.user_id}/`)
       
        if(response.status === 200){
          setshop(response.data)
        }
        
      }catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      
     getshop()
    
      
    }, [shopisLive])
    const [is_queue, setIs_queue] = useState(false)
  
    const handleShopOpening = async() => {
  
      try {
       
        const response = await axios.put(`http://127.0.0.1:8000/api/shop_opening/${shop?.id}/`)
       
        if(response.status === 200){
          setshop(response.data)
        }
        
      }catch (error) {
        console.log(error)
      }
    
  
    }
  

  
    
    
  
  
   
    const navigate = useNavigate()
    return(
      <div className="shop_home_main">
        <div className=" content_container bg-dark container">
          {/* <div className="shop_badge">
            <p>Hair Salon</p>
          </div> */}
          <ShopHeader shop={shop}  setIs_queue={setIs_queue} is_queue={is_queue} shop_side />
          {!is_queue &&  <div className="body_container ">
            <div className="navigation  ">
            <div className="nav_items">
                
                <p onClick={()=>setActiveContent(0)} className={activeContent===0?'active nav_item':'nav_item'}> <nobr> VIEW REVIEWS </nobr></p>
                <p onClick={()=>setActiveContent(1)} className={activeContent===1?'active nav_item':'nav_item'}> <nobr> VIEW PLANS </nobr></p>
                <p onClick={()=>setActiveContent(2)} className={activeContent===2?'active nav_item':'nav_item'} > <nobr> MANAGE SERVICES </nobr></p>
                <p onClick={()=>setActiveContent(3)}  className={activeContent===3?'active nav_item':'nav_item'} > <nobr> SHOP DETAILES </nobr></p>
                <p onClick={()=>setActiveContent(4)} className={activeContent===4?'active nav_item':'nav_item'}> <nobr> OWNER DETAILES </nobr></p>
                <p onClick={()=>setActiveContent(5)} className={activeContent===5?'active nav_item':'nav_item'}> <nobr> MORE CONTROLS</nobr></p>
                
              </div>
            </div>
          </div>}
  
          <div className="body_content container text-light m-2 ">
          {is_queue?<ShopQueue shop={shop} handleShopOpening={handleShopOpening} />
          :
          <div className="broo">
            {getMainPageContent(activeContent)}
          </div>}
          </div>
  
        </div>
        
      </div>
    )
  }
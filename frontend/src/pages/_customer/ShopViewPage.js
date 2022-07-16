import { Fab, Grid } from '@mui/material'
import axios from 'axios'
import React, { useContext, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../components/_commonThings/footer/Footer'
import Myheader from '../../components/_commonThings/header/MyHeader'
import QueueTable from '../../components/_commonThings/shopContent/QueueTable'
import ShopHeader from '../../components/_commonThings/shopContent/ShopHeader'

import Chat from '../../components/_commonThings/Chat'
import KeepShopLive from '../../contexts/UserContext/KeepShopLiveContext'
import CustomerToQueue from '../../components/_customer/CustomerToQueue'
function ShopViewPage() {
  const {shopId} = useParams()
  const [shop,setShop] = useState(null)
  console.log(shopId)
  const {shopisLive} = useContext(KeepShopLive)
  const [is_queue, setIs_queue] = useState(false)
  const getShop = async () =>{

    
    
    try {

      const response = await axios.get(`http://127.0.0.1:8000/api/single_shop/${shopId}`,  )
    console.log(response.data)
    setShop(response.data)
      
    }catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    
    getShop()
  
   
  }, [shopisLive])

  return (
    <div className=' shop_home_page'>
      <Myheader/>
      <div className="shop_home_main">
        {shop&& 
      <div className=" content_container bg-dark container">
        <ShopHeader shop={shop} is_queue={is_queue} setIs_queue={setIs_queue}  customer_shop_view />
        <div className="body_container ">

        {is_queue?<CustomerToQueue shop={shop} />
          :
          <div className="broo">
            <h4  className="capriola-font babluaka">No Reviews Currently!</h4>
          </div>}
          
          
          
        </div>
      </div>}
          
          </div>
        <Footer/>
    </div>
  )
}

export default ShopViewPage

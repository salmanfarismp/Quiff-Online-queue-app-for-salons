
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../../components/_commonThings/footer/Footer'
import Myheader from '../../../components/_commonThings/header/MyHeader'
import './ShopHomePage.css'

import AuthContext from '../../../contexts/AuthContext'

import MainPage from './MainPage'
import VerificationPage from './VerificationPage'

function ShopHomePage() {

  const [active, setActive] = useState(false)
  const {user} = useContext(AuthContext)



  
  
  return (
    <div className=' shop_home_page' >
        <Myheader/>
        {user?.is_shopVerified ?<MainPage />:<VerificationPage  />}
        
        <Footer/>
    </div>
  )
}

export default ShopHomePage


const MainPageContent = ({children})=> {

  return {children}
}




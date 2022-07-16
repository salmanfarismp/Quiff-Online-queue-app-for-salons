import React from 'react'
import {  useNavigate } from 'react-router-dom'
import Myheader from '../header/MyHeader'
import './Banner.css'


function Banner(){
    const navigate = useNavigate()
    return(
        <div className="banner-body">
            <Myheader commonLanding />
            <div className="container banner-content">
                <h1 className="capriola-font">A better way to <br/> book salon appointments.</h1>
                <p className="darktheme ">an app designed for people with busy life and nice hair style.</p>
                <button onClick={()=>navigate('/register')} className="btn darktheme" style={{backgroundColor:'#FFCE45',borderRadius:'10px',fontWeight:'bold'}}>Join Now</button>
            </div>

        </div>
    )
}
export default Banner
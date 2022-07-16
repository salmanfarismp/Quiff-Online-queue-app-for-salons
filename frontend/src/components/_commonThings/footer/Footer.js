import React from 'react'
import './Footer.css'
import logo from './logo.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';




function Footer() {
  return (
    <div className='Footer' >
        <div className="footer-inner-div" >
        <img src={logo} alt="logo" srcSet="" style={{width: '160px', height: '60px'}} />
        </div>
        <div className="footer-inner-div">
                <div className="footer-scocial-icons">
                    <div className="sc4nf">
                    <FacebookIcon/>
                    </div>
                    <div className="sc4nf">
                    <InstagramIcon/>
                    </div>
                    <div className="sc4nf">
                    <TwitterIcon/>
                    </div>
                    <div className="sc4nf">
                    <LinkedInIcon/>
                    </div>     
                </div>
                <div className="footer-contacts">
                    <p>+91 9207439466</p>
                    <p>quiffhairsolutions@business.com</p>
                </div>
        </div>
        
    </div>
  )
}

export default Footer
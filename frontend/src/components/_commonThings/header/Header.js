import React,{useContext} from 'react'
import {  useNavigate } from 'react-router-dom'
import MaterialIcon, {colorPalette} from 'material-icons-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'
import './Header.css'
import AuthContext from '../../../contexts/AuthContext';

const date=new Date()
const currentTime= date.getUTCHours()
const Swal = require('sweetalert2')



function Header() {
    const navigate = useNavigate()
    const {logoutAdmin,logoutUser} = useContext(AuthContext)
    return (
        <div className="d-flex header-container p-3 justify-content-between"  >
          <div className="logo" style={{backgroundColor:'blue'}} >
              <img src={logo} alt="logo" style={{width: '160px', height: '60px'}} srcSet="" />
          </div>
          <div className="quicklinks darktheme d-flex justify-content-around align-items-center" style={{width: '30%'}}>
            <p style={{cursor: 'pointer'}} onClick={()=>navigate('/shopslandingpage')}>Add Shop</p>
            <p>FAQ</p>
            <div className="signin d-flex align-items-center h-100">
                <button className="btn btn-secondary " onClick={()=>navigate('/login')} style={{height: '40px',background:'none',border: '1px solid #FFCE45', borderRadius:'10px'}}>Sign In</button>
            </div>
          </div>
            
        </div>
    )
}

export default Header

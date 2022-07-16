import React, { useEffect, useState } from 'react'
import Footer from '../../../components/_commonThings/footer/Footer'
import Myheader from '../../../components/_commonThings/header/MyHeader'
import './Home.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import ShopCard from '../../../components/_customer/shopCard/ShopCard';
import { Autocomplete, Grid, TextField } from '@mui/material';
import {Autocomplete as GoogleAutoComplete } from '@react-google-maps/api'
import axios from 'axios';
import noResultGIf from './no_result.gif'


function Home() {


    const [shops,setShops] = React.useState(null);
    const [shopsArray,setShopsArray] = React.useState([]);
    const [filterData,setFilerData] = React.useState(null)
    const [filterCount, setfilterCount] = useState(0)
    const [curLocation,setCurLocation] = React.useState({lat:0,lng:0})
    const [postLocation, setPostLocation] = useState(null)
    const [showPlace, setShowPlace] = useState('')



    React.useEffect( () => {
     
      let location 
      navigator.geolocation.getCurrentPosition((position)=>{
        setPostLocation({lat: position.coords.latitude,lng: position.coords.longitude})
      setCurLocation({lat: position.coords.latitude,lng: position.coords.longitude})
      location = {lat: position.coords.latitude,lng: position.coords.longitude}
  
      getShops(location)
      
    })

  
      }, [])
  
      useEffect(() => {
        
        if(postLocation !== null && shops != null){

          shopsAccordingToLocation(shops, postLocation)
        }
        
      }, [postLocation])
      
  
    const getShops = async (location) =>{
      try {
  
      const response = await axios.get("http://127.0.0.1:8000/api/shopsView")
      setShops(response.data)
      shopsAccordingToLocation(response.data, location)
      
      
        
      }catch (error) {
        console.log(error)
      }
    }
  

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }
    
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
    const radius = 10

    function shopsAccordingToLocation(shops,location){

      const output =  shops.filter((shop)=>{

   
  
        let dist = getDistanceFromLatLonInKm(shop.latitude, shop.longitude,location.lat, location.lng)
        console.log("dist:",dist)
        return radius >= dist
        

        
      })

      setFilerData(output)
      setfilterCount(output.length)

    }


    const handlePlaceChange =()=>{
      
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      setPostLocation({lat: lat,lng: lng})
     
    }
    

  
    const [autocomplete,setAutoComplete] = React.useState('')
    const onAutoCompleteLoad = (autoC) =>{
      
        setAutoComplete(autoC); 
        
    
    }
    const geocoder = new window.google.maps.Geocoder()
    React.useEffect(() => {
  
      geocoder.geocode({ location: postLocation }).then((response) => {
        if (response.results[0]) {
          setShowPlace(response.results[0].address_components[1].long_name)
          
        }
      })
    
    }, [postLocation])


      

      
    
     



  
  // const topSalons = [] 
  // topSalons.push({label: shops?.map((sh) =>  sh.name )})

  React.useEffect(() => {
    
    if(shops !== null){
      const propertyValues = Object.values(shops);
      console.log('propertyValues:',propertyValues)
      setShopsArray(propertyValues)
    }
    

  
    
  }, [shops])

  

  
    
  return (
    <div className="myHomePage">
    <div className="HomeBanner">
      <Myheader isAuthenticated/>
      <div className="home-banner-content">
        <h1 className="capriola-font">Discover the best salons here!</h1>
        <div className="home-banner-search">
            <div className="location-search">
            <LocationOnIcon/>
            <GoogleAutoComplete onPlaceChanged={handlePlaceChange} onLoad={onAutoCompleteLoad} >
            <TextField
                    id="locateInMap"
                    name="locateInMap"
                   
                    onChange={(e)=>setShowPlace(e.target.value)}
                    value={showPlace}
                    
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    />

            
            </GoogleAutoComplete>
            </div>
          <div className="shop-search">
                <SearchIcon/>
                <Autocomplete
                  
                  id="combo-box-demo"
                  getOptionLabel={option => option.name}
                  onChange={(event, value) =>
                    {
                     if(value !== null ) {

                      return(setFilerData([value]),setfilterCount(1))
                     }
                      
                      }}
                  options={shopsArray}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} variant="standard"  label="Search Shops Here..." />}
                />
                {/* <input type="text"   placeholder='Search for salons'/> */}
          </div>
          </div>
      </div>
      
    </div>
    <div className="HomeBody">
        {filterCount===0?
        <div className=" container filterShops">
          <div style={{height:'500px'}} className=" w-100 d-flex align-item-center justify-content-center">
          <h1  className="capriola-font babluaka">OOPS!</h1>
          </div>
        </div>:
        <div className=" container filterShops">
            <div className="numofshops">
                <h2>{filterCount} Salons</h2>
            </div>
            <div className="filteroptions">
                <ul className="d-flex">
                    <li className=' active li-styling'>
                        Waiting time
                    </li>
                    
                    <li className='li-styling'>
                         Hair Salons
                    </li>
                    <li className='li-styling'>
                        Beauty Salons
                    </li>
                    <li className='li-styling'>
                        Rating
                    </li>
                </ul>
            </div>
        </div>}
        <div className="shopcards">
        <Grid container spacing={2}>
        {filterData?.map((shop) =>{
            console.log(shop)
      return(
            <Grid key={shop.id} item xs={12} sm={4}>
            <ShopCard shop={shop} 
            />
            </Grid>
             )
        })} 
            
        </Grid>
        </div>
          
    </div>
    <Footer/>

    </div>
  )
}

export default Home

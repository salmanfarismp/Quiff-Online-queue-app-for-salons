import * as React from 'react';
import {useContext} from 'react';
import { useJsApiLoader,GoogleMap, Marker, Autocomplete, } from '@react-google-maps/api'
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AuthContext, { ShopContext } from '../../../contexts/AuthContext';
import { Box, Button, Skeleton } from '@mui/material';












const MapAndAll = ({register,errors})=>{

    const {shopLocation,shopPlaceSearch,setShopLocation,
      setShopPlaceSearch,pageOneDone,setShopCountry,setShopLocPlace,setShopState,setShopPinCode} = useContext(ShopContext)
  
  
      const libraries = React.useMemo(() => ['places'], [])
      const {isLoaded} = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
      })
      const [map, setMap] = React.useState( /** @type google.maps.Map */  (null))

      //used js docs to use 'type' to get auto completions
    
      const handlePlaceChange =()=>{
      
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setShopLocation({lat: lat,lng: lng})
       
      }
      
      const [curLocation,setCurLocation] = React.useState({lat:'',lng:''})
    
      const [autocomplete,setAutoComplete] = React.useState('')
      const onAutoCompleteLoad = (autoC) =>{
        
          setAutoComplete(autoC); 
          
      
      }
  
  
    React.useEffect(() => {
     
      navigator.geolocation.getCurrentPosition((position)=>{
        setCurLocation({lat: position.coords.latitude,lng: position.coords.longitude})
        if(!pageOneDone) {
          setShopLocation({lat: position.coords.latitude,lng: position.coords.longitude})
        }
      })
      }, [])
  
      const geocoder = new window.google.maps.Geocoder()
  React.useEffect(() => {
  
    geocoder.geocode({ location: shopLocation }).then((response) => {
      if (response.results[0]) {
        setShopPlaceSearch(response.results[0].formatted_address)
        console.log(response.results[0].address_components)
        const lastVal = response.results[0].address_components.length
        console.log(lastVal)
        response.results[0].address_components.map((e)=>{
            e.types.map((type)=>{
             
              if(type === 'country'){
                setShopCountry(e.long_name)
              }else if (type === 'administrative_area_level_2'){
                setShopLocPlace(e.long_name)
              }else if (type === 'administrative_area_level_1'){
                setShopState(e.long_name)
              }else if (type === 'postal_code'){
                setShopPinCode(e.long_name)
              }
              return null
            })
            return null
        })
      }
    })
  
  }, [shopLocation])
  
  
  
    
  
   
    const handleLocation = (change,input) => {
      //  change == 1 > place input field ()
      //  change ==2 > gps
      //  change == 3 > map pointer 
      //  change == 4 > latitude 
      // change == 5 > longitude
    
      
      if(change ===2){
        map.panTo(curLocation)
        
        setShopLocation(curLocation)
      }
      
      if(change === 3){
  
        const lat = input.latLng.lat()
        const lng = input.latLng.lng()
        setShopLocation({lat: lat,lng: lng})
      }
        if(change===4){
          setShopLocation(prevloc => {
            return {...prevloc, lat:input }
          })
        }
        if(change===5){
          setShopLocation(prevloc => {
            return {...prevloc, lng:input }
          })
        }
        // await geocoder.reverse(shopLocation, function(err, res) {
        //   console.log(res);
        // });
         
      
      }
  
  
  
  
    return (
      <Box sx={{ mt: 4,mb:4 }}>
              <Typography component="h6" variant="h6"  >Pin accurately at your shop’s location on the map</Typography>
              <Typography  component="span" variant="p" style={{color: 'rgba(255, 255, 255, 0.5)'}} >This will help your customer to locate your shop</Typography>
              <div className="d-flex">    
                <Grid item xs={10} sm={10}>
                  { isLoaded &&
                  <Autocomplete onPlaceChanged={handlePlaceChange} onLoad={onAutoCompleteLoad} >
                  <TextField
                    id="locateInMap"
                    name="locateInMap"
                    {...register('location')}
                    error={errors.location?true:false}
                    helperText={errors.location?.message}
                    onChange={(e)=>setShopPlaceSearch(e.target.value)}
                    defaultValue={pageOneDone?shopPlaceSearch:''}
                    value={shopPlaceSearch}
                    
                    label="Enter Your Shop's Location"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    />
                    
                    </Autocomplete>
                    }
                </Grid>
                <Button className='quiffbtn' onClick={() =>handleLocation(2,null) }  variant="text"><GpsFixedIcon/><span className="m-1">Recenter</span></Button>
                 {/* setCenter to set center use panTo to get an animation effect  */}
              </div>
              <div className="d-flex justify-content-center align-item-center p-3">
                <div className="" style={{width: '100%', height: '400px'}} >
                  {
                    isLoaded && 
                    <GoogleMap center={shopLocation} zoom={15} 
                    options={{streetViewControl:false,mapTypeControl:false,fullscreenControl:false}}
                     mapContainerStyle={{width:'100%', height:'100%'}} onLoad={(map) => setMap(map)} > 
                    <Marker  title={'drag to move'}
                            // name={'SOMA'}
                            key={Math.random()}
                            // id={2}
                            draggable
                            //onLoad={(marker)=>setMarker(marker)}
                            //console.log(marker.latLng.lat())
                            onDragEnd={(marker)=>handleLocation(3,marker)}
                            // getPosition
                            position={shopLocation}
                              />
          
                    </GoogleMap>
                  }
                  { !isLoaded &&
                  <Skeleton width="100%">
                  <div className="d" style={{width: '100%', height: '400px'}} ></div>
                </Skeleton>
                  }
                
                  </div> 
              </div>
               
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                { isLoaded &&
                <TextField
                  
                  id="Latitude"
                  name="Latitude"
                  type="number"
                  {...register('latitude')}
                  error={errors.latitude?true:false}
                  helperText={errors.latitude?.message}
                  disabled
                  label="Latitude"
                  fullWidth
              onChange={(e)=>handleLocation(4,e.target.value)}
                  value={shopLocation?.lat}
                  autoComplete="shipping country"
                  variant="standard"
                />
              }
              </Grid>
              <Grid item xs={12} sm={6}>
                { isLoaded &&
                <TextField
                  
                  id="Longitude"
                  name="Longitude"
                  {...register('longitude')}
                  error={errors.longitude?true:false}
                  helperText={errors.longitude?.message}
                  disabled
                  label="Longitude"
                  type="number"
                  fullWidth
                  onChange={(e)=>handleLocation(5,e.target.value)}
                  value={shopLocation?.lng}
                  autoComplete="shipping country"
                  variant="standard"
                />
              }
              </Grid>
              </Grid>
              </Box>
    )
  }
  
  
export default MapAndAll
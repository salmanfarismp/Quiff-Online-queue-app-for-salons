import React from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Button, Grid} from '@mui/material'
import shopImg from './salonImg.jpg'
import shopOpenVector from './shopOpen.png'
import shopClosedVector from './shopClosed.png'
import { useNavigate } from 'react-router-dom'

         
function ShopHeader({setIs_queue, shop,shop_side, is_queue}) {
  
  const navigate = useNavigate()



  return (
    <div>
        <div className="header_container ">
        <Grid container style={{height:'100%',}} spacing={0}>
          <Grid item className="content " xs={12} sm={6}>
            

            <img src={shop?.main_image} alt="icon" className="shop_icon_imgs" />
            
          </Grid>
          <Grid item className="content " xs={12} sm={6}>
            <div className="shop_info_box">
             <div className="left ">
               <div className="upper  shop_top_child_divs ">
               <h1>
                  {shop?.name}
                </h1>
                <p> {shop?.fullname} </p>
                
                <p>{shop?.complete_address}</p>

               </div>
               <div className="lower shop_top_child_divs">

               <p> <PeopleAltIcon/> waiting: <span className='text-success ml-2'> 0{ shop?.people_in_queue}</span></p>
                  <p >Next Slot In : <span className='text-success ml-2'>{shop?.next_slot.slice(0,8)}</span> </p>
               </div>

             </div>
             <div className="right">
               <div className="upper shop_top_child_divs">
                {shop?.is_open?<img src={shopOpenVector} alt="icon" className="shop_openImg" />:
                <img src={shopClosedVector} alt="icon" className="shop_openImg" /> }
              

               </div>
               <div className="lower shop_top_child_divs">
              {shop_side?(is_queue?<Button className='quiffyellowbtn' onClick={()=>setIs_queue(false)} variant="contained">Home</Button>:
                <Button className='quiffyellowbtn' onClick={()=>setIs_queue(true)} variant="contained">Show Queue</Button>):
                (is_queue?<Button className='quiffyellowbtn' onClick={()=>setIs_queue(false)} variant="contained">Home</Button>:
                (shop?.is_open && <Button className='quiffyellowbtn' onClick={()=>setIs_queue(true)} variant="contained">Join Queue</Button>))
                
              }
               
               </div>

        
             </div>
            </div>
         
          </Grid>
          
        </Grid>
          
        </div>
    </div>
  )
}

export default ShopHeader
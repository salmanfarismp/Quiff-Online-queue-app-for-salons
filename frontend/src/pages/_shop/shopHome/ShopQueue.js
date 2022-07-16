import React, { useContext, useEffect, useMemo, useState } from 'react'

import {  Button, Fab, Grid, Typography } from '@mui/material'
import shakeHand from './shakeHand.png'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import QueueTable from '../../../components/_commonThings/shopContent/QueueTable'
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import AddCustomer from '../../../components/_commonThings/shopContent/AddCustomer'
import PeopleIcon from '@mui/icons-material/People';
import KeepShopLive from '../../../contexts/UserContext/KeepShopLiveContext';

function ShopQueue({shop,handleShopOpening}) {
  const [addCustomer, setAddCustomer] = useState(false)
  const [queue, setQueue] = useState([])
  const {shopisLive,setShopisLive} = useContext(KeepShopLive)

  useEffect(() => {
    
    

    console.log("queue:",queue)
    
  
    
  }, [queue])

  const handleActivate = (id) => {
    ws.send(JSON.stringify(
      {'personToQueue':false,'activateUser':id, 'handleDone':false, 'handleTimeAdding':false, 'joinQueue':false }
    ))
    setShopisLive(()=>Math.random())
  }
  const handleTimeAdding = () => {
    ws.send(JSON.stringify(
      {'personToQueue':false,'activateUser':false, 'handleDone':false,'handleTimeAdding':true, 'joinQueue':false }
    ))
    setShopisLive(()=>Math.random())
  }
  const handleRemove = (id) => {
    ws.send(JSON.stringify(
      {'personToQueue':false,'activateUser':false,'handleDone':id,'handleTimeAdding':false, 'joinQueue':false  }
    ))
    setShopisLive(()=>Math.random())
  }
  const handleDone = (id) => {
    ws.send(JSON.stringify(
      {'personToQueue':false,'activateUser':false,'handleDone':id,'handleTimeAdding':false, 'joinQueue':false  }
    ))
    setShopisLive(()=>Math.random())
  }

  const handleAddtoQueuebyShop = (services)=>{
    if(services.length > 0){
      let personToQueue = { shopId: shop?.id , customer:null, service:services }
      setShopisLive(()=>Math.random())
      ws.send(JSON.stringify(
        {'personToQueue':personToQueue,'activateUser':false, 'handleDone':false,'handleTimeAdding':false, 'joinQueue':false}
      ))
      setAddCustomer(false)




    }else{
      alert("Please select atleast one service")
    }
  }
  

  const ws =  useMemo(()=>{ return new  WebSocket('ws://localhost:8000/ws/queue/' + `${shop?.id}` + '/')},[shop] );

  useEffect(() => {

    ws.onopen = e => {
      console.log('open', e)
    }
    ws.onmessage = e => {
      const dataFromServer = JSON.parse(e.data);
      console.log('got replay!', dataFromServer);
      if(dataFromServer){
        setQueue(dataFromServer.queue_data)
      }
    }
  
   
     
    
   })

  return (

<div className="queue_top">
  {shop?.is_open?
  <Grid container className="queue_grid" style={{height:'100%',}} spacing={0}>
    <Grid item className="content mt-3 "  xs={12} sm={8}>
      {addCustomer? <AddCustomer shopId={shop?.id}  queue={queue} byShop handleAddtoQueuebyShop={handleAddtoQueuebyShop} />:
    <QueueTable shopId={shop?.id} handleActivate={handleActivate} handleDone={handleDone} handleRemove={handleRemove} queue={queue} />}
    </Grid>
    <Grid item className="content queue_pannel " xs={12} sm={4}>

        <div className=" mt-3 queue_controls">
          

        {addCustomer?
        <Fab  className='w-100' onClick={() => setAddCustomer(false)} variant="extended" color="primary"   aria-label="add">
          <PeopleIcon  sx={{ mr: 1 }} />
          Show Queue
        </Fab>:
        <Fab  className='w-100' onClick={() => setAddCustomer(true)} variant="extended" color="primary"   aria-label="add">
          <AccessibilityNewIcon  sx={{ mr: 1 }} />
          Add Customer
        </Fab>
        }
        <Fab onClick={()=>handleTimeAdding()}  className='w-100' variant="extended" color="primary"   aria-label="add">
          <MoreTimeIcon  sx={{ mr: 1 }} />
          Add 10 min to queue
        </Fab>
        
          <Fab  className="w-100" variant="extended" color="primary" aria-label="add">
          <MeetingRoomIcon sx={{ mr: 1 }} />
          Clossing Time : {shop?.temp_closing_time} pm
        </Fab>
        

        </div>
        {/* <Chat/> */}
      
    </Grid>
  </Grid>: <div className="d-flex mt-5 align-item-center justify-content-center">
  <Button style={{backgroundColor: '#ffce45'}} onClick={()=>handleShopOpening()} variant="contained">Shop Is Open Now</Button>
      </div> }
    
</div>

    
    
  )
}

export default ShopQueue







  
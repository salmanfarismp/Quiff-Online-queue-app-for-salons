import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useMemo } from 'react'
import { useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import AddCustomer from '../_commonThings/shopContent/AddCustomer';

function CustomerToQueue({shop}) {
    const {user} = useContext(AuthContext)
 



// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await axios({
        url: `http://127.0.0.1:8000/api/customer_payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res.data);
         
      
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("shopId", shop.id);
    bodyData.append("userId", user?.user_id);

    const data = await axios({
      url: `http://127.0.0.1:8000/api/customer_pay/`,
      method: "POST",
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id:'rzp_test_AUrGeVKQOuO7z8', // in react your environment variable must start with REACT_APP_
      key_secret: 'AVvKC06DgRTrt3dDKPk6ddYd',
      
      amount: data.data.payment.amount,
      currency: "INR",
      name: "Org. Name",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  






    const ws =  useMemo(()=>{ return new  WebSocket('ws://localhost:8000/ws/queue/' + `${shop?.id}` + '/')},[shop] );
    useEffect(() => {
  
      ws.onopen = e => {
        console.log('open', e)
      }
      
    })

    const handleJoinQueue = async (services)=>{
        if(services.length > 0){
            await showRazorpay()
            let joinQueue = { shopId: shop?.id , customer:user?.user_id, service:services }
            console.log('adding user to queue',)
            ws.send(JSON.stringify(
            {'joinQueue':joinQueue,'activateUser':false, 'handleDone':false,'handleTimeAdding':false,'personToQueue':false}
            ))
        }else{
          alert("Please select atleast one service")
        }
      }
      
  return (
    <div>
        <Grid container className="queue_grid" style={{height:'100%',}} spacing={0}>
    <Grid item className="content mt-3 "  xs={12} sm={8}>
      <AddCustomer shopId={shop?.id}  handleJoinQueue={handleJoinQueue} />
    </Grid>
    <Grid item className="content queue_pannel " xs={12} sm={4}>

        <div className=" mt-3 queue_controls">
          

        {/* {addCustomer?
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
        </Fab> */}
        

        </div>
        {/* <Chat/> */}
      
    </Grid>
  </Grid>
        
    </div>
  )
}

export default CustomerToQueue
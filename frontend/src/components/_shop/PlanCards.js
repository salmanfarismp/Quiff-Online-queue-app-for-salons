import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import {createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardTheme = createTheme({
  palette: {
      primary: {
          main: '#007bff',
      },
      mode:'dark'
      
  }
}
  
);

export default function PlanCards() {

  const {user} = React.useContext(AuthContext)
  const [plans,setPlans] = React.useState([])


  const handlePlantoPay = async(plan) => {
    showRazorpay(plan)
  }



// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await axios({
        url: `http://127.0.0.1:8000/api/shop_payment/success/`,
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

  const showRazorpay = async (plan) => {
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("planId", plan.id);
    bodyData.append("ownerId", user?.user_id);

    const data = await axios({
      url: `http://127.0.0.1:8000/api/shop_pay/`,
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


  


  const navigate = useNavigate()
  const getPlans =  async() =>{
    try {

      const response = await axios.get("http://127.0.0.1:8000/api/plansView")
      
   
    setPlans(response.data)
    
    }catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    getPlans();
    console.log(process.env.REACT_APP_RAZORPAY_PUBLIC_KEY)
  
    
  }, [])

  return (
    <Box sx={{ minWidth: 275 }}>
      <ThemeProvider  theme={cardTheme}>
      <Grid container spacing={2}>
        {plans.map((plan)=>{

        return(

        
          <Grid key={plan.id} item lg={4}>
          <Card variant="outlined">
          <React.Fragment>


              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {/* {plan.id} */}
                </Typography>
                <Typography variant="h5" component="div">
                  {plan.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {plan.description}
                </Typography>
                <Typography variant="body2">
                {bull}
                  <br />
                  
                  
                </Typography>
                <Typography style={{color: '#ffce45'}} >
                Price : {plan.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() =>handlePlantoPay(plan)}size="small">Select & Pay</Button>
              </CardActions>
              </React.Fragment>
            
            </Card>
          </Grid>
        )}
        )} 
          
        </Grid>
      
      
    </ThemeProvider>
    </Box>  
  );
}
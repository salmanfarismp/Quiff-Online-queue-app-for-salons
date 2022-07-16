  import * as React from 'react';
  import {useContext} from 'react';
  import Grid from '@mui/material/Grid';
  import Typography from '@mui/material/Typography';
  import TextField from '@mui/material/TextField';
  import {yupResolver} from '@hookform/resolvers/yup';
  import * as yup from 'yup';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import Checkbox from '@mui/material/Checkbox';
  import { Box, Button, FormGroup, Radio, Skeleton } from '@mui/material';
  import './ShopFormFirst.css';
  import MapAndAll from '../googleMap/MapForForm'
  import AuthContext, { ShopContext } from '../../../contexts/AuthContext';
  import {useForm} from 'react-hook-form';
  import Modal from '@mui/material/Modal';
  import Accordion from '@mui/material/Accordion';
  import AccordionSummary from '@mui/material/AccordionSummary';
  import AccordionDetails from '@mui/material/AccordionDetails';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import Snackbar from '@mui/material/Snackbar';
  import IconButton from '@mui/material/IconButton';
  import CloseIcon from '@mui/icons-material/Close';
  import axios from 'axios'
  import Otpinput from '../../_commonThings/otpInput/Otp';

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  //I am 60% satisfied











  const phoneRegExp = /^1?\d{9,15}$/
  var formValidated = false;
  export default function AddressForm({handleNext}) {
    

  
    const {shopName,shopDescription,shopAddress,shopLocPlace,shopLocation,
      shopCountry,shopState,shopPlaceSearch,shopPinCode,shopPhone,ownerPhone,
      ownerUsername,ownerPassword,ownerEmail,
    setShopName,setShopDescription,setShopAddress,setShopLocPlace,setShopLocation,
    setShopCountry,setShopState,setShopPhone,setShopPlaceSearch,setShopPinCode,
    setOwnerPhone,setOwnerPassword,setOwnerEmail,setOwnerUsername, pageOneDone,setPageOneDone} = useContext(ShopContext)



    

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = (event,reason) =>{
      if (reason !== 'backdropClick'){
          setOpenModal(false);
        }
      }

    var generateAddress = false;

  
    
    const [shopPhoneVerified,setShopPhoneVerified] = React.useState(false)
    const [samePhone,setsamePhone] = React.useState(false)
    const [phoneError,setPhoneError] = React.useState({shop:false,owner:false})
    const [ownerPhoneVerified,setOwnerPhoneVerified] = React.useState(false)
    const [ownerPossible,setOwnerPossible] = React.useState(false)



  



    
      const [otpVal, setOtpVal] = React.useState(null)

      const handleOtpVal = (inp)=> {

        setOtpVal(inp)
      }

      const send_otp = async(phone_number)=>{
        const response = await axios.post("http://127.0.0.1:8000/api/customer/otp_sending/", {phone_number:phone_number})
        console.log(response.status)
        if(response.status === 200){
          setSnackMsg("Otp Sent!")
          handleSnackOpen()
          handleOpenModal()
        }
      }
      const verify_otp = async(phone_number,otp)=>{
        const response = await axios.post("http://127.0.0.1:8000/api/customer/otp_checking/", {phone_number:phone_number,otp:otp})
        console.log(response.data)
        if(response.data === 'approved'){

          setSnackMsg("Phone Number Verified!")
          handleSnackOpen()
          setShopPhoneVerified(true)
          setPhoneError(prev=>{
            return {...prev,shop:false}
          })
          handleCloseModal()

        }else{

          setSnackMsg("Error Occured Please try again!")
          handleSnackOpen()
        }
        

      }
    
      
      const handlePhoneVerification = (inp) =>{

        // inp === 1 shop number verification request
        // inp === 2 shop number verification 
        // inp === 3  shop owner number verification
        if (phoneRegExp.test(shopPhone)){
          const phone_number = '+91'+shopPhone;

    

          if(inp === 1){
            send_otp(phone_number)
          }
          if(inp === 2){
            if(otpVal !== null){
              verify_otp(phone_number,otpVal)
            }else{

            }
            
          }

        }
        else{
          alert("Please enter a valid phone number")
        }
    

      }
      React.useEffect(() => {

        if(pageOneDone){
          setShopPhoneVerified(true)
          setOwnerPhoneVerified(true)
        }
      },pageOneDone)

      const handleShopPhone = (val) =>{
        setShopPhoneVerified(false)
        setShopPhone(val)
        if(samePhone){ 
          setOwnerPhone('')
            setsamePhone(false)
            setOwnerPhoneVerified(false)
        }
        

      }


      const handleOwnerPhone = (inp,val) =>{

        // if inp === 1 checkbox
        // if inp === 2 input bar
        if(inp === 1){
          if(samePhone){
            setOwnerPhone('')
            setsamePhone(false)
            setOwnerPhoneVerified(false)
          }else{
            if(shopPhoneVerified){
              setOwnerPhone(shopPhone)
              setsamePhone(true)
              setOwnerPhoneVerified(true)
              setPhoneError(prev=>{
                return {...prev,owner:false}
              })
            }
            
          }
        }else{
            if(val === shopPhone && val !== ''){
              setsamePhone(true)
              setOwnerPhoneVerified(true)
              setOwnerPhone(val)
            }else{
              setOwnerPhone(val)
              setsamePhone(false)
              setOwnerPhoneVerified(false)
            }
        }

      }
        
    
    
    const contextData = React.useContext(AuthContext)
    const [selectedValue, setSelectedValue] = React.useState('a');

    yup.addMethod(yup.string, 'stripEmptyString', function () {
      return this.transform((value) => (value === '' ? undefined : value));
    });
    yup.addMethod(yup.number, 'stripEmptyNumber', function () {
      return this.transform((value) => (value === '' ? undefined : value));
    });
    
    const schema = yup.object().shape({
      shopname:yup.string().stripEmptyString().required('This Field Is Required'),
      shortDescription:yup.string().stripEmptyString().required('This Field Is Required'),
      completeAddress:yup.string().stripEmptyString().required('This Field Is Required'),
      location:yup.string().stripEmptyString().default(shopPlaceSearch).required('This Field Is Required'),
      latitude:yup.string(),
      longitude:yup.string(),
      country:yup.string().stripEmptyString(),
      pincode:yup.string().stripEmptyString(),
      place:yup.string().stripEmptyString(),
      state:yup.string().stripEmptyString(),
      userName: yup.string().stripEmptyString().required('This Field Is Required'),
      email: yup.string().email().stripEmptyString().required('This Field Is Required'),
      password: yup.string().min(8).max(100).stripEmptyString().required('This Field Is Required'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
  })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(()=>{
    console.log(shopName,shopDescription,shopAddress,shopLocPlace,shopLocation,
      shopCountry,shopState,shopPlaceSearch,shopPinCode,shopPhone,ownerPhone,
      ownerUsername,ownerPassword,ownerEmail)
  })


  const [openSnack, setOpenSnack] = React.useState(false);

    const handleSnackOpen = () => {
      setOpenSnack(true);
    };

    const handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenSnack(false);
    };
    const snackAction = (
      <React.Fragment>
      
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleSnackClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    const check_user = async(username,email,phone_number,password)=>{
      console.log(phone_number,username,email,password);
      const formData = {'username':username, 'email':email, 'phone_number':phone_number, 'password':password}
    await axios.post("http://127.0.0.1:8000/api/check_user/",formData).then(response =>{
      console.log(response.data)
    if (response.data === 'done'){
      
      setOwnerPossible(true)
    
    }else{
      alert(response.data)
    }
    
    }).catch((error)=>{
      console.log(error);
    
    })
      
    }

  const submitForm = async(data) => {

    await check_user(data.userName,data.email,ownerPhone,data.password)

    if( ownerPossible ){
        
      setShopName(data.shopname);
      setShopDescription(data.shortDescription);
      setShopAddress(data.completeAddress);
      setOwnerPassword(data.password);
      setOwnerEmail(data.email);setOwnerUsername(data.username);
      setOwnerUsername(data.userName);
      setPageOneDone(true)
      handleNext() 

  }
    
      
    

    if(!ownerPhoneVerified){
      setPhoneError(prev=>{
        return {...prev,owner:true}
      })
    }
    if(!shopPhoneVerified){
      setPhoneError(prev=>{
        return {...prev,shop:true}
      })
    } 

    
  
  }

  const [snackMsg, setSnackMsg] = React.useState('')



    // const handleChange = (event) => {
    //   setSelectedValue(event.target.value);
    // };
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(submitForm)}  action="">
        <div>
        
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message={snackMsg}
          action={snackAction}
        />
      </div>
        <Modal
          disableEscapeKeyDown 
          
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter OTP
            </Typography>
            <Otpinput handleOtpVal={handleOtpVal}/>
            <Button onClick={()=>handlePhoneVerification(2)}>submit</Button>
          </Box>
        </Modal>
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          
          >
            <div className="d-flex flex-column">
            
            <Typography component="h6" variant="h6"   >Shop Address</Typography>
          <Typography  component="span" variant="p" className="CreateShopsubH" >Name, Address, Location</Typography>

            </div>
          
          </AccordionSummary>
          <AccordionDetails>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='off'
              id="shopName"
              name="shopName"
              label="Shop Name"
              defaultValue={pageOneDone?shopName:''}
              {...register('shopname')}
              fullWidth
              error={errors.shopname?true:false}
              helperText={errors.shopname?.message}
              
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              
              id="shortDescription"
              name="shortDescription"
              {...register('shortDescription')}
              error={errors.shortDescription?true:false}
              helperText={errors.shortDescription?.message}
              defaultValue={pageOneDone?shopDescription:''}
              label="Short Description"
              fullWidth
              autoComplete='off'
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              
              id="address"
              name="address"
              {...register('completeAddress')}
              error={errors.completeAddress?true:false}
              helperText={errors.completeAddress?.message}
              defaultValue={pageOneDone?shopAddress:''}
              label="Complete Address"
              fullWidth
              autoComplete='off'
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <MapAndAll register={register} errors={errors} />
              
              <Box sx={{ mt: 4,mb:4 }}>
              <Typography component="h6" variant="h6"  >Shop address details</Typography>
              <Typography  component="span" variant="p" style={{color: 'rgba(255, 255, 255, 0.5)'}} >Address details are basis the shop location mentioned above</Typography>
              <Grid container className="mt-3" spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="Country"
                  name="Country"
                  {...register('country')}
                  error={errors.country?true:false}
                  helperText={errors.country?.message}
                  label="Country"
                  onChange={(e)=>setShopCountry(e.target.value)}
                  value={shopCountry}
                  disabled
                  fullWidth
                  autoComplete='off'
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="Pincode"
                  name="Pincode"
                  {...register('pincode')}
                  error={errors.pincode?true:false}
                  helperText={errors.pincode?.message}
                  label="Pincode"
                  onChange={(e)=>setShopPinCode(e.target.value)}
                  value={shopPinCode}
                  disabled
                  fullWidth
                  autoComplete='off'
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="Place"
                  name="Place"
                  label="Place"
                  {...register('place')}
                  error={errors.place?true:false}
                  helperText={errors.place?.message}
                  onChange={(e)=>setShopLocPlace(e.target.value)}
                  value={shopLocPlace}
                  disabled
                  fullWidth
                  autoComplete='off'
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="State"
                  name="State"
                  label="State"
                  {...register('state')}
                  error={errors.state?true:false}
                  helperText={errors.state?.message}
                  onChange={(e)=>setShopState(e.target.value)}
                  value={shopState}
                  disabled
                  fullWidth
                  autoComplete='off'
                  variant="standard"
                />
              </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            
              <div className="d-flex flex-column">
              <Typography component="h6" variant="h6"  >Contact number at shop</Typography>
              <Typography  component="span" variant="p" className="CreateShopsubH"   >Your customers will call on this number for general enquiries</Typography>
              </div>
            
          </AccordionSummary>
          <AccordionDetails>
          <Grid container spacing={1}>
          <Grid item xs={2} sm={1}>
            <TextField
              
              
              name="shopMobile"
              label="c"
              value='+91'
              disabled
              fullWidth
              autoComplete='off'
              variant="standard"
            />
            </Grid>
            <Grid item xs={7} sm={9}>
            <TextField
              
              
              name="shopMobile"
              {...register('shop_phone')}
              error={phoneError.shop?true:false}
              helperText={phoneError.shop?'verify your phone number':null}
              label="Mobile number at shop"
              onChange={(e)=>handleShopPhone(e.target.value)}
              value={shopPhone}
              onFocus={()=>handleShopPhone('')}
              type="number"
              fullWidth
              autoComplete='off'
              variant="standard"
            />
          
          </Grid>
          <div className="d-flex align-items-end ml-1">
          {shopPhoneVerified?<Button className='quiffbtn verifybtn' disabled  style={{width: '100%', height: '40px', color:'green'}}   onClickvariant="contained">Verified</Button>:
            <Button className='quiffbtn' onClick={()=>handlePhoneVerification(1)}  style={{width: '100%', height: '40px'}} disabled={shopPhone?false:true} onClickvariant="contained">Verify</Button>}
            
          </div>
          </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            
              <div className="d-flex flex-column">
              <Typography component="h6" variant="h6"  >Owner Details</Typography>
              <Typography  component="span" variant="p" className="CreateShopsubH"   >You can sign in using this details</Typography>
              </div>
          
          </AccordionSummary>
          <AccordionDetails>
          <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              
              id="username"
              name="username"
              label="User Name"
              {...register('userName')}
              error={errors.userName?true:false}
              helperText={errors.userName?.message}
              defaultValue={pageOneDone?ownerUsername:''}
              fullWidth
              autoComplete='off'
              variant="standard"
            /> 
            </Grid>
          <Grid item xs={1} sm={1}>
            <TextField
              
              id="cid"
              name="cid"
              label="c"
              value='+91'
              disabled
              fullWidth
              autoComplete='off'
              variant="standard"
            />
            </Grid>
            <Grid item xs={9} sm={9}>
            <TextField
              
              id="shopMobile"
              name="shopMobile"
              
              
              error={phoneError.owner?true:false}
              helperText={phoneError.owner?'verify your phone number':null}
              label="Owner mobile number"
              type="number"
              fullWidth
              onChange={(e)=>handleOwnerPhone(2,e.target.value)}
              value={ownerPhone}
              autoComplete='off'
              variant="standard"
            />
          
          </Grid>
          <div className="d-flex align-items-end ml-1">
          {ownerPhoneVerified?<Button className='quiffbtn verifybtn' disabled  style={{width: '100%', height: '40px', color:'green'}}   onClickvariant="contained">Verified</Button>:
            <Button className='quiffbtn' disabled  style={{width: '100%', height: '40px'}}  variant="contained">Verify</Button>}
            
          </div>
          <Grid item xs={1} sm={1}>
          
          <Checkbox
            checked={samePhone}
            onChange={()=>handleOwnerPhone(1)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Grid>
        <Grid item xs={10} sm={10}>
          <div className=" mt-2">
          <Typography  component="span" variant="p"  >Same as shop mobile no.</Typography>

          </div>
      
        </Grid>
        
        
          <Grid item xs={12} sm={12}>
            <TextField
              
              id="email"
              name="email"
              {...register('email')}
              error={errors.email?true:false}
              helperText={errors.email?.message}
              defaultValue={pageOneDone?ownerEmail:''}
              label="Email Address"
              fullWidth
              autoComplete='off'
              variant="standard"
            /> 
            </Grid>
            <Grid item xs={12} sm={12}>
            <TextField
              
              id="password"
              name="password"
              {...register('password')}
              error={errors.password?true:false}
              helperText={errors.password?.message}
              defaultValue={pageOneDone?ownerPassword:''}
              type='password'
              label="Password"
              fullWidth
              autoComplete='off'
              variant="standard"
            /> 
            </Grid>
            <Grid item xs={12} sm={12}>
            <TextField
              
              id="confirmPassword"
              name="confirmPassword"
              type='password'
              {...register('confirmPassword')}
              error={errors.confirmPassword?true:false}
              helperText={errors.confirmPassword?.message}
              label="confirm Password"
              fullWidth
              autoComplete='off'
              variant="standard"
            /> 
            </Grid>
    
          </Grid>
          
          </AccordionDetails>
        </Accordion>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          

            <Button className='quiffbtn'
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
            >
              Next
            </Button>
          </Box>
        </form>
      </React.Fragment>
    );
  }









    

  
    

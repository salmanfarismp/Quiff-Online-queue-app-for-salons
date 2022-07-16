import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './ShopFormThird.css'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
//  import Uploader from "../../../commonThings/ImageCrop";
import AuthContext, { ShopContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Swal = require('sweetalert2')
// import UploadImg from '../../components/shopSide/UploadImg/UploadImg'
// import AlertDialogSlide from './UploadImg/blah';




export default function Review({handleNext,handleBack}) {

   
  const {shopName,shopDescription,shopAddress,shopLocPlace,shopLocation,
    shopCountry,shopState,shopPlaceSearch,shopPinCode,shopPhone,ownerPhone,
    ownerUsername,ownerPassword,ownerEmail,
   shopType,shopGender,openTime,closingTime,openDays,handleClearForm} = React.useContext(ShopContext)

  const {loginUser} = React.useContext(AuthContext)

  const [shopLicense,setShopLicense] = React.useState(null)
  const [shopImg,setShopImg] = React.useState(null)
  const [loading,setLoading] = React.useState(false)
  const [username,setUsername] = React.useState()
  const [password,setPassword] = React.useState()
  
  // const [imageFrm, setImageFrm] = useState(adDetails.imageFrm);
  
 
 

  
  
  
    

  
    

  const navigate = useNavigate()

  const handleMenuImg = (e) => {
    setShopLicense(e.target.files[0])
  }
  const handleShopImg = (e) => {
    setShopImg(e.target.files[0])
  }

  React.useEffect(() => {
    if(ownerUsername!=null && ownerPassword!=null){
      setUsername(ownerUsername)
      setPassword(ownerPassword)
    }
  },[ownerUsername,ownerPassword])
  



  const shopRegisteration = async()=>{

    const form_data = {
      shopName,shopDescription,shopType,shopGender,shopAddress,shopPlaceSearch,
      shopLocPlace,shopPinCode,shopState,shopCountry,
      shopPhone,openTime,closingTime,shopLicense,shopImg,
      ownerUsername,ownerEmail,ownerPhone,ownerPassword,shopLat:shopLocation.lat,shopLng:shopLocation.lng,
      open_sunday:(openDays.sunday==='true'?true:false),open_monday:(openDays.monday==='true'?true:false),open_tuesday:(openDays.tuesday==='true'?true:false),
      open_wednesday:(openDays.wednesday==='true'?true:false),open_thursday:(openDays.thursday==='true'?true:false),
      open_friday:(openDays.friday==='true'?true:false),open_saturday:(openDays.saturday==='true'?true:false)
    }

    setLoading(true)
    const response = await axios.post("http://127.0.0.1:8000/api/create_shop/", form_data,
    {
      headers: { "Content-Type": "multipart/form-data" },
  })
  setLoading(false)
  handleClearForm()
    if(response.data === 'shopCreated'){

      Swal.fire({
        title: 'Shop Created!',
        icon: 'success',
        text: 'Everything went well login to your account to get more information',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: ' #6c757d',
        confirmButtonText: 'Login',
        cancelButtonText: 'Back Home'
      }).then(async(result) => {
        if (result.isConfirmed) {
          loginUser(ownerUsername,ownerPassword)
        }
      })    

      
    }
   
    

  }
  

  const handleSubmit =()=>{
    if(shopLicense && shopImg){


      
      shopRegisteration()


      
    }else{
      alert("Upload Images")
    }
    
  }
  // function addImage(img, imgState) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(img);
  //   reader.onloadend = function () {
  //     imgState(reader.result);
  //   };
  // }
  // const clearFrmError = () => {
  //   setFieldErrors((prevState)=>({
  //     ...prevState,
  //     imageFrm:null
  //   }))
  // }
  // let ImgBlob = async () => {
  //   let blob = await fetch(croppedImageUrl).then((r) => r.blob());
  //   this.handleClose();
  //   fileInput.current.value = "";
  //   this.props.addImage(blob, this.props.imgState);
  //   this.props.clearError()
  // }

  


  return (

    <React.Fragment>
      {loading?<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>:
    <div className="wrap">

    
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
         
            <div className="d-flex flex-column">
            <Typography component="h6" variant="h6"  >Shop Profile Picture</Typography>
            <Typography  component="span" variant="p" className="CreateShopsubH">Upload a clear image of your shop </Typography>
            </div>
          
        </AccordionSummary>
        <AccordionDetails>
         {/* <div  className=" quiff-image-upload "> */}
          {/* <div className="quiff-image-upload-icon">
             <AddPhotoAlternateIcon style={{color:'#007bff'}} />
             <Typography  component="span" variant="p" className="CreateShopsubaddImage">Add Images</Typography> 
            
          </div> */}
          {/* <Uploader
                  ratio={[3,2]}
                  imageSrc={shopImgSrc}
                  SrcSetter={setShopImgSrc}
                  addImage={addImage}
                  imgState={setShopImg}
                  cropImage={shopImg}
                  // error={fieldErrors?.imageFrm}
                  // clearError={clearFrmError}
                /> */}
          
        {/* </div> */}
        <Button className='quiffbtn mt-2' variant="outlined">
          <input type="file" required onChange={handleShopImg} accept="image/*" name="" id="" />
        </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          
            <div className="d-flex flex-column">
            <Typography component="h6" variant="h6"  >Shop Licence</Typography>
            <Typography  component="span" variant="p" className="CreateShopsubH">Upload an image of your shop's licence</Typography>
            </div>
          
        </AccordionSummary>
        <AccordionDetails>
         {/* <div  className=" quiff-image-upload ">
          <div className="quiff-image-upload-icon">
            
            
          <AddPhotoAlternateIcon style={{color:'#007bff'}} />
            <Typography  component="span" variant="p" className="CreateShopsubaddImage">Add Image</Typography>
          </div>
          
        </div> */}
        
        {/* <ProfilePic
                    user={user}
                    changeImageState={changeImageState}
                    handleRemove={handleRemove}
                  /> */}
         
         <Button className='quiffbtn mt-2' variant="outlined">
          <input type="file" required onChange={handleMenuImg} accept="image/*" name="" id="" />
        </Button>
{/* <div  className=" quiff-image-upload "> */}
          {/* <div className="quiff-image-upload-icon">
             <AddPhotoAlternateIcon style={{color:'#007bff'}} />
             <Typography  component="span" variant="p" className="CreateShopsubaddImage">Add Images</Typography> 
            
          </div> */}
         {/* <Uploader
                  ratio={[3,2]}
                  addImage={addImage}
                  imgState={setShopLicense}
                  imageSrc={licenseSrc}
                  SrcSetter={setLicenseSrc}
                  cropImage={shopLicense}
                  // error={fieldErrors?.imageFrm}
                  // clearError={clearFrmError}
                /> */}
          
        {/* </div> */}
        </AccordionDetails>
      </Accordion>
       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  
       <Button className='quiffbtn' onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                 

                  <Button className='quiffbtn'
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    SUBMIT
                  </Button>
                </Box></div>}
      </React.Fragment>
  );
}
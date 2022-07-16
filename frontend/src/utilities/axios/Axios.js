import { useIsFocusVisible } from '@mui/material';
import axios from 'axios';
import { apiBaseURL } from '../../constants/Constants';


let  adminAuthTokens = ''
let customerAuthTokens = ''
let shopOwnerAuthTokens  = ''

if(localStorage.getItem('customerAuthTokens')){


  try {
    customerAuthTokens = JSON.parse(localStorage.getItem('customerAuthTokens'))
  } catch(e) {
    localStorage.removeItem('customerAuthTokens');
  }


  
}
if(localStorage.getItem('shopOwnerAuthTokens')){


  try {
     shopOwnerAuthTokens =  JSON.parse(localStorage.getItem('shopOwnerAuthTokens'))
  } catch(e) {
    localStorage.removeItem('shopOwnerAuthTokens');
  }


  
}
if(localStorage.getItem('adminAuthTokens')){


  try {
    
    adminAuthTokens =  JSON.parse(localStorage.getItem('adminAuthTokens'))
  } catch(e) {
    localStorage.removeItem('adminAuthTokens');
  }

}


  






const customerInstance = axios.create({
    baseURL: apiBaseURL,
    headers: { Authorization:`Bearer ${customerAuthTokens?.access}`}
  });

  
export default customerInstance;


export const shopOwnerInstance = axios.create({
  baseURL: apiBaseURL,
  headers: { Authorization:`Bearer ${shopOwnerAuthTokens?.access}`}
});
export const AdminInstance = axios.create({
  baseURL: apiBaseURL,
  headers: { Authorization:`Bearer ${adminAuthTokens?.access}`}
});

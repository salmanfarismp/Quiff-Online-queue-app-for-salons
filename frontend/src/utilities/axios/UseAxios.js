// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import dayjs from 'dayjs'
// import { apiBaseURL } from '../../constants/Constants'; 
// import {useContext} from 'react';
// import AuthContext from '../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';


// const useAxios = () =>{
//     const navigate = useNavigate()
//     const contextData = useContext(AuthContext)
   

//     const axiosInstance = axios.create({
//         baseURL: apiBaseURL,
//         headers: { Authorization:`Bearer ${contextData.authTokens?.access}`}
//       });
    
//       axiosInstance.interceptors.request.use(async (req) => {
     
//         if(!contextData.authTokens){
//             navigate('/admin/login')
//         }
//         const user = jwt_decode(contextData.authTokens.access)
//         const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
//         if (!isExpired){
//             return req
//         }
    
//         const response = await axios.post(`${apiBaseURL}api/token/refresh/`,{
//             refresh:contextData.authTokens.refresh
//         }).catch(error => {
          
//         })
    
//         localStorage.setItem('authTokens',JSON.stringify(response.data))

//         contextData.setAuthTokens(response.data)
//         contextData.setUser(jwt_decode(response.data.access))
//         req.headers.Authorization = `Bearer ${response.data.access}`
//         return req
//     })
    
    
//     return axiosInstance
// }

// export default useAxios;


// export const useUserAxios = () =>{
//     const contextData = useContext(AuthContext)
//     const navigate = useNavigate()

//     const axiosInstance = axios.create({
//         baseURL: apiBaseURL,
//         headers: { Authorization:`Bearer ${contextData.userTokens?.access}`}
//       });
    
//       axiosInstance.interceptors.request.use(async (req) => {
       
//         if(!contextData.userTokens){
//             navigate('/login')
//         }
//         const localUser = jwt_decode(contextData.userTokens.access)
//         const isExpired = dayjs.unix(localUser.exp).diff(dayjs()) < 1
//         if (!isExpired){
//             return req
//         }
    
//         const response = await axios.post(`${apiBaseURL}api/usertoken/refresh/`,{
//             refresh:contextData.userTokens.refresh
//         }).catch(error => {
          
//         })
    
//         localStorage.setItem('userTokens',JSON.stringify(response.data))

//         contextData.setUserTokens(response.data)
//         contextData.setLocalUser(jwt_decode(response.data.access))
//         req.headers.Authorization = `Bearer ${response.data.access}`
//         return req
//     })
    
    
//     return axiosInstance
// }


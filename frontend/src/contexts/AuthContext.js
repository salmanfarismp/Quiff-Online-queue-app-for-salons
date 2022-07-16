import React,{createContext,useState,useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import axiosInstance,{UserInstance} from '../utilities/axios/Axios'
import {apiBaseURL} from '../constants/Constants'
import axios from 'axios';
// import useAxios from '../Utilities/axios/UseAxios'


const AuthContext = createContext()



export const ShopContext = createContext()
export const ShopDetailProvider = ({children}) =>{
    const [shopName,setShopName] = useState('')
    const [shopDescription,setShopDescription] = useState('')
    const [shopAddress,setShopAddress] = useState('')
    const [shopPlaceSearch,setShopPlaceSearch] = useState('')
    const [shopLocation,setShopLocation] = useState('')
    const [shopCountry,setShopCountry] = useState('Not Found')
    const [shopState,setShopState] = useState('Not Found')
    const [shopLocPlace,setShopLocPlace] = useState('Not Found')
    const [shopPinCode,setShopPinCode] = useState('Not Found')
    const [shopPhone,setShopPhone] = useState('')
    
    const [ownerUsername,setOwnerUsername] = useState('')
    const [ownerPassword,setOwnerPassword] = useState('')
    const [ownerEmail,setOwnerEmail] = useState('')
    const [ownerPhone,setOwnerPhone] = useState('')

    const [pageOneDone,setPageOneDone] = useState(false)

    const [shopType,setShopType] = useState('Hair Salon')
    const [shopGender,setShopGender] = useState('male')
    
    const [openTime,setOpenTime] = useState('10:00')
    const [closingTime,setClosingTime] = useState('10:00')
    const [openDays,setOpenDays] = useState({sunday:true,monday:true,
        tuesday:true,wednesday:true,thursday:true,friday:true,saturday:true})

    const handleClearForm = () =>{
        setShopName('')
        setShopDescription('')
        setShopAddress('')
        setShopPlaceSearch('')
        setShopLocation('')
        setShopCountry('Not Found')
        setShopState('Not Found')
        setShopLocPlace('Not Found')
        setShopPinCode('Not Found')
        setShopPhone('')
        setOwnerUsername('')
        setOwnerPassword('')
        setOwnerEmail('')
        setOwnerPhone('')
        setPageOneDone(false)
        setShopType('Hair Salon')
        setShopGender('male')
        setOpenTime('10:00')
        setClosingTime('10:00')



    }

    let contextData = {
        shopName:shopName,
        shopDescription: shopDescription,
        shopAddress: shopAddress,
        shopLocPlace: shopLocPlace,
        shopLocation: shopLocation,
        shopCountry: shopCountry,
        shopState: shopState,
        shopPlaceSearch: shopPlaceSearch,
        shopPinCode: shopPinCode,
        shopPhone: shopPhone,

        ownerPhone: ownerPhone,
        ownerUsername: ownerUsername,
        ownerPassword: ownerPassword,
        ownerEmail: ownerEmail,

        pageOneDone: pageOneDone,

        shopType: shopType,
        shopGender: shopGender,
        
        openTime: openTime,
        closingTime: closingTime,
        openDays: openDays,

        setShopName: setShopName,
        setShopDescription: setShopDescription,
        setShopAddress: setShopAddress,
        setShopPlaceSearch: setShopPlaceSearch,
        setShopLocation: setShopLocation,
        setShopCountry: setShopCountry,
        setShopState: setShopState,
        setShopLocPlace: setShopLocPlace,
        setShopPinCode: setShopPinCode,
        setShopPhone: setShopPhone,

        setOwnerEmail: setOwnerEmail,
        setOwnerPhone: setOwnerPhone,
        setOwnerUsername: setOwnerUsername,
        setOwnerPassword: setOwnerPassword,

        setPageOneDone: setPageOneDone,

        setShopType: setShopType,
        setShopGender: setShopGender,
        
        setOpenTime: setOpenTime,
        setClosingTime: setClosingTime,
        setOpenDays: setOpenDays,

        handleClearForm: handleClearForm,

        

    }
    return (
        <ShopContext.Provider value={contextData} >
            {children}
        </ShopContext.Provider>
    )

}



export default AuthContext
export const AuthProvider = ({children})=>{
    const navigate = useNavigate()
    const decoder = (inp)=>{

    }
    
    
    let [userAuthTokens,setUserAuthTokens] =useState( ()=> localStorage.getItem('userAuthTokens')? JSON.parse(localStorage.getItem('userAuthTokens')):null)
    let [adminAuthTokens,setAdminAuthTokens] =useState( ()=> localStorage.getItem('adminAuthTokens')? JSON.parse(localStorage.getItem('adminAuthTokens')):null)
    let [user,setUser] = useState( ()=> localStorage.getItem('userAuthTokens')? jwt_decode(localStorage.getItem('userAuthTokens')):null)
    let [admin,setAdmin] = useState( ()=> localStorage.getItem('adminAuthTokens')? jwt_decode(localStorage.getItem('adminAuthTokens')):null)
    let [loading,setLoading] = useState(true)


  
    async function loginAdmin(username,password){
        const admindata = {'username': username, 'password': password}
        await axios.post(`${apiBaseURL}api/token/`,admindata).then(response => {
            let data =  response.data
            let userDetails = jwt_decode(data.access)
            if (response.status === 200) {
                if(userDetails.is_superuser){
                    setAdminAuthTokens(data)
                    setAdmin(jwt_decode(data.access))
                    localStorage.setItem('adminAuthTokens',JSON.stringify(data))
                    navigate('/admin/home')
                }else{
                    alert("You don't have permission to access this page.")
                }
                    
            }else{
                    alert('something went wrong')
            }
       
       }).catch((error)=>{
           alert(error.response.data.message)
           
       })
       
    }
    async function loginUser(username,password){
        const userdata = {'username': username, 'password': password}
       
        await axios.post(`${apiBaseURL}api/usertoken/`,userdata).then(response => {
            let data =  response.data
            let userDetails = jwt_decode(data.access)
            if (response.status === 200) {
                setUserAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('userAuthTokens',JSON.stringify(data))
                if(userDetails.is_businessOwner){

                    navigate('/shophome')
                }else{
                    
                    navigate('/home/')
                }
                    
            }else{
                    alert('something went wrong')
            }
       
       }).catch((error)=>{
           alert(error.response.data.message)
           
       })
       
    }
    

    let logoutAdmin = () => {
        setAdminAuthTokens(null)
        setAdmin(null)
        localStorage.removeItem('adminAuthTokens')
        navigate('/admin')
    }
    let logoutUser = () => {
        
        console.log('byeeeeeeeeeeeeeeeeeeee')
        setUserAuthTokens(null)
        setUser(null)
        localStorage.removeItem('userAuthTokens')
        navigate('/login')
    }


    let contextData = {

        userAuthTokens:userAuthTokens,
        adminAuthTokens:adminAuthTokens,
        user: user,
        admin: admin,
        loginAdmin: loginAdmin,
        logoutAdmin: logoutAdmin,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }



    useEffect(() => {
      
        if(userAuthTokens && loading){
                  
            let data = jwt_decode(userAuthTokens.access)
            setUser(data)

        }
        
        if(adminAuthTokens && loading){
         
            setAdmin(jwt_decode(adminAuthTokens.access))
        }
        setLoading(false)

    },[adminAuthTokens,loading,userAuthTokens])
    
    return (
        <AuthContext.Provider value={contextData} >
            {loading?null:children}
        </AuthContext.Provider>
    )
}
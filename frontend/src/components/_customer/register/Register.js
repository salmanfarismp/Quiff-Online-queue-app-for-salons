
import React  from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import {createUser} from '../../../api'
// import {UserInstance} from '../../../Utilities/axios/Axios';

const phoneRegExp = /^1?\d{9,15}$/

 



function Register({}) {
  
  yup.addMethod(yup.string, 'stripEmptyString', function () {
    return this.transform((value) => (value === '' ? undefined : value));
  });
  
  const schema = yup.object().shape({

    userName: yup.string().stripEmptyString().required(),
    email: yup.string().email().stripEmptyString().required(),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    password: yup.string().min(8).max(100).stripEmptyString().required(),
    confirmPassword: yup.string().stripEmptyString().oneOf([yup.ref('password'), null]),
})




 

  
  
  
  
  let navigate = useNavigate()
  async function UserCreation(username,email,phone_number,password){
    const formData = {'username':username, 'email':email, 'phone_number':phone_number, 'password':password}

    await createUser(formData).then(response =>{
        

        alert('Success')
        navigate('/login')
        
        
        
            
        
  
    }).catch((error)=>{
      error.response.data.username && alert(error.response.data.username)
    })
  }
  
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
    const submitForm = (data) => {
     
      UserCreation(data.userName ,data.email, data.phone, data.password)
    }
  return (



 
    <div className="container-fluid  back-body " >
      <div style={{maxHeight:'90vh'}} className="main-body">
        
  
        <div className="content-body container-fluid w-60">
            <form onSubmit={handleSubmit(submitForm)} className='userInput' action="">
            <input type="text"     className={errors.userName?'mt-1 darktheme w-100':'mt-1 darktheme mb-3 w-100'}  name='userName' {...register('userName')}  placeholder="Username" /> <p className='displayError'>{errors.userName?.message}</p>
            <input type="email"   className={errors.email?'mt-1 darktheme w-100':'mt-1 darktheme mb-3 w-100'} name='email' {...register('email')}  placeholder="Email Address" /> <p className='displayError'>{errors.email?.message}</p>
            <input type="text"    className={errors.phone?'mt-1 darktheme w-100':'mt-1 darktheme mb-3 w-100'} name='phone' {...register('phone')}  placeholder="Phone Number" /> <p className='displayError'>{errors.phone?.message}</p>
            <div className="passwords">
            <input type="password"    className={errors.password?'mt-1 darktheme w-100':'mt-1 darktheme mb-3 w-100'} name='password' {...register('password')}  placeholder="Password" /> <p className='displayError'>{errors.password?.message}</p>
            <input type="password"    className={errors.confirmPassword?'mt-1 darktheme w-100':'mt-1 darktheme mb-3 w-100'} name='confirmPassword' {...register('confirmPassword')}  placeholder="Confirm Password" /> 
            </div>
              
            
            
           
            <p className='displayError'>{errors.confirmPassword && 'Passwords do not match'}</p> 
            <div className="d-flex flex-column justify-content-center text-center  mt-2">
                <button type="submit" className=" text-center btn  mb-2 loginBtn ">Register</button>
                 <p>Already Have an Account?<span ><Link className="link" to="/login">LogIn Here</Link></span></p>
               
            </div> 
            </form>
        </div>
      </div>
    </div>
 
  );
}

export default Register;


import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useContext } from 'react';
import AuthContext from '../../../../contexts/AuthContext';

const schema = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().min(8).max(16).required(),
  

})

function Login() {
  let {loginUser,loginAdmin} = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
   

      loginUser(data.userName, data.password)
  }
  return (



 
    <div className="container-fluid  back-body " >
      <div className="main-body">
        <h3 className=" mb-4 text-center" style={{fontWeight: "1px"}}>Welcome Back!</h3>
        <div className="content-body w-60">
          <form onSubmit={handleSubmit(submitForm)}  className='userInput' action="">
          <input type="text"  className=" mt-3 text-light w-100 " {...register('userName')}  placeholder="Enter Username" /><p className='displayError'>{errors.userName?.message}</p>
          <input type="password"  className=" text-light mt-3 w-100" {...register('password')}  placeholder="Enter Password" /><p className='displayError'>{errors.password?.message}</p>
          <div className="d-flex flex-column justify-content-center text-center mt-3  w-100">
            <button type='submit' className="text-center btn mt-3 mb-2 loginBtn ">Login</button>
             <p>Didn't Have an Account?<span  ><Link className="link" style={{color: 'grey'}} to="/register">Register Now</Link></span></p>
          </div> 
          </form>
        </div>
      </div>
    </div>
 
  );
}

export default Login;

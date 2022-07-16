
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import LandingPage from './pages/_commonPages/LandingPage';
import {ShopDetailProvider,AuthProvider} from './contexts/AuthContext'

import LoginPage from './pages/_commonPages/Login';
import SignupPage from './pages/_customer/SignUp';
import Home from './pages/_customer/home/Home';
import { FastPassRoute, PrivateUserRoute } from './utilities/privateRoute/PrivateRoute';
import ShopsLandingPage from './pages/_shop/shopslandingpage/ShopsLandingPage';
import Registersalon from './pages/_shop/registersalon/Registersalon';
import ShopHomePage from './pages/_shop/shopHome/ShopHomePage';
import ShopQueue from './pages/_shop/shopHome/ShopQueue';

import AdminLogin from './pages/_admin/adminLogin'
import AdminHome from './pages/_admin/Admin'
import MyDashBoard from './pages/_admin/MyDashBoard'
import UserTable from './pages/_admin/UserTable'
import ShopsTable from './pages/_admin/ShopTable'
import ShopOwnerDetailes from './pages/_admin/ShopOwnerDetailes'
import ShopManagement from './pages/_admin/ShopManagement'
import SalesReports from './pages/_admin/SalesReports'
import PaymentsTable from './pages/_admin/PaymentTable'
import PaymentDetailes from './pages/_admin/PaymentDetailes'
import ServicesManagement from './pages/_admin/ServicesManagement'
import PlansManagement from './pages/_admin/PlansManagement'
import ShopViewPage from './pages/_customer/ShopViewPage';
import QueueViewPage from './pages/_customer/QueueViewPage';
import ShopRequests from './pages/_admin/ShopRequests';
import { KeepShopLiveProvider } from './contexts/UserContext/KeepShopLiveContext';






function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <AuthProvider>
          <KeepShopLiveProvider>
          <Routes >

            {/* common routes  */}


            <Route element={<FastPassRoute> <LandingPage/>
            </FastPassRoute>} exact path="/"/>
            <Route element={<FastPassRoute><LoginPage/>
            </FastPassRoute>} path="/login" />
            <Route element={<FastPassRoute><SignupPage/>
            </FastPassRoute>} path="/register" />
            <Route element={<FastPassRoute><ShopsLandingPage/>
            </FastPassRoute>} path="/shopslandingpage" />
            



            {/* user side routes */}
           
            <Route element={<PrivateUserRoute><Home />
              </PrivateUserRoute>} exact path="/home" />
              <Route element={<PrivateUserRoute><ShopViewPage />
              </PrivateUserRoute>} exact path="/home/shop/:shopId" />
              <Route element={<PrivateUserRoute><QueueViewPage />
              </PrivateUserRoute>} exact path="/home/shop/queue" />

          </Routes>
          <ShopDetailProvider>
          <Routes >
            <Route element={<FastPassRoute><Registersalon/>
            </FastPassRoute>} path="/registersalon" />
            <Route element={<ShopHomePage/>}  path="/shophome" />
            <Route element={<ShopQueue/>}   path="/shophome/queue" />
            
          </Routes>
          </ShopDetailProvider>
          </KeepShopLiveProvider>
          <Routes>
            {/* admin side routes */}
            <Route element={<AdminLogin/>} exact path="/admin" />
            <Route element={<AdminHome children={<MyDashBoard />}/>} exact path="/admin/home"/>
             <Route element={<AdminHome children={<UserTable />} />}  path="/admin/home/users"/>
            <Route element={<AdminHome children={<ShopsTable />}/>}  path="/admin/home/shops"/>
            <Route element={<AdminHome children={<ShopOwnerDetailes />}/>}  path="/admin/home/shops/owner/:is_from/:id"/>
            <Route element={<AdminHome children={<ShopManagement />}/>}  path="/admin/home/shops/:is_from/:shopId"/>
            <Route element={<AdminHome children={<SalesReports />}/>}  path="/admin/home/salesReports"/>
            <Route element={<AdminHome children={<PaymentsTable />}/>}  path="/admin/home/payments"/>
            <Route element={<AdminHome children={<PaymentDetailes />}/>}  path="/admin/home/payments/:paymentId"/>
            <Route element={<AdminHome children={<ServicesManagement />}/>}  path="/admin/home/services"/> 
            <Route element={<AdminHome children={<PlansManagement />}/>}  path="/admin/home/plans"/> 
            <Route element={<AdminHome children={<ShopRequests />}/>}  path="/admin/home/shop_requests"/> 
            
         
          
        </Routes>
        
         
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


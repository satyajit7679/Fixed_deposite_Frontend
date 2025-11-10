import { createContext, useEffect } from "react";
import "./App.css";
// import { Routes, Route } from "react-router-dom";
import Home from "./auth/Home";
import Login from "./auth/login";
import Register from "./auth/register";
import Settings from "./auth/Settings";
import FDDetailsPage from "./components/FDDetailsPage"; 
import PersonalDetails from './auth/PersonalDetails';
import PanValidation from './auth/PanValidation';
import Payment from "./auth/Payment"; 
import FixedDepositPage from "./components/FixedDepositPage";
// import FDDetails from "./auth/FdDetails";
import Contact from "./components/Contact";
import AdminDashboard from "./components/AdminDashboard";
import FDPortfolioPage from "./components/FDPortfolioPage";
import MyProfile from "./components/MyProfile";

//import AuthenticationLayout from "./auth/AuthenticationLayout";
// import BaseLayout from "./auth/BaseLayout";
import AuthenticationRoutes from "./auth/Route-guards/AuthenticationRoutes";
import { Route, Routes } from "react-router-dom";
import NotAuthenticationRoutes from "./auth/Route-guards/NotAuthenticationRoutes";
import { apiUrl } from "./api/config";
import axios from "axios";

//import { displayRazorpay } from './razorpay';
export const UserContext = createContext();
function App() {
  const data = "Hello World";
  console.log("backend url",apiUrl)
  useEffect(()=>{
    hitBackend()
  }, [])
  const hitBackend = async () =>{
    try {
      const response = await axios({
        url: apiUrl,
        method: "GET",
    })

      console.log(response)
      // if(response){
      //   console.log("response",response)
      // }
    } catch (error) {
      console.log("error",error)
    }

  }
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

 

  return (
   <>
    
      <UserContext.Provider value={data}>
        {                                                  }
        <Routes>
          <Route element={<AuthenticationRoutes />}>
            <Route path="/" element={<Home />} />
            
          </Route>
          <Route path="/Home" element={<Home />} />
          <Route path="/PanValidation" element={<PanValidation />} />
          <Route path="/PersonalDetails" element={<PersonalDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/MyProfile" element={<MyProfile/>}/>
          <Route path="/settings" element={<Settings />} />
          <Route path="/fixedDepositpage" element={<FixedDepositPage />} />
          <Route path="/fd-details" element={<FDDetailsPage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/adminDashboard" element={<AdminDashboard/>} />
          <Route path="/FDportfolio" element={<FDPortfolioPage/>} /> 
          <Route element={<NotAuthenticationRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}
export default App;

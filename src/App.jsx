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

  // async function displayRazorpay () {

  //   try {
      
  //     const orderResponse = await axios.post(`${apiUrl}/create-order`, { amount: 1000 });
  
  //     console.log("orderResponse",orderResponse);
  //     if(orderResponse?.data?.data?.orderId){
      
  
  
  //     const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
  //     console.log("res",res)
  
  //       if (!res){
  //         alert('Razropay failed to load!!')
  //         return 
  //       }
  
  //       // const data = await fetch('http://localhost:1769/razorpay', {method: 'POST'}).then((t) => 
  //       //   t.json()
  //       // ) 
  
  //       // console.log(data)
  
  //     const options = {
  //       "key": "rzp_test_RqyXENTACzsmPf", // Enter the Key ID generated from the Dashboard
  //       "amount": "1000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //       "currency": "INR",
  //       "name": "Acme Corp",
  //       "description": "Test Transaction",
  //       // "image": "https://example.com/your_logo",
  //       "order_id": orderResponse?.data?.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //       "callback_url":"http://localhost:1769/verify",
  //       "notes": {
  //           "address": "Razorpay Corporate Office"
  //       },
  //       "theme": {
  //           "color": "#3399cc"
  //       }
  //   };
  //   const paymentObject = new window.Razorpay(options); 
  //   paymentObject.open();
  //   }
  //   } catch (error) {
  //     console.log("error",error)
  //   }
//}      

  return (
   <>
    {/* <button
        onClick={displayRazorpay}
        >
          Pay now 
        </button> */}
      <UserContext.Provider value={data}>
        {/* <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />                                                   */}
        <Routes>
          <Route element={<AuthenticationRoutes />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/purchase" element={<Purchase />} />
            
            <Route path="/review" element={<Review/>} />           */}
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

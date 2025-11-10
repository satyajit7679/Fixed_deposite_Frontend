import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, Button, Checkbox } from "@material-tailwind/react";
import axios from "axios";
// import { apiUrl } from "../api/config";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  console.log("data");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const adminEmail = "admin@gmail.com";
  const adminPassword = "1234";

  const onSubmit = async (data) => {
    if (data.email === adminEmail && data.password === adminPassword) {
      localStorage.setItem("token", "dummy-admin-token");
      localStorage.setItem("role", "admin");
      navigate("/adminDashboard");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email: data.email,
        password: data.password,
      });
      console.log(response)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.token);
        navigate(
          response.data.user.role === "admin" ? "/adminDashboard" : "/Home"
        );
      }
    } catch (err) {
      console.log(err)
      toast("Wrong Password!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-br from-blue-300 to-purple-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h4 className="text-2xl font-bold text-white">
              Welcome Back
            </h4>
            <p className="text-blue-100 font-light mt-1">
              Nice to meet you! Enter your details to login.
            </p>
          </div>
          
          <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col space-y-1"
            >
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                className="w-full bg-white/50 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                {...register("email")}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col space-y-1"
            >
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full bg-white/50 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="remember-me" 
                  ripple={false}
                  className="hover:before:opacity-0 border-gray-300 rounded"
                  color="blue"
                />
                <label
                  className="text-sm text-gray-600 cursor-pointer select-none"
                  htmlFor="remember-me"
                >
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Forgot password?
              </a>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg py-3 font-medium"
              >
                Sign In
              </Button>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-gray-600"
            >
              Don't have an account?{" "}
              <a
                href="register"
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Sign up
              </a>
            </motion.p>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;
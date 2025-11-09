import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

 const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, data);
    navigate("/login");
  } catch (error) {
    console.error("Registration error:", error);
    setIsSubmitting(false);
  }
};

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-300 p-4">
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full p-8 bg-white shadow-xl rounded-2xl border border-opacity-10 border-white backdrop-blur-sm">
          
            <Typography variant="h4" className="text-center text-gray-800 font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Create Your Account
            </Typography>
            <Typography
              variant="paragraph"
              className="text-center text-gray-600"
            >
              Join our community and start your journey
            </Typography>

          <motion.form 
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <Typography variant="small" className="text-gray-700 font-medium mb-1">
                Your Name
              </Typography>
              <Input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className="mt-1 !border-gray-300 focus:!border-purple-500 focus:!border-t-purple-500"
                color="purple"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <Typography variant="small" className="text-gray-700 font-medium mb-1">
                Email
              </Typography>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 !border-gray-300 focus:!border-purple-500 focus:!border-t-purple-500"
                color="purple"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={itemVariants}>
              <Typography variant="small" className="text-gray-700 font-medium mb-1">
                Phone Number
              </Typography>
              <Input
                type="text"
                placeholder="Enter your phone number"
                {...register("phone", { required: "Phone number is required" })}
                className="mt-1 !border-gray-300 focus:!border-purple-500 focus:!border-t-purple-500"
                color="purple"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.phone && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.phone.message}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <Typography variant="small" className="text-gray-700 font-medium mb-1">
                Password
              </Typography>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 !border-gray-300 focus:!border-purple-500 focus:!border-t-purple-500"
                color="purple"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={itemVariants}>
              <Typography variant="small" className="text-gray-700 font-medium mb-1">
                Confirm Password
              </Typography>
              <Input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                className="mt-1 !border-gray-300 focus:!border-purple-500 focus:!border-t-purple-500"
                color="purple"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </motion.div>

            {/* Date of Birth Field */}
            <motion.div variants={itemVariants}>
              <Typography variant="small" className="text-gray-700 font-medium mb-1">
                Date of Birth
              </Typography>
              <Input
                type="date"
                placeholder="Date of Birth"
                {...register("dob", { required: "Date of birth is required" })}
                className="mt-1 !border-gray-300 focus:!border-purple-500 focus:!border-t-purple-500"
                color="purple"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.dob && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.dob.message}
                </motion.p>
              )}
            </motion.div>

            {/* Address Field */}
            <motion.div variants={itemVariants}>
              <Typography variant="small" className="text-gray-700 font-medium mb-1">
                Address
              </Typography>
              <Input
                type="text"
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
                className="mt-1 !border-gray-300 focus:!border-purple-500 focus:!border-t-purple-500"
                color="purple"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.address && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.address.message}
                </motion.p>
              )}
            </motion.div>

            {/* Remember Me Checkbox */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <Checkbox 
                id="remember-me" 
                color="purple" 
                ripple={false}
                className="hover:before:opacity-0"
              />
              <label htmlFor="remember-me" className="text-gray-600 text-sm">
                Remember Me
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <Button 
                type="submit" 
                fullWidth 
                className="mt-2 bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Sign Up"}
              </Button>
            </motion.div>

            {/* Login Link */}
            <motion.div variants={itemVariants} className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a 
                  href="login" 
                  className="font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200 underline"
                >
                  Login
                </a>
              </p>
            </motion.div>
          </motion.form>
        </Card>
      </motion.div>
    </div>
  );
}

export default Register;
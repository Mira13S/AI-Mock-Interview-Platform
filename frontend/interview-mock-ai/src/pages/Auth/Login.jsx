// import { Target } from "lucide-react";
// import React, { use, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Input from "../../components/Inputs/Input";
// import { validateEmail  } from "../../utils/helper";
// import axiosInstance from "../../utils/axioInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import { useContext } from "react";
// import { UserContext } from "../../context/userContext";

// const Login = ({setCurrentPage}) =>{
//     const [email, setEmail]=useState("");
//     const [password, setPassword]= useState("");
//     const [error, setError]= useState(null);

//     const { updateUser }= useContext(UserContext);

//     const navigate=useNavigate();

//     //Hnadle Login Form Submit
//     const handleLogin= async(e) =>
//     {
//         e.preventDefault();

//         if(!validateEmail(email))
//         {
//             setError("Please enter a valid email address");
//             return;
//         }

//         if(!password)
//         {
//             setError("Plase enter valid password");
//         }

//         setError("");

//         try{
//             //api call
//             const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
//                 email,password,
//             });
        
//         const {token}= response.data;

//         if(token)
//         {
//             localStorage.setItem("token", token);
//             updateUser(response.data);
//             navigate("/dashboard");
//         }
//          }
//         catch(error)
//         {
//             if(error.response && error.response.data.message)
//             {
//                 setError(error.response.data.message);
//             }
//             else
//             {
//                 setError("Something went wrong. Please try again.");
//             }
//         }
//     };

    
//     return(
//         <div className="w-full p-7 flex flex-col justify-center">

//             <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
//             <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to login</p>


//             <form onSubmit={handleLogin}>
//                 <Input value={email}
//                        onChange={({target})=> setEmail(target.value)}
//                        label="Email Address"
//                        placeholder="johnexample.com"
//                        type="text" />
//                 <Input value={password}
//                        onChange={({target}) => setPassword(target.value)}
//                        label="Password"
//                        placeholder="Min 8 characters"
//                        type="password" />

//                 {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
//                 <button type="submit" className="btn-primary">
//                     LOGIN
//                 </button>

//                 <p className="text-[13px] text-slate-800 mt-3">
//                     Don't have an account? {" "}
//                      <button
//                         type="button" // 👈 prevent form submission
//                         className="font-medium text-primary underline cursor-pointer"
//                         onClick={() => setCurrentPage("signup")}
//                     >
//                         Sign Up
//                     </button>
//                                     </p>

//             </form>
//         </div>
//     )
// }

// export default Login;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axioInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
        <h3 className="text-2xl font-bold text-blue-800 mb-2">Welcome Back</h3>
        <p className="text-sm text-blue-600 mb-6">
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-sm text-center -mt-1">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            LOGIN
          </button>

          <p className="text-center text-sm text-blue-800 mt-3">
            Don’t have an account?{" "}
            <button
              type="button"
              className="font-semibold text-blue-600 underline"
              onClick={() => setCurrentPage("signup")}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    
  );
};

export default Login;

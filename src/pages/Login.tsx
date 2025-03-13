import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookies";

const Login = () => {
    const [userInfo , setUserInfo]=useState({
        email : "imtoufiq@gmail.com",
        password : "abcd",
        loading : false
    })

  const navigate = useNavigate();
  const location = useLocation(); 
  const from = location.state?.from || "/"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, loading: true });

    setTimeout(() => {
      setUserInfo({ ...userInfo, loading: false });
      setCookie("auth", "success", 1); 
      navigate(from, { replace: true }); 
    }, 500);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg  w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              required
              value={userInfo.email}
              onChange={(e) => setUserInfo({...userInfo, email : e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              required
              value={userInfo.password}
              onChange={(e) => setUserInfo({...userInfo, password : e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-700 transition"
            disabled={userInfo.loading}
          >
            {userInfo.loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

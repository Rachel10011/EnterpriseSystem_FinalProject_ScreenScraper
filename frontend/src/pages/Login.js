import React from "react";
import { redirect } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useLocalStorage } from "../components/localStorage";

const Login = () => {
  const [userEmail, setUserEmail] = useLocalStorage("email", "");
  console.log(userEmail);
  

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <h2>Don't have an account?</h2>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => (window.location.href = "/authentication/register")}
      >
        Create Account
      </button>
    </div>
  );
};

// function loginUser(email, password) {
//   axios
//     .post("http://localhost:3001/clients/login", {
//       email: email,
//       password: password,
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

export default Login;

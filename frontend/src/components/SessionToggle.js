import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./localStorage";

export const SessionToggle = () => {
  const Navigate = useNavigate();
  function Logout () {
    localStorage.removeItem("email");
    Navigate("/");
  };

  const [userEmail, setUserEmail] = useLocalStorage("email", "");

  if (!userEmail) {
    return <a className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" href="/authentication/login">Login</a>;
  }  
  return (
    <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
      <p>{userEmail}</p>
      <button onClick={() => {Logout()}}>Logout</button>
    </div>
  );
};

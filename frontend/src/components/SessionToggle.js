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
    return <a href="/authentication/login">Login</a>;
  }  
  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={() => {Logout()}}>Logout</button>
    </div>
  );
};

import { useSession } from "./userSession";

export const SessionToggle = (userEmail) => {
  if (userEmail) {
    return (
      <div>
        {userEmail} <a href="/authentication/logout">Logout</a>{" "}
      </div>
    );
  }
  return <a href="/authentication/login">Login</a>;
};

export const Logout = () => {};

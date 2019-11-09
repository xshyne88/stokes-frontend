import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserProvider";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div>HEADER</div>
      <ul>
        <li>
          <Link to="/home">Home Page</Link>
        </li>
        <li>
          {user ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        <li>
          <Link to="/admin">Admin Page</Link>
        </li>
      </ul>
    </>
  );
};

export default Header;

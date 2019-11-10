import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import { UserContext } from "../UserProvider";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollHider from "../ScrollHider";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import dayjs, { Dayjs } from "dayjs";

const Header = props => {
  const { user } = useContext(UserContext);
  if (user) {
    return (
      <>
        <CssBaseline />
        <ScrollHider {...props}>
          <AppBar>
            <Toolbar>
              <Typography variant="h6">
                Todo List for {dayjs().format("M-D-YY")}
              </Typography>
            </Toolbar>
          </AppBar>
        </ScrollHider>
        <Toolbar />
      </>
    );
  } else {
    return null;
  }
};

export default Header;

// return (
//     <>
//       <div>HEADER</div>
//       <ul>
//         <li>
//           <Link to="/home">Home Page</Link>
//         </li>
//         <li>
//           {user ? (
//             <Link to="/logout">Logout</Link>
//           ) : (
//             <Link to="/login">Login</Link>
//           )}
//         </li>
//         <li>
//           <Link to="/admin">Admin Page</Link>
//         </li>
//       </ul>
//     </>
//   );

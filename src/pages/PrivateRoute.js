import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
const PrivateRoute = ({ children }) => {
  const { user } = useAuth0();
  let navigate = useNavigate();
  return user ? children : navigate("/");
};
export default PrivateRoute;

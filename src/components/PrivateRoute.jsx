import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);

  // Si le token existe, on affiche la page demandée
  if (token) {
    return children;
  }

  // Sinon, on redirige vers la page de login
  return <Navigate to="/login" />;
};

export default PrivateRoute;

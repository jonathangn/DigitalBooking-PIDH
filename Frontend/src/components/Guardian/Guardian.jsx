import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

export const Guardian = ({ children, adminOnly = false }) => {
    const { auth, admin } = useContext(Context);
    const location = useLocation();

    if(!auth) {
        return <Navigate to="/login" replace state={{ from: location}} />
    }

    if (adminOnly && !admin) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default Guardian;
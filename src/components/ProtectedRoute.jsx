import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({children, allowedRoles})=> {
    const user = JSON.parse(localStorage.getItem("user"));
    const   token = localStorage.getItem("token");
    const currentRole = localStorage.getItem("currentRole");

    if (!token || !user) {
        return <Navigate to = "/se-connecter" replace/>;
    }

        if (allowedRoles && !allowedRoles.includes(currentRole)) {
            return <Navigate to = "/non-autorise" replace />;
        }

    return children;
};

export default ProtectedRoute;

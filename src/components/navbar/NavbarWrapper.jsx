import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PublicNavbar from "./PublicNavbar";
import PromoteurNavbar from "./PromoteurNavbar";
import ClientNavbar from "./ClientNavbar";

export default function NavbarWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentRole = localStorage.getItem("currentRole");

  useEffect(() => {
    verifyAuthentication();
  }, [location.pathname]);


  const verifyAuthentication = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3000/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        handleInvalidToken();
      }
    } catch (error) {
      console.error("Erreur de vérification du token:", error);
      handleInvalidToken();
      
      const protectedRoutes = ["/promoteur", "/client"];
      if (protectedRoutes.some(route => location.pathname.startsWith(route))) {
        navigate("/se-connecter", { 
          state: { from: location.pathname, message: "Session expirée" }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInvalidToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const noNavbarRoutes = ["/login", "/register"];
  if (noNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  if (loading) {
    return (
      <nav className="bg-white shadow-md h-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1d4370]"></div>
      </nav>
    );
  }

  const isPromoteurRoute = location.pathname.startsWith("/promoteur");
  
  const isClientRoute = location.pathname.startsWith("/client");

  if (isPromoteurRoute && isAuthenticated && currentRole === "promoteur") {
    return <PromoteurNavbar user={user} onLogout={handleInvalidToken} />;
  }

  if (isClientRoute && isAuthenticated && (currentRole === "client_physique" || currentRole === "client_entreprise")) {
    return <ClientNavbar user={user} onLogout={handleInvalidToken} />;
  }

  if (isAuthenticated && !isClientRoute && !isPromoteurRoute) {

    if (currentRole === "promoteur") {
      return <PromoteurNavbar user={user} onLogout={handleInvalidToken} />;
    }
    if (currentRole === "client_physique" || currentRole === 'client_entreprise') {
      return <ClientNavbar user={user} onLogout={handleInvalidToken} />;
    }
  }

  if (!isAuthenticated && (isPromoteurRoute || isClientRoute)) {
    return null;
  }

  return <PublicNavbar />;
}
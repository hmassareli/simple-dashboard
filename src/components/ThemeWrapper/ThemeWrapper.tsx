// @ts-ignore
import ImgDashboard from "../../assets/home.svg?react";
// @ts-ignore
import ImgLogout from "../../assets/logout.svg?react";
// @ts-ignore
import ImgProduto from "../../assets/produtos.svg?react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import "./ThemeWrapper.css";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-screen overflow-hidden">
      <div className="side-bar">
        <h1>Toy City ERP</h1>
        <ul>
          <li onClick={() => navigate("/")}>
            {" "}
            <ImgDashboard />
            Dashboard
          </li>
          <li onClick={() => navigate("/products")}>
            {" "}
            <ImgProduto />
            Products
          </li>

          <li onClick={() => logout()} style={{ marginTop: "auto" }}>
            <ImgLogout />
            Logout
          </li>
        </ul>
      </div>
      <div className="overflow-y-auto w-full">{children}</div>
    </div>
  );
};

export default ThemeWrapper;

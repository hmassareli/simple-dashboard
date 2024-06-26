import ImgDashboard from "../../assets/home.svg?react";
import ImgLogout from "../../assets/logout.svg?react";
import ImgProduto from "../../assets/produtos.svg?react";

import { useNavigate } from "react-router-dom";

import "./SideBar.css";

const SideBar = () => {
  const navigate = useNavigate();
  return (
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

        <li style={{ marginTop: "auto" }}>
          <ImgLogout />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default SideBar;

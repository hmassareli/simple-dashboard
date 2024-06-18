import ImgDashboard from "../../../assets/home.svg?react";
import ImgLogout from "../../../assets/logout.svg?react";
import ImgProduto from "../../../assets/produtos.svg?react";

import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="side-bar">
      <h1>Toy City ERP</h1>
      <ul>
        <li>
          {" "}
          <ImgDashboard />
          Dashboard
        </li>
        <li>
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

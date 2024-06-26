import Header from "../Header";
import SideBar from "../SideBar/SideBar";
import "./index.css";
const Products = () => {
  return (
    <div className="products">
      <SideBar />
      <div className="content">
        <Header title="Products" />
      </div>
    </div>
  );
};

export default Products;

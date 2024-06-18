import SideBar from "./components/SideBar";
import "./index.css";

function Dashboard() {
  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div>Content</div>
      </div>
    </>
  );
}

export default Dashboard;

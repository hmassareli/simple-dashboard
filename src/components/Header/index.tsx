import "./index.css";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="header">
      <h1>{title}</h1>
    </div>
  );
};

export default Header;

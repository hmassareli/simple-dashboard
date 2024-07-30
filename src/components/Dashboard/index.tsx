import { useState } from "react";
import CustomerCircle from "../../assets/customer_circle.svg?react";
import ImgMoney from "../../assets/money_circle.svg?react";
import ProductSold from "../../assets/product_sold_circle.svg?react";
import TrendDown from "../../assets/trenddown.svg?react";
import TrendUp from "../../assets/trendup.svg?react";
import Header from "../Header";
import "./index.css";

const StatsBox = ({
  type = "number",
  name,
  value,
  variance,
  icon: Icon,
}: {
  type?: "number" | "currency";
  name: string;
  value: number;
  variance: number;
  icon: any;
}) => {
  return (
    <div className="stats_box">
      <div className="stats_header">
        <Icon />
        <p>{name} </p>
      </div>
      <p style={{ fontSize: "32px", fontWeight: "500" }}>
        {" "}
        {type === "number"
          ? value
          : value?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
      </p>
      <p className={`percentage_growth ${variance > 0 ? "up" : "down"}`}>
        {variance > 0 ? <TrendUp /> : <TrendDown />}
        <strong>{Math.abs(variance)}%</strong> no último mês
      </p>
    </div>
  );
};

function Dashboard() {
  const [revenueVariance, setRevenueVariance] = useState(10);

  return (
    <>
      <div className="dashboard">
        <div className="content">
          <Header title="Dashboard" />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              margin: "20px",
            }}
          >
            <StatsBox
              type="currency"
              name="Receita"
              icon={ImgMoney}
              variance={revenueVariance}
              value={100}
            />
            <StatsBox
              name="Produtos Vendidos"
              icon={ProductSold}
              variance={revenueVariance}
              value={100}
            />
            <StatsBox
              name="Usuários"
              icon={CustomerCircle}
              variance={revenueVariance}
              value={100}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

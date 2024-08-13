import { getRecentSales, getTopSelling, getTotalUsers } from "@/api/dashboad";
import { useEffect, useState } from "react";
import CustomerCircle from "../../assets/customer_circle.svg?react";
import ImgMoney from "../../assets/money_circle.svg?react";
import ProductSold from "../../assets/product_sold_circle.svg?react";
import TrendDown from "../../assets/trenddown.svg?react";
import TrendUp from "../../assets/trendup.svg?react";
import SalesChart from "../Charts/SalesCharts";
import Header from "../Header";
import RecentTransactionsList from "../lists/RecentTransactionsList";
import TopSelllingsList from "../lists/TopSellingsList";
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
  const [totalUsers, setTotalUsers] = useState(0);
  const [topSellings, setTopSellings] = useState(0);
  const [recentSales, setRecentSales] = useState(0);

  useEffect(() => {
    const executeAsync = async () => {
      const response = await getTotalUsers();
      const topSellingsResponse = await getTopSelling();
      const recentSalesResponse = await getRecentSales();

      setRecentSales(recentSalesResponse.reduce((acc, sale) => acc + parseFloat(sale.total_value), 0))
      setTopSellings(topSellingsResponse.reduce((acc, product) => acc + product.sold_quantity, 0))
      setTotalUsers(response)
    }
    executeAsync();
  }, [])

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
              variance={recentSales}
              value={recentSales}
            />
            <StatsBox
              name="Produtos Vendidos"
              icon={ProductSold}
              variance={topSellings}
              value={topSellings}
            />
            <StatsBox
              name="Usuários"
              icon={CustomerCircle}
              variance={totalUsers}
              value={totalUsers}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <SalesChart />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <TopSelllingsList />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <RecentTransactionsList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

import { getSalesGraph } from '@/api/dashboad';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface SalesData {
  currentMonthSales: number[];
  lastMonthSales: number[];
}

const getMonthName = (monthIndex: number): string => {
  switch (monthIndex) {
    case 0: return 'Janeiro';
    case 1: return 'Fevereiro';
    case 2: return 'Março';
    case 3: return 'Abril';
    case 4: return 'Maio';
    case 5: return 'Junho';
    case 6: return 'Julho';
    case 7: return 'Agosto';
    case 8: return 'Setembro';
    case 9: return 'Outubro';
    case 10: return 'Novembro';
    case 11: return 'Dezembro';
    default: return '';
  }
};

const SalesChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData>({
    currentMonthSales: Array(31).fill(0),
    lastMonthSales: Array(31).fill(0),
  });

  const currentMonthIndex = new Date().getUTCMonth();
  const currentMonthName = getMonthName(currentMonthIndex);
  const lastMonthIndex = (currentMonthIndex - 1 + 12) % 12;
  const lastMonthName = getMonthName(lastMonthIndex);

  useEffect(() => {
    const executeAsync = async () => {
      try {
        const recentSalesData = await getSalesGraph();
        const currentMonthSales = Array(31).fill(0);
        const lastMonthSales = Array(31).fill(0);

        for (const [day, sales] of Object.entries(recentSalesData.currentMonth.days)) {
          currentMonthSales[parseInt(day) - 1] = parseFloat(sales);
        }

        for (const [day, sales] of Object.entries(recentSalesData.previousMonth.days)) {
          lastMonthSales[parseInt(day) - 1] = parseFloat(sales);
        }

        setSalesData({
          currentMonthSales,
          lastMonthSales,
        });
      } catch (error) {
        console.error('Erro ao buscar dados de vendas:', error);
      }
    };

    executeAsync();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      },
    },
    title: {
      text: `Vendas de ${currentMonthName}`,
      align: 'center',
    },
    xaxis: {
      categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
      title: {
        text: 'Dias do Mês',
      },
    },
    yaxis: {
      title: {
        text: 'Vendas ($)',
      },
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
    },
    colors: ['#008FFB', '#FF4560'],
    grid: {
      show: true,
      borderColor: '#e7e7e7',
    },
  };

  const series = [
    {
      name: `Vendas do ${currentMonthName}`,
      data: salesData.currentMonthSales,
    },
    {
      name: `Vendas de ${lastMonthName}`,
      data: salesData.lastMonthSales,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default SalesChart;

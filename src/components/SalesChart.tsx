import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { salesApi } from "../lib/api";
import "chart.js/auto";
import { ChartData, Point } from "chart.js/auto";
import Statistics from "./Statistics";
import DateFilter from "./DateFilter";
import { DateValueType } from "react-tailwindcss-datepicker";

interface SalesData {
  id: number;
  product: string;
  date: string;
  sales: number;
  revenue: number;
}

const SalesChart = () => {
  const [lineChartData, setLineChartData] = useState<ChartData<"line", (number | Point | null)[], unknown>>({
    labels: [],
    datasets: [],
  });

  const [barChartData, setBarChartData] = useState<ChartData<"bar", (number | Point | null)[], unknown>>({
    labels: [],
    datasets: [],
  });
  
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [bestSellingProduct, setBestSellingProduct] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await salesApi.get(`/sales`);
        let data = res.data;
  
        // Filter by date range
        if (dateRange?.startDate && dateRange?.endDate) {
          data = data.filter((item: SalesData) => {
            const itemDate = new Date(item.date);
            return (
              itemDate >= new Date(dateRange.startDate!) &&
              itemDate <= new Date(dateRange.endDate!)
            );
          });
        }
  
        const dates: string[] = data.map((item: SalesData) => item.date);
        const sales: number[] = data.map((item: SalesData) => item.sales);
  
        // Line Chart Daily Sales Trend
        const dataWithDates = dates.map((date, index) => ({
          date,
          sales: sales[index],
        }));
        dataWithDates.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const sortedDates = dataWithDates.map((item) => item.date);
        const sortedSales = dataWithDates.map((item) => item.sales);
  
        // Bar Chart Sales Comparison by Product
        const products = [
          ...new Set(data.map((item: SalesData) => item.product)),
        ];
        const productSales: number[] = products.map((product) => {
          return data
            .filter((item: SalesData) => item.product === product)
            .reduce((acc: number, curr: SalesData) => acc + curr.sales, 0);
        });
  
        // Summary Statistics
        const totalSales = data.reduce(
          (acc: number, curr: SalesData) => acc + curr.sales,
          0
        );
        const totalRevenue = data.reduce(
          (acc: number, curr: SalesData) => acc + curr.revenue,
          0
        );
        const bestSellingProduct = data.reduce(
          (acc: SalesData, curr: SalesData) =>
            acc.sales > curr.sales ? acc : curr,
          { sales: 0 }
        ).product;
  
        setLineChartData({
          labels: sortedDates,
          datasets: [
            {
              label: "Daily Sales",
              data: sortedSales,
              borderColor: "rgba(88, 188, 116, 1)",
              backgroundColor: "rgba(88, 188, 116, 0.2)",
              pointBackgroundColor: "rgba(88, 188, 116, 1)",
              pointRadius: 3,
              fill: true,
              tension: 0.2,
            },
          ],
        });
  
        setBarChartData({
          labels: products,
          datasets: [
            {
              label: "Total Sales by Product",
              data: productSales,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        });
  
        setTotalSales(totalSales);
        setTotalRevenue(totalRevenue);
        setBestSellingProduct(bestSellingProduct);
  
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };
    
    fetchData();
  }, [dateRange]);

  return (
    <>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="p-6 bg-white rounded-lg">
            <div className="w-1/3 ml-auto">
              <DateFilter value={dateRange} onChange={setDateRange} />
            </div>
            <h3 className="mt-5 text-xl font-bold">Daily Sales Trend</h3>
            <Line data={lineChartData} />
          </div>
          <div className="p-6 bg-white rounded-lg">
            <h3 className="text-xl font-bold">Sales Comparison by Product</h3>
            <Bar data={barChartData} />
          </div>
          <Statistics {...{ totalSales, totalRevenue, bestSellingProduct }} />
        </div>
      )}
    </>
  );
};

export default SalesChart;

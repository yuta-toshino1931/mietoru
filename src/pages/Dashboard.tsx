import React from "react";
import { TrendingUp, Target, AlertCircle, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Dashboard: React.FC = () => {
  // サンプルデータ
  const kpiData = [
    {
      title: "今月の売上",
      value: "¥2,350,000",
      change: "+12.5%",
      trend: "up",
      color: "text-success",
    },
    {
      title: "事業の利益",
      value: "¥485,000",
      change: "+8.2%",
      trend: "up",
      color: "text-success",
    },
    {
      title: "目標達成率",
      value: "87.3%",
      change: "+5.1%",
      trend: "up",
      color: "text-warning",
    },
    {
      title: "顧客数",
      value: "1,247",
      change: "+23.4%",
      trend: "up",
      color: "text-success",
    },
  ];

  const monthlyData = [
    { month: "1月", target: 2000000, actual: 1850000 },
    { month: "2月", target: 2100000, actual: 2050000 },
    { month: "3月", target: 2200000, actual: 2350000 },
    { month: "4月", target: 2300000, actual: 2180000 },
    { month: "5月", target: 2400000, actual: 2520000 },
    { month: "6月", target: 2500000, actual: 2350000 },
  ];

  const progressData = [
    { year: "1年目", target: 30000000, current: 26500000, percentage: 88 },
    { year: "5年目", target: 150000000, current: 52000000, percentage: 35 },
    { year: "10年目", target: 500000000, current: 52000000, percentage: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text">ダッシュボード</h1>
        <div className="text-sm text-text/70">
          最終更新: 2024年6月15日 10:30
        </div>
      </div>

      {/* KPIカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text/70">{kpi.title}</p>
                <p className="text-2xl font-bold text-text mt-1">{kpi.value}</p>
                <p className={`text-sm mt-1 ${kpi.color}`}>
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  {kpi.change}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* アラート・通知エリア */}
      <div className="card bg-warning/5 border-warning/20">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
          <div>
            <h3 className="font-semibold text-text">今月の注意点</h3>
            <p className="text-sm text-text/70 mt-1">
              4月の売上が目標を下回っています。来月の施策検討をお勧めします。
            </p>
            <button className="text-sm text-primary hover:underline mt-2">
              詳しく見る →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 月次売上推移 */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text mb-4">月次売上推移</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" stroke="#333333" />
              <YAxis
                stroke="#333333"
                tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
              />
              <Tooltip
                formatter={(value: number) => [
                  `¥${value.toLocaleString()}`,
                  "",
                ]}
                labelStyle={{ color: "#333333" }}
              />
              <Bar dataKey="target" fill="#B3DBC0" name="目標" />
              <Bar dataKey="actual" fill="#67BACA" name="実際の結果" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 10年ロードマップ進捗 */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text mb-4">
            10年ロードマップ進捗
          </h3>
          <div className="space-y-4">
            {progressData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-text">{item.year}</span>
                  <span className="text-sm text-text/70">
                    ¥{(item.current / 10000).toFixed(0)}万 / ¥
                    {(item.target / 10000).toFixed(0)}万
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-text/70 mt-1">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

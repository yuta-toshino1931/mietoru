import React, { useState } from "react";
import { TrendingUp, AlertCircle, DollarSign } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { userSetup } = useAuth();
  const [viewPeriod, setViewPeriod] = useState<6 | 12>(12);
  const [selectedYear, setSelectedYear] = useState(2024);

  // 現在の年月を取得
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // 事業年度開始月（初期設定から取得、デフォルトは4月）
  const fiscalYearStart = userSetup?.fiscalYearStartMonth || 4;

  // 今月の利益目標と実績
  const currentMonthProfit = 485000;
  const currentMonthProfitTarget = 500000;
  const profitAchievementRate = (
    (currentMonthProfit / currentMonthProfitTarget) *
    100
  ).toFixed(1);

  // サンプルデータ
  const kpiData = [
    {
      title: `${currentYear}年${currentMonth
        .toString()
        .padStart(2, "0")}月の売上`,
      value: "2,350,000",
      change: "+12.5%",
      trend: "up",
      color: "text-success",
    },
    {
      title: "事業の利益",
      value: "485,000",
      change: "+8.2%",
      trend: "up",
      color: "text-success",
    },
    {
      title: "利益達成率（今月）",
      value: `${profitAchievementRate}%`,
      change: "+5.1%",
      trend: "up",
      color: "text-warning",
    },
  ];

  // 月次利益データ（事業年度ベース）
  const generateMonthlyProfitData = () => {
    const months = [];
    const monthNames = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];

    for (let i = 0; i < viewPeriod; i++) {
      const monthIndex = (fiscalYearStart - 1 + i) % 12;
      months.push({
        month: monthNames[monthIndex],
        target: 400000 + i * 10000, // 利益目標
        actual: 350000 + i * 15000, // 利益実績
      });
    }
    return months;
  };

  const monthlyProfitData = generateMonthlyProfitData();

  // 10年ロードマップ進捗（円グラフ用データ）
  const currentAssets = userSetup?.currentAssets || 5000000;
  const targetNetWorth = userSetup?.longTermGoal.targetNetWorth || 50000000;

  // 今年度の進捗（仮の計算）
  const currentYearProgress = Math.min(
    (currentAssets / (targetNetWorth / 10)) * 100,
    100
  );
  const tenYearProgress = Math.min((currentAssets / targetNetWorth) * 100, 100);

  const currentYearData = [
    { name: "達成", value: currentYearProgress, color: "#67BACA" },
    { name: "未達成", value: 100 - currentYearProgress, color: "#E0E0E0" },
  ];

  const tenYearData = [
    { name: "達成", value: tenYearProgress, color: "#67BACA" },
    { name: "未達成", value: 100 - tenYearProgress, color: "#E0E0E0" },
  ];

  const COLORS = ["#67BACA", "#E0E0E0"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text">ダッシュボード</h1>
        <div className="text-sm text-text/70">
          最終更新: 2024年6月15日 10:30
        </div>
      </div>

      {/* KPIカード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className="card bg-blue/5 border-blue/20">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-text">
              今月のワンポイントアドバイス
            </h3>
            <p className="text-sm text-text/70 mt-1">
              【税理士からのコメント】今月の利益率が改善しています。この調子で経費管理を継続し、来月も安定した利益確保を目指しましょう。節税対策のご相談もお気軽にどうぞ。
            </p>
            <button className="text-sm text-primary hover:underline mt-2">
              詳しく見る →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 月次利益推移 */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-text">月次利益推移</h3>
            <div className="flex space-x-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="text-sm border border-border rounded px-2 py-1"
              >
                <option value={2024}>2024年度</option>
                <option value={2023}>2023年度</option>
                <option value={2022}>2022年度</option>
              </select>
              <select
                value={viewPeriod}
                onChange={(e) =>
                  setViewPeriod(Number(e.target.value) as 6 | 12)
                }
                className="text-sm border border-border rounded px-2 py-1"
              >
                <option value={6}>6ヶ月</option>
                <option value={12}>12ヶ月</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyProfitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" stroke="#333333" />
              <YAxis
                stroke="#333333"
                tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
              />
              <Tooltip
                formatter={(value: number) => [
                  `${value.toLocaleString()}円`,
                  "",
                ]}
                labelStyle={{ color: "#333333" }}
              />
              <Bar dataKey="target" fill="#B3DBC0" name="目標" />
              <Bar dataKey="actual" fill="#67BACA" name="実績" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 10年ロードマップ進捗 */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text mb-4">
            10年ロードマップ進捗
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 今年度進捗 */}
            <div>
              <h4 className="text-md font-medium text-text mb-3 text-center">
                今年度目標
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={currentYearData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {currentYearData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center">
                <p className="text-sm text-text/70">
                  {(currentAssets / 10000).toFixed(0)}万 /{" "}
                  {(targetNetWorth / 10 / 10000).toFixed(0)}万
                </p>
                <p className="text-lg font-bold text-primary">
                  {currentYearProgress.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* 10年進捗 */}
            <div>
              <h4 className="text-md font-medium text-text mb-3 text-center">
                10年目標
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={tenYearData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {tenYearData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center">
                <p className="text-sm text-text/70">
                  {(currentAssets / 10000).toFixed(0)}万 /{" "}
                  {(targetNetWorth / 10000).toFixed(0)}万
                </p>
                <p className="text-lg font-bold text-primary">
                  {tenYearProgress.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* 凡例 */}
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-text/70">達成</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-text/70">未達成</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

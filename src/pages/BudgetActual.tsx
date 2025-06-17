import React, { useState } from "react";
import { Upload, Download, Save, RefreshCw } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

interface MonthlyData {
  month: string;
  target: number;
  actual: number;
  profit: number;
  profitTarget: number;
}

const BudgetActual: React.FC = () => {
  const { userSetup } = useAuth();
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [actualRevenue, setActualRevenue] = useState(2350000);
  const [actualProfit, setActualProfit] = useState(485000);
  const [viewPeriod, setViewPeriod] = useState<6 | 12>(12);

  // 事業年度開始月（初期設定から取得、デフォルトは4月）
  const fiscalYearStart = userSetup?.fiscalYearStartMonth || 4;

  // 月次データ（事業年度ベース）
  const generateMonthlyData = () => {
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
        target: 2000000 + i * 100000,
        actual: 1850000 + i * 120000,
        profit: 370000 + i * 15000,
        profitTarget: 400000 + i * 10000,
      });
    }
    return months;
  };

  const monthlyData = generateMonthlyData();

  const kpiData = [
    { title: "売上達成率", value: "94.0%", status: "warning" },
    { title: "利益達成率", value: "97.0%", status: "success" },
    { title: "前年同月比", value: "+15.2%", status: "success" },
    { title: "累計達成率", value: "102.3%", status: "success" },
  ];

  const handleYoyoImport = () => {
    alert("弥生会計からデータを取得しました。");
  };

  const handleManualSave = () => {
    alert("実績データを保存しました。");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text">予実管理</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleYoyoImport}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>弥生会計から取得</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>CSVアップロード</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>データ出力</span>
          </button>
        </div>
      </div>

      {/* KPI達成状況 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="card">
            <div className="text-center">
              <p className="text-sm text-text/70">{kpi.title}</p>
              <p className="text-2xl font-bold text-text mt-1">{kpi.value}</p>
              <div
                className={`inline-flex px-2 py-1 rounded-full text-xs mt-2 ${
                  kpi.status === "success"
                    ? "bg-success/10 text-success"
                    : kpi.status === "warning"
                    ? "bg-warning/10 text-warning"
                    : "bg-error/10 text-error"
                }`}
              >
                {kpi.status === "success"
                  ? "目標達成"
                  : kpi.status === "warning"
                  ? "要注意"
                  : "未達成"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 実績入力フォーム */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text mb-4">月次実績入力</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-text/70 mb-1">年</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="input-field w-full"
                >
                  <option value={2024}>2024年</option>
                  <option value={2023}>2023年</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-text/70 mb-1">月</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="input-field w-full"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}月
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-text/70 mb-1">
                売上（円）
              </label>
              <input
                type="number"
                value={actualRevenue}
                onChange={(e) => setActualRevenue(Number(e.target.value))}
                className="input-field w-full"
                placeholder="実際の売上を入力"
              />
            </div>

            <div>
              <label className="block text-sm text-text/70 mb-1">
                事業の利益（円）
              </label>
              <input
                type="number"
                value={actualProfit}
                onChange={(e) => setActualProfit(Number(e.target.value))}
                className="input-field w-full"
                placeholder="実際の利益を入力"
              />
            </div>

            <button
              onClick={handleManualSave}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>実績を保存</span>
            </button>
          </div>

          {/* 弥生会計連携設定 */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium text-text mb-3">弥生会計連携</h4>
            <div className="text-sm text-text/70 mb-3">
              連携状況: <span className="text-success">接続済み</span>
            </div>
            <button className="text-sm text-primary hover:underline">
              連携設定を変更
            </button>
          </div>
        </div>

        {/* 予実比較グラフ */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text">売上実績推移</h3>
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
              <BarChart data={monthlyData}>
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

          <div className="card">
            <h3 className="text-lg font-semibold text-text mb-4">
              月次利益推移
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
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
                <Bar dataKey="profitTarget" fill="#B3DBC0" name="目標" />
                <Bar dataKey="profit" fill="#67BACA" name="実績" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 詳細比較表 */}
      <div className="card">
        <h3 className="text-lg font-semibold text-text mb-4">詳細比較表</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2">月</th>
                <th className="text-right py-3 px-2">売上目標</th>
                <th className="text-right py-3 px-2">売上実績</th>
                <th className="text-right py-3 px-2">売上達成率</th>
                <th className="text-right py-3 px-2">利益目標</th>
                <th className="text-right py-3 px-2">利益実績</th>
                <th className="text-right py-3 px-2">利益達成率</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => {
                const revenueRate = ((data.actual / data.target) * 100).toFixed(
                  1
                );
                const profitRate = (
                  (data.profit / data.profitTarget) *
                  100
                ).toFixed(1);
                return (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-2 font-medium">{data.month}</td>
                    <td className="py-3 px-2 text-right">
                      {data.target.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right">
                      {data.actual.toLocaleString()}
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-medium ${
                        Number(revenueRate) >= 100
                          ? "text-success"
                          : Number(revenueRate) >= 90
                          ? "text-warning"
                          : "text-error"
                      }`}
                    >
                      {revenueRate}%
                    </td>
                    <td className="py-3 px-2 text-right">
                      {data.profitTarget.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right">
                      {data.profit.toLocaleString()}
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-medium ${
                        Number(profitRate) >= 100
                          ? "text-success"
                          : Number(profitRate) >= 90
                          ? "text-warning"
                          : "text-error"
                      }`}
                    >
                      {profitRate}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetActual;

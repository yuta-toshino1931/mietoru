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

interface MonthlyData {
  month: string;
  target: number;
  actual: number;
  profit: number;
  profitTarget: number;
}

const BudgetActual: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [actualRevenue, setActualRevenue] = useState(2350000);
  const [actualProfit, setActualProfit] = useState(485000);

  const monthlyData: MonthlyData[] = [
    {
      month: "1月",
      target: 2000000,
      actual: 1850000,
      profit: 370000,
      profitTarget: 400000,
    },
    {
      month: "2月",
      target: 2100000,
      actual: 2050000,
      profit: 410000,
      profitTarget: 420000,
    },
    {
      month: "3月",
      target: 2200000,
      actual: 2350000,
      profit: 470000,
      profitTarget: 440000,
    },
    {
      month: "4月",
      target: 2300000,
      actual: 2180000,
      profit: 436000,
      profitTarget: 460000,
    },
    {
      month: "5月",
      target: 2400000,
      actual: 2520000,
      profit: 504000,
      profitTarget: 480000,
    },
    {
      month: "6月",
      target: 2500000,
      actual: 2350000,
      profit: 485000,
      profitTarget: 500000,
    },
  ];

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
            <h3 className="text-lg font-semibold text-text mb-4">
              月次売上 目標vs実際の結果
            </h3>
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

          <div className="card">
            <h3 className="text-lg font-semibold text-text mb-4">利益推移</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
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
                <Line
                  type="monotone"
                  dataKey="profitTarget"
                  stroke="#B3DBC0"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="目標利益"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#67BACA"
                  strokeWidth={3}
                  dot={{ fill: "#67BACA", strokeWidth: 2, r: 4 }}
                  name="実際の利益"
                />
              </LineChart>
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
                <th className="text-right py-3 px-2">売上実際</th>
                <th className="text-right py-3 px-2">売上達成率</th>
                <th className="text-right py-3 px-2">利益目標</th>
                <th className="text-right py-3 px-2">利益実際</th>
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
                      ¥{data.target.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right">
                      ¥{data.actual.toLocaleString()}
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
                      ¥{data.profitTarget.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right">
                      ¥{data.profit.toLocaleString()}
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

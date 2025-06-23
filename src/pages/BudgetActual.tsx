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
  Legend,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

const BudgetActual: React.FC = () => {
  const { userSetup } = useAuth();
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [actualRevenue, setActualRevenue] = useState(2350000);
  const [actualProfit, setActualProfit] = useState(485000);
  const [viewPeriod, setViewPeriod] = useState<6 | 12>(12);
  const [activeChart, setActiveChart] = useState<"revenue" | "profit">(
    "revenue"
  );
  const [editingCell, setEditingCell] = useState<string | null>(null);

  // 事業年度開始月（初期設定から取得、デフォルトは4月）
  const fiscalYearStart = userSetup?.fiscalYearStartMonth || 4;

  // 月次データ（事業年度ベース）- 編集可能な状態で管理
  const [monthlyData, setMonthlyData] = useState(() => {
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

    for (let i = 0; i < 12; i++) {
      const monthIndex = (fiscalYearStart - 1 + i) % 12;
      months.push({
        id: i,
        month: monthNames[monthIndex],
        target: 2000000 + i * 100000,
        actual: 1850000 + i * 120000,
        profit: 370000 + i * 15000,
        profitTarget: 400000 + i * 10000,
      });
    }
    return months;
  });

  // 表示期間に応じてデータをフィルタリング
  const getDisplayData = () => {
    return monthlyData.slice(0, viewPeriod);
  };

  // セルの値を更新
  const handleCellUpdate = (
    id: number,
    field: "target" | "profitTarget",
    value: number
  ) => {
    setMonthlyData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    setEditingCell(null);
  };

  // セルのダブルクリック処理
  const handleCellDoubleClick = (
    id: number,
    field: "target" | "profitTarget"
  ) => {
    setEditingCell(`${id}-${field}`);
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-text">予実管理</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={handleYoyoImport}
            className="btn-secondary flex items-center justify-center space-x-2 text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">弥生会計から取得</span>
            <span className="sm:hidden">弥生取得</span>
          </button>
          <button className="btn-secondary flex items-center justify-center space-x-2 text-sm">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">CSVアップロード</span>
            <span className="sm:hidden">CSV</span>
          </button>
          <button className="btn-secondary flex items-center justify-center space-x-2 text-sm">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">データ出力</span>
            <span className="sm:hidden">出力</span>
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 実績入力フォーム */}
        <div className="card">
          <h3 className="text-base sm:text-lg font-semibold text-text mb-4">
            月次実績入力
          </h3>
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
        <div className="xl:col-span-2 space-y-6">
          <div className="card">
            {/* グラフ切り替えボタン */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setActiveChart("revenue")}
                  className={`px-4 py-2 rounded transition-colors ${
                    activeChart === "revenue"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  売上実績推移
                </button>
                <button
                  onClick={() => setActiveChart("profit")}
                  className={`px-4 py-2 rounded transition-colors ${
                    activeChart === "profit"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  月次利益推移
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="text-sm border border-border rounded px-2 py-1 pr-8 appearance-none bg-white"
                  style={{
                    backgroundImage:
                      'url(\'data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "calc(100% - 4px) center",
                    backgroundSize: "16px",
                  }}
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
                  className="text-sm border border-border rounded px-2 py-1 pr-8 appearance-none bg-white"
                  style={{
                    backgroundImage:
                      'url(\'data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "calc(100% - 4px) center",
                    backgroundSize: "16px",
                  }}
                >
                  <option value={6}>6ヶ月</option>
                  <option value={12}>12ヶ月</option>
                </select>
              </div>
            </div>

            {/* 売上実績推移グラフ */}
            {activeChart === "revenue" && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getDisplayData()}>
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
                  <Legend />
                  <Bar dataKey="target" fill="#B3DBC0" name="目標" />
                  <Bar dataKey="actual" fill="#67BACA" name="実績" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* 月次利益推移グラフ */}
            {activeChart === "profit" && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getDisplayData()}>
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
                  <Legend />
                  <Bar dataKey="profitTarget" fill="#B3DBC0" name="目標" />
                  <Bar dataKey="profit" fill="#67BACA" name="実績" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* 詳細比較表 */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-text">
            詳細比較表
          </h3>
          <div className="text-xs sm:text-sm text-text/70">
            💡 売上目標・利益目標をダブルクリックで編集できます
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 sm:py-3 px-1 sm:px-2">月</th>
                <th className="text-right py-2 sm:py-3 px-1 sm:px-2 whitespace-nowrap">
                  売上目標
                </th>
                <th className="text-right py-2 sm:py-3 px-1 sm:px-2 whitespace-nowrap">
                  売上実績
                </th>
                <th className="text-right py-2 sm:py-3 px-1 sm:px-2 whitespace-nowrap">
                  売上達成率
                </th>
                <th className="text-right py-2 sm:py-3 px-1 sm:px-2 whitespace-nowrap">
                  利益目標
                </th>
                <th className="text-right py-2 sm:py-3 px-1 sm:px-2 whitespace-nowrap">
                  利益実績
                </th>
                <th className="text-right py-2 sm:py-3 px-1 sm:px-2 whitespace-nowrap">
                  利益達成率
                </th>
              </tr>
            </thead>
            <tbody>
              {getDisplayData().map((data) => {
                const revenueRate = ((data.actual / data.target) * 100).toFixed(
                  1
                );
                const profitRate = (
                  (data.profit / data.profitTarget) *
                  100
                ).toFixed(1);
                return (
                  <tr key={data.id} className="border-b border-border/50">
                    <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium">
                      {data.month}
                    </td>
                    <td
                      className="py-2 sm:py-3 px-1 sm:px-2 text-right cursor-pointer hover:bg-blue-50 transition-colors"
                      onDoubleClick={() =>
                        handleCellDoubleClick(data.id, "target")
                      }
                      title="ダブルクリックで編集"
                    >
                      {editingCell === `${data.id}-target` ? (
                        <input
                          type="number"
                          defaultValue={data.target}
                          onBlur={(e) =>
                            handleCellUpdate(
                              data.id,
                              "target",
                              Number(e.target.value)
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleCellUpdate(
                                data.id,
                                "target",
                                Number(e.currentTarget.value)
                              );
                            } else if (e.key === "Escape") {
                              setEditingCell(null);
                            }
                          }}
                          className="w-full text-right border border-primary rounded px-1 focus:outline-none focus:ring-1 focus:ring-primary"
                          autoFocus
                        />
                      ) : (
                        data.target.toLocaleString()
                      )}
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 text-right">
                      {data.actual.toLocaleString()}
                    </td>
                    <td
                      className={`py-2 sm:py-3 px-1 sm:px-2 text-right font-medium ${
                        Number(revenueRate) >= 100
                          ? "text-success"
                          : Number(revenueRate) >= 90
                          ? "text-warning"
                          : "text-error"
                      }`}
                    >
                      {revenueRate}%
                    </td>
                    <td
                      className="py-2 sm:py-3 px-1 sm:px-2 text-right cursor-pointer hover:bg-blue-50 transition-colors"
                      onDoubleClick={() =>
                        handleCellDoubleClick(data.id, "profitTarget")
                      }
                      title="ダブルクリックで編集"
                    >
                      {editingCell === `${data.id}-profitTarget` ? (
                        <input
                          type="number"
                          defaultValue={data.profitTarget}
                          onBlur={(e) =>
                            handleCellUpdate(
                              data.id,
                              "profitTarget",
                              Number(e.target.value)
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleCellUpdate(
                                data.id,
                                "profitTarget",
                                Number(e.currentTarget.value)
                              );
                            } else if (e.key === "Escape") {
                              setEditingCell(null);
                            }
                          }}
                          className="w-full text-right border border-primary rounded px-1 focus:outline-none focus:ring-1 focus:ring-primary"
                          autoFocus
                        />
                      ) : (
                        data.profitTarget.toLocaleString()
                      )}
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 text-right">
                      {data.profit.toLocaleString()}
                    </td>
                    <td
                      className={`py-2 sm:py-3 px-1 sm:px-2 text-right font-medium ${
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

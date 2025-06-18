import React, { useState } from "react";
import { Save, Calculator, MapPin, Navigation } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

interface YearlyTarget {
  year: number;
  netWorth: number; // 純資産
  revenue: number; // 売上
  profit: number; // 事業の利益
  employees: number;
  phase: string;
}

interface MonthlyProgress {
  month: number;
  year: number;
  phase: string;
  phaseColor: string;
  targetNetWorth: number;
  actualNetWorth: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

// 歩く棒人間のSVGコンポーネント
const WalkingStickFigure: React.FC<{ isWalking: boolean }> = ({
  isWalking,
}) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    className={`transition-transform duration-500 ${
      isWalking ? "animate-bounce" : ""
    }`}
  >
    {/* 頭 */}
    <circle
      cx="12"
      cy="5"
      r="2"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* 体 */}
    <line
      x1="12"
      y1="7"
      x2="12"
      y2="15"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* 腕（歩いているアニメーション） */}
    <g className={isWalking ? "animate-pulse" : ""}>
      <line
        x1="12"
        y1="9"
        x2="9"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="12"
        y1="9"
        x2="15"
        y2="11"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </g>

    {/* 脚（歩いているアニメーション） */}
    <g className={isWalking ? "animate-pulse" : ""}>
      <line
        x1="12"
        y1="15"
        x2="9"
        y2="19"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="12"
        y1="15"
        x2="15"
        y2="19"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

const Roadmap: React.FC = () => {
  const { userSetup } = useAuth();

  // 初期設定から初期従業員数を取得
  const initialEmployees = userSetup?.employeeCount || 1;

  const [targets, setTargets] = useState<YearlyTarget[]>([
    {
      year: 1,
      netWorth: 5000000,
      revenue: 10000000, // 1000万円
      profit: 2000000, // 200万円以上
      employees: initialEmployees,
      phase: "創業期",
    },
    {
      year: 2,
      netWorth: 7000000,
      revenue: 12000000, // 1200万円
      profit: 2000000, // 200万円以上
      employees: initialEmployees + 1,
      phase: "創業期",
    },
    {
      year: 3,
      netWorth: 10000000,
      revenue: 15000000, // 1500万円
      profit: 2000000, // 200万円以上
      employees: initialEmployees + 2,
      phase: "創業期",
    },
    {
      year: 4,
      netWorth: 15000000,
      revenue: 18000000, // 1800万円
      profit: 2000000, // 200万円以上
      employees: initialEmployees + 3,
      phase: "転換期",
    },
    {
      year: 5,
      netWorth: 20000000,
      revenue: 22000000, // 2200万円
      profit: 2000000, // 200万円以上
      employees: initialEmployees + 4,
      phase: "転換期",
    },
    {
      year: 6,
      netWorth: 26000000,
      revenue: 30000000, // 3000万円
      profit: 8000000, // 800万円以上
      employees: initialEmployees + 6,
      phase: "成長期",
    },
    {
      year: 7,
      netWorth: 32000000,
      revenue: 35000000, // 3500万円
      profit: 8000000, // 800万円以上
      employees: initialEmployees + 8,
      phase: "成長期",
    },
    {
      year: 8,
      netWorth: 38000000,
      revenue: 40000000, // 4000万円
      profit: 8000000, // 800万円以上
      employees: initialEmployees + 10,
      phase: "成長期",
    },
    {
      year: 9,
      netWorth: 44000000,
      revenue: 45000000, // 4500万円
      profit: 8000000, // 800万円以上
      employees: initialEmployees + 12,
      phase: "成長期",
    },
    {
      year: 10,
      netWorth: 50000000, // 5000万円の目標
      revenue: 50000000, // 5000万円
      profit: 8000000, // 800万円以上
      employees: initialEmployees + 15,
      phase: "成長期",
    },
  ]);

  const phases = [
    { name: "創業期", years: "1年目〜3年目", profitTarget: "200万円/年" },
    { name: "転換期", years: "4年目〜5年目", profitTarget: "200万円/年" },
    { name: "成長期", years: "6年目〜10年目", profitTarget: "800万円/年" },
  ];

  // 月次進捗データを生成
  const generateMonthlyProgress = (): MonthlyProgress[] => {
    const monthlyData: MonthlyProgress[] = [];
    const currentAssets = userSetup?.currentAssets || 5000000;

    for (let year = 1; year <= 10; year++) {
      const yearTarget = targets[year - 1];
      const prevYearTarget =
        year > 1 ? targets[year - 2] : { netWorth: currentAssets };

      for (let month = 1; month <= 12; month++) {
        const totalMonths = (year - 1) * 12 + month;
        const monthsSinceStart = 18; // 仮の現在進捗（18ヶ月経過として設定）

        // 各月の目標純資産を線形補間で計算
        const monthProgress = month / 12;
        const targetNetWorth =
          prevYearTarget.netWorth +
          (yearTarget.netWorth - prevYearTarget.netWorth) * monthProgress;

        // 実績純資産（仮の進捗データ）
        const progressRate = Math.min(monthsSinceStart / totalMonths, 1);
        const actualNetWorth =
          currentAssets +
          (targetNetWorth - currentAssets) * progressRate * 0.85; // 85%の進捗率と仮定

        // フェーズカラーを設定
        let phaseColor = "#E5E7EB"; // グレー（デフォルト）
        if (yearTarget.phase === "創業期") phaseColor = "#DBEAFE"; // 青
        else if (yearTarget.phase === "転換期") phaseColor = "#FEF3C7"; // 黄
        else if (yearTarget.phase === "成長期") phaseColor = "#D1FAE5"; // 緑

        monthlyData.push({
          month: totalMonths,
          year,
          phase: yearTarget.phase,
          phaseColor,
          targetNetWorth,
          actualNetWorth,
          isCompleted: totalMonths <= monthsSinceStart,
          isCurrent: totalMonths === monthsSinceStart + 1,
        });
      }
    }

    return monthlyData;
  };

  const monthlyProgress = generateMonthlyProgress();
  const currentMonth = monthlyProgress.find((m) => m.isCurrent);
  const completedMonths = monthlyProgress.filter((m) => m.isCompleted).length;
  const progressPercentage = (completedMonths / 120) * 100;

  const handleTargetChange = (
    year: number,
    field: keyof YearlyTarget,
    value: string | number
  ) => {
    setTargets((prev) =>
      prev.map((target) =>
        target.year === year ? { ...target, [field]: value } : target
      )
    );
  };

  const runGoalReset = () => {
    // 目標再設定ロジック（実際の実装では複雑な計算を行う）
    alert("目標を再設定しました。");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Navigation className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text">
            ロードマップナビゲーション
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={runGoalReset}
            className="btn-secondary flex items-center justify-center space-x-2 text-sm"
          >
            <Calculator className="h-4 w-4" />
            <span>目標再設定</span>
          </button>
          <button className="btn-primary flex items-center justify-center space-x-2 text-sm">
            <Save className="h-4 w-4" />
            <span>保存</span>
          </button>
        </div>
      </div>

      {/* 10年進捗可視化カード - カーナビ風 */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-center space-x-2 mb-4">
          <Navigation className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <h3 className="text-base sm:text-lg font-semibold text-text">
            事業成長ナビゲーション
          </h3>
        </div>

        {/* 現在地と目的地の表示 */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                現在地
              </span>
            </div>
            {currentMonth && (
              <p className="text-base sm:text-lg font-bold text-primary">
                {currentMonth.year}年目 {((currentMonth.month - 1) % 12) + 1}
                ヶ月目
              </p>
            )}
            <p className="text-xs sm:text-sm text-gray-600">
              {currentMonth?.phase}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <MapPin className="h-3 w-3 text-red-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                目的地
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-red-600">
              10年目
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              純資産 5,000万円達成
            </p>
          </div>
        </div>

        {/* 進捗サマリー */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <span className="text-xs sm:text-sm text-text/70">
            📍 進捗状況: {completedMonths}ヶ月 / 120ヶ月
          </span>
          <span className="text-xs sm:text-sm font-medium text-primary bg-white px-2 py-1 rounded-full self-start sm:self-auto">
            {progressPercentage.toFixed(1)}%
          </span>
        </div>

        {/* 月次進捗の可視化 - 道路風デザイン */}
        <div className="relative">
          {/* 道路風進捗トラック */}
          <div className="relative bg-gray-800 rounded-lg p-2 sm:p-4 shadow-inner overflow-scroll overflow-y-clip">
            <div
              className="flex items-center relative"
              style={{ minWidth: "600px" }}
            >
              {/* 月次進捗バー */}
              <div className="flex-1 flex relative z-10">
                {monthlyProgress.map((month, index) => {
                  const isYearStart = month.month % 12 === 1;

                  return (
                    <div
                      key={index}
                      className="relative flex-1 h-8 sm:h-12 flex items-center"
                      style={{ minWidth: "4px" }}
                    >
                      {/* 進捗状態（道路上のマーカー） */}
                      <div
                        className={`w-full h-2 sm:h-3 mx-0.5 rounded-sm transition-all duration-300 shadow-sm ${
                          month.isCompleted
                            ? "bg-green-400 shadow-green-300"
                            : month.isCurrent
                            ? "bg-yellow-400 shadow-yellow-300 animate-pulse"
                            : "bg-gray-500 opacity-50"
                        }`}
                      />
                      {/* 年度区切り線 */}
                      {isYearStart && index > 0 && (
                        <div className="absolute left-0 top-0.5 sm:top-1 bottom-0.5 sm:bottom-1 w-0.5 sm:w-1 bg-yellow-400 rounded-full shadow-md"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 歩く棒人間（現在位置） */}
              {currentMonth && (
                <div
                  className="absolute flex items-center justify-center z-20 transition-all duration-1000"
                  style={{
                    right: `${100 - (currentMonth.month / 120) * 100}%`,
                    top: "50%",
                    marginTop: "-12px",
                  }}
                >
                  <div className="bg-primary text-white rounded-full p-1 sm:p-2 shadow-lg border border-white sm:border-2">
                    <div className="w-4 h-4 sm:w-6 sm:h-6">
                      <WalkingStickFigure isWalking={true} />
                    </div>
                  </div>
                  {/* 現在位置の光る効果 */}
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
                </div>
              )}

              {/* ゴール地点 */}
              <div
                className="absolute flex items-center justify-center z-20"
                style={{
                  right: "0%",
                  top: "50%",
                  marginTop: "-12px",
                }}
              >
                <div className="bg-red-500 text-white rounded-full p-1 sm:p-2 shadow-lg border border-white sm:border-2 animate-bounce">
                  <MapPin className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* 現在の状況表示 - カーナビ風 */}
          {currentMonth && (
            <div className="mt-4 bg-white rounded-lg shadow-md border">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 sm:px-4 py-2 rounded-t-lg">
                <h4 className="text-sm sm:text-base font-medium flex items-center space-x-2">
                  <Navigation className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>現在の運行状況</span>
                </h4>
              </div>
              <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text/70">📍 進捗期間</span>
                    <span className="font-medium">
                      {currentMonth.year}年目{" "}
                      {((currentMonth.month - 1) % 12) + 1}ヶ月目
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text/70">🏃 現在フェーズ</span>
                    <span className="font-medium text-primary">
                      {currentMonth.phase}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text/70">🎯 目標純資産</span>
                    <span className="font-medium">
                      {(currentMonth.targetNetWorth / 10000).toFixed(0)}万円
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text/70">💰 現在純資産</span>
                    <span className="font-medium text-green-600">
                      {(currentMonth.actualNetWorth / 10000).toFixed(0)}万円
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 設定フォーム */}
        <div className="card">
          <h3 className="text-base sm:text-lg font-semibold text-text mb-4">
            10年間の目標設定
          </h3>
          <div className="space-y-4 max-h-96 sm:max-h-dvh overflow-y-auto">
            {targets.map((target) => (
              <div
                key={target.year}
                className="border border-border rounded-lg p-3 sm:p-4"
              >
                <h4 className="text-sm sm:text-base font-medium text-text mb-3">
                  {target.year}年目
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm text-text/70 mb-1">
                      純資産（万円）
                    </label>
                    <input
                      type="number"
                      value={target.netWorth / 10000}
                      onChange={(e) =>
                        handleTargetChange(
                          target.year,
                          "netWorth",
                          Number(e.target.value) * 10000
                        )
                      }
                      className="input-field w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-text/70 mb-1">
                      売上（万円）
                    </label>
                    <input
                      type="number"
                      value={target.revenue / 10000}
                      onChange={(e) =>
                        handleTargetChange(
                          target.year,
                          "revenue",
                          Number(e.target.value) * 10000
                        )
                      }
                      className="input-field w-full text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm text-text/70 mb-1">
                      事業の利益（万円）
                    </label>
                    <input
                      type="number"
                      value={target.profit / 10000}
                      onChange={(e) =>
                        handleTargetChange(
                          target.year,
                          "profit",
                          Number(e.target.value) * 10000
                        )
                      }
                      className="input-field w-full text-sm"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xs sm:text-sm text-text/70">
                    事業フェーズ:{" "}
                    <span className="font-medium text-text">
                      {target.phase}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 可視化エリア */}
        <div className="space-y-6">
          {/* 純資産推移グラフ */}
          <div className="card">
            <h3 className="text-base sm:text-lg font-semibold text-text mb-4">
              純資産推移予測
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={targets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="year" stroke="#333333" />
                <YAxis
                  stroke="#333333"
                  domain={[0, 50000000]} // 5000万円をMAXに設定
                  tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `${(value / 10000).toLocaleString()}万円`,
                    "",
                  ]}
                  labelStyle={{ color: "#333333" }}
                />
                <Line
                  type="monotone"
                  dataKey="netWorth"
                  stroke="#67BACA"
                  strokeWidth={3}
                  dot={{ fill: "#67BACA", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 事業フェーズ概要 */}
          <div className="card">
            <h3 className="text-base sm:text-lg font-semibold text-text mb-4">
              事業フェーズ概要
            </h3>
            <div className="space-y-3">
              {phases.map((phase, _) => (
                <div key={phase.name} className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text">
                        {phase.name}
                      </span>
                      <span className="text-sm text-text/70">
                        ({phase.years})
                      </span>
                    </div>
                    <p className="text-sm text-text/60">
                      目標 事業の利益{phase.profitTarget}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;

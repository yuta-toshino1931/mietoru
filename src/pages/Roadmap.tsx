import React, { useState, useEffect } from "react";
import { Save, Calculator, Navigation } from "lucide-react";
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

const Roadmap: React.FC = () => {
  const { userSetup } = useAuth();

  // 初期設定から初期従業員数を取得
  const initialEmployees = userSetup?.employeeCount || 1;

  // アニメーション用の状態
  const [yearlyProgress, setYearlyProgress] = useState(0);
  const [tenYearProgress, setTenYearProgress] = useState(0);

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

  // アニメーション効果
  useEffect(() => {
    const targetYearlyProgress = 25.0;
    const targetTenYearProgress = 10.0;

    const yearlyTimer = setTimeout(() => {
      let progress = 0;
      const yearlyInterval = setInterval(() => {
        progress += 1;
        setYearlyProgress(progress);
        if (progress >= targetYearlyProgress) {
          clearInterval(yearlyInterval);
        }
      }, 20);
    }, 300);

    const tenYearTimer = setTimeout(() => {
      let progress = 0;
      const tenYearInterval = setInterval(() => {
        progress += 0.5;
        setTenYearProgress(progress);
        if (progress >= targetTenYearProgress) {
          clearInterval(tenYearInterval);
        }
      }, 40);
    }, 800);

    return () => {
      clearTimeout(yearlyTimer);
      clearTimeout(tenYearTimer);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Navigation className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text">
            ロードマップ設定
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

      {/* 10年ロードマップ進捗 */}
      <div className="card">
        <h3 className="text-base sm:text-lg font-semibold text-text mb-4">
          10年ロードマップ進捗
        </h3>
        <div className="mb-6 text-center">
          <p className="text-sm sm:text-base text-text/80 leading-relaxed">
            10年間で純資産5000万円を目指すロードマップを作成します。
            <br />
            １年ごとの目標をご提案します。
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* 今年度進捗 */}
          <div>
            <h4 className="text-md font-medium text-text mb-3 text-center">
              今年度目標
            </h4>
            <div className="w-full h-48 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E0E0E0"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#67BACA"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(yearlyProgress * 251.2) / 100} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {yearlyProgress.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">今年度進捗</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-text/70">500万 / 2000万</p>
            </div>
          </div>

          {/* 10年進捗 */}
          <div>
            <h4 className="text-md font-medium text-text mb-3 text-center">
              10年目標
            </h4>
            <div className="w-full h-48 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E0E0E0"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#67BACA"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(tenYearProgress * 251.2) / 100} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {tenYearProgress.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">10年進捗</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-text/70">500万 / 5000万</p>
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

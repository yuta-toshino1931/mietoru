import React, { useState } from "react";
import { Save, Calculator } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface YearlyTarget {
  year: number;
  revenue: number;
  profit: number;
  employees: number;
  phase: string;
}

const Roadmap: React.FC = () => {
  const [targets, setTargets] = useState<YearlyTarget[]>([
    {
      year: 1,
      revenue: 30000000,
      profit: 3000000,
      employees: 3,
      phase: "創業期",
    },
    {
      year: 2,
      revenue: 50000000,
      profit: 7500000,
      employees: 5,
      phase: "創業期",
    },
    {
      year: 3,
      revenue: 80000000,
      profit: 16000000,
      employees: 8,
      phase: "成長期",
    },
    {
      year: 4,
      revenue: 120000000,
      profit: 30000000,
      employees: 12,
      phase: "成長期",
    },
    {
      year: 5,
      revenue: 180000000,
      profit: 45000000,
      employees: 18,
      phase: "成長期",
    },
    {
      year: 6,
      revenue: 250000000,
      profit: 62500000,
      employees: 25,
      phase: "拡大期",
    },
    {
      year: 7,
      revenue: 320000000,
      profit: 80000000,
      employees: 32,
      phase: "拡大期",
    },
    {
      year: 8,
      revenue: 400000000,
      profit: 100000000,
      employees: 40,
      phase: "拡大期",
    },
    {
      year: 9,
      revenue: 480000000,
      profit: 120000000,
      employees: 48,
      phase: "安定期",
    },
    {
      year: 10,
      revenue: 500000000,
      profit: 125000000,
      employees: 50,
      phase: "安定期",
    },
  ]);

  const phases = ["創業期", "成長期", "拡大期", "安定期"];

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

  const runSimulation = () => {
    // シミュレーションロジック（実際の実装では複雑な計算を行う）
    alert("シミュレーションが完了しました。KPIが自動設定されました。");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text">ロードマップ設定</h1>
        <div className="flex space-x-3">
          <button
            onClick={runSimulation}
            className="btn-secondary flex items-center space-x-2"
          >
            <Calculator className="h-4 w-4" />
            <span>シミュレーション実行</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>保存</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 設定フォーム */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text mb-4">
            10年間の目標設定
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {targets.map((target) => (
              <div
                key={target.year}
                className="border border-border rounded-lg p-4"
              >
                <h4 className="font-medium text-text mb-3">
                  {target.year}年目
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-text/70 mb-1">
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
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text/70 mb-1">
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
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text/70 mb-1">
                      従業員数（人）
                    </label>
                    <input
                      type="number"
                      value={target.employees}
                      onChange={(e) =>
                        handleTargetChange(
                          target.year,
                          "employees",
                          Number(e.target.value)
                        )
                      }
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text/70 mb-1">
                      事業フェーズ
                    </label>
                    <select
                      value={target.phase}
                      onChange={(e) =>
                        handleTargetChange(target.year, "phase", e.target.value)
                      }
                      className="input-field w-full"
                    >
                      {phases.map((phase) => (
                        <option key={phase} value={phase}>
                          {phase}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 可視化エリア */}
        <div className="space-y-6">
          {/* 売上推移グラフ */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text mb-4">
              売上推移予測
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={targets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="year" stroke="#333333" />
                <YAxis
                  stroke="#333333"
                  tickFormatter={(value) =>
                    `¥${(value / 100000000).toFixed(1)}億`
                  }
                />
                <Tooltip
                  formatter={(value: number) => [
                    `¥${(value / 10000).toLocaleString()}万`,
                    "",
                  ]}
                  labelStyle={{ color: "#333333" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#67BACA"
                  strokeWidth={3}
                  dot={{ fill: "#67BACA", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 事業フェーズ概要 */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text mb-4">
              事業フェーズ概要
            </h3>
            <div className="space-y-3">
              {phases.map((phase, index) => {
                const phaseYears = targets.filter((t) => t.phase === phase);
                const startYear = Math.min(...phaseYears.map((t) => t.year));
                const endYear = Math.max(...phaseYears.map((t) => t.year));
                return (
                  <div key={phase} className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        index === 0
                          ? "bg-success"
                          : index === 1
                          ? "bg-info"
                          : index === 2
                          ? "bg-warning"
                          : "bg-primary"
                      }`}
                    ></div>
                    <div>
                      <span className="font-medium text-text">{phase}</span>
                      <span className="text-sm text-text/70 ml-2">
                        ({startYear}年目〜{endYear}年目)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;

import React, { useState } from "react";
import {
  Save,
  Calculator,
  MapPin,
  Navigation,
  Target,
  CheckCircle2,
} from "lucide-react";
import { FaUserTie } from "react-icons/fa";
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

interface YearGuide {
  year: number;
  milestones: string[];
  todoList: string[];
}

// ビジネスマンアイコンコンポーネント
const BusinessmanIcon: React.FC<{ isWalking: boolean }> = ({ isWalking }) => (
  <FaUserTie
    className={`w-full h-full transition-transform duration-500 ${
      isWalking ? "animate-bounce" : ""
    }`}
  />
);

// 年度別ガイドデータ
const yearlyGuides: YearGuide[] = [
  {
    year: 1,
    milestones: [
      "お金が少しずつ入ってくるようになった",
      "なんとか生活できるくらいにはなった",
    ],
    todoList: [
      "お客さんを見つけよう",
      "月に10万円以上の黒字を目指そう",
      "使ったお金を毎月記録しよう",
    ],
  },
  {
    year: 2,
    milestones: ["月の売上が50万円くらいに安定", "お金の流れがわかってきた"],
    todoList: [
      "無駄な支出を見直そう",
      "お金の使い方に優先順位をつけよう",
      "利益（売上−かかったお金）を20万円以上目指そう",
    ],
  },
  {
    year: 3,
    milestones: [
      "お客さんがリピートしてくれるように",
      "売上が月80万円くらいになる",
    ],
    todoList: [
      "「何が一番もうかるか」見えるようにしよう",
      "人にお願いする仕事を少しずつ増やしてみよう",
    ],
  },
  {
    year: 4,
    milestones: ["月100万円以上の売上が出てきた", "経費をかける余裕もある"],
    todoList: [
      "「手元にいくら残るか」を意識しよう",
      "広告や外注などに使うお金を計画的に",
    ],
  },
  {
    year: 5,
    milestones: ["年間で500万円くらい残るように", "事業がまわり始めている"],
    todoList: [
      "お金の記録をしっかりつけよう",
      "税理士に相談して節税を始めよう",
      "使わないお金は「手元に残す」習慣を",
    ],
  },
  {
    year: 6,
    milestones: ["チームや仲間がいる状態に", "売上以外にも収入が増えてくる"],
    todoList: [
      "毎月の売上が自動で入る仕組みを考えよう",
      "「時間を使わないでも収入がある状態」をつくる",
    ],
  },
  {
    year: 7,
    milestones: [
      "自分が動かなくても収入がある状態",
      "自分の時間に余裕ができてきた",
    ],
    todoList: [
      "お金を「使う・守る・ふやす」のバランスを考える",
      "資産（残しておくお金）を運用も検討しよう",
    ],
  },
  {
    year: 8,
    milestones: ["事業も生活も安定している", "将来への備えもできてきた"],
    todoList: [
      "「お金に働いてもらう」方法を学ぼう",
      "投資・資産運用を税理士と相談して始めよう",
    ],
  },
  {
    year: 9,
    milestones: ["自由に働き方を選べるように", "税金や老後の準備も視野に入る"],
    todoList: [
      "ライフプランを見直そう",
      "事業を続ける？売る？次の目標は？と考えよう",
    ],
  },
  {
    year: 10,
    milestones: [
      "夢だった目標が現実に！",
      "好きなことをする時間・お金・自由が手に入った",
    ],
    todoList: [
      "成功パターンをふりかえろう",
      "次の目標を考えよう：家族、趣味、投資、社会貢献など",
    ],
  },
];

// ツールチップコンポーネント
const YearTooltip: React.FC<{
  year: number;
  isVisible: boolean;
  position: { x: number; y: number };
}> = ({ year, isVisible, position }) => {
  const guide = yearlyGuides.find((g) => g.year === year);

  if (!isVisible || !guide) return null;

  return (
    <div
      className="absolute z-30 bg-white rounded-lg shadow-xl border-2 border-primary/20 p-4 w-80 pointer-events-none"
      style={{
        left: position.x,
        top: position.y - 10,
        transform: "translateX(-50%)",
      }}
    >
      <div className="text-center mb-3">
        <h4 className="text-sm font-bold text-primary">{year}年目のガイド</h4>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center space-x-1 mb-2">
            <Target className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-text">この年の目安</span>
          </div>
          <ul className="space-y-1">
            {guide.milestones.map((milestone, index) => (
              <li
                key={index}
                className="text-xs text-text/80 flex items-start space-x-1"
              >
                <span className="text-primary mt-0.5">•</span>
                <span>{milestone}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center space-x-1 mb-2">
            <CheckCircle2 className="h-3 w-3 text-success" />
            <span className="text-xs font-medium text-text">
              やることリスト
            </span>
          </div>
          <ul className="space-y-1">
            {guide.todoList.map((todo, index) => (
              <li
                key={index}
                className="text-xs text-text/80 flex items-start space-x-1"
              >
                <span className="text-success mt-0.5">•</span>
                <span>{todo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Roadmap: React.FC = () => {
  const { userSetup } = useAuth();
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
        if (yearTarget.phase === "創業期") phaseColor = "#E3F2FD"; // 薄いブルー
        else if (yearTarget.phase === "転換期")
          phaseColor = "#F3E5F5"; // 薄いピンク
        else if (yearTarget.phase === "成長期") phaseColor = "#E8F5E8"; // 薄いグリーン

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
                    strokeDasharray={`${(25 * 251.2) / 100} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">25.0%</div>
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
                    strokeDasharray={`${(10 * 251.2) / 100} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">10.0%</div>
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

      {/* 10年進捗可視化カード - カーナビ風 */}
      <div className="card bg-gradient-to-br from-primary/10 to-primary/20 border-2 border-primary/30">
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
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                現在地
              </span>
            </div>
            {currentMonth && (
              <p className="text-base sm:text-lg font-bold text-primary">
                {currentMonth.year}年{((currentMonth.month - 1) % 12) + 1}
                ヶ月目
              </p>
            )}
            <p className="text-xs sm:text-sm text-gray-600">
              {currentMonth?.phase}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <MapPin className="h-3 w-3 text-accent" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                目的地
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-accent">10年目</p>
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
          <div className="relative bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-2 sm:p-4 shadow-inner overflow-scroll overflow-y-clip">
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
                            ? "bg-primary shadow-primary/30"
                            : month.isCurrent
                            ? "bg-warning shadow-warning/30 animate-pulse"
                            : "bg-gray-500 opacity-50"
                        }`}
                      />
                      {/* 年度区切り線 */}
                      {isYearStart && index > 0 && (
                        <div
                          className="absolute left-0 top-0.5 sm:top-1 bottom-0.5 sm:bottom-1 w-0.5 sm:w-1 bg-warning rounded-full shadow-md cursor-pointer hover:w-1 sm:hover:w-2 transition-all duration-200"
                          onMouseEnter={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            setHoveredYear(month.year);
                            setTooltipPosition({
                              x: rect.left + rect.width / 2,
                              y: rect.top - 10,
                            });
                          }}
                          onMouseLeave={() => {
                            setHoveredYear(null);
                          }}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ビジネスマン（現在位置） */}
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
                      <BusinessmanIcon isWalking={true} />
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
                <div className="bg-accent text-white rounded-full p-1 sm:p-2 shadow-lg border border-white sm:border-2 animate-bounce">
                  <MapPin className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* 現在の状況表示 - カーナビ風 */}
          {currentMonth && (
            <div className="mt-4 bg-white rounded-lg shadow-md border">
              <div className="bg-gradient-to-r from-primary to-primary/90 text-white px-3 sm:px-4 py-2 rounded-t-lg">
                <h4 className="text-sm sm:text-base font-medium flex items-center space-x-2">
                  <Navigation className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>現在の運行状況</span>
                </h4>
              </div>
              <div className="p-3 sm:p-4">
                {/* 基本情報 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text/70">📍 進捗期間</span>
                      <span className="font-medium">
                        {currentMonth.year}年
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
                      <span className="font-medium text-primary">
                        {(currentMonth.actualNetWorth / 10000).toFixed(0)}万円
                      </span>
                    </div>
                  </div>
                </div>

                {/* 現在年の目安とやることリスト */}
                {(() => {
                  const currentYearGuide = yearlyGuides.find(
                    (g) => g.year === currentMonth.year
                  );
                  if (!currentYearGuide) return null;

                  return (
                    <div className="border-t border-border pt-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-primary/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-text">
                              この年の目安
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {currentYearGuide.milestones.map(
                              (milestone, index) => (
                                <li
                                  key={index}
                                  className="text-xs text-text/80 flex items-start space-x-2"
                                >
                                  <span className="text-primary mt-1 flex-shrink-0">
                                    •
                                  </span>
                                  <span>{milestone}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <div className="bg-success/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            <span className="text-sm font-medium text-text">
                              やることリスト
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {currentYearGuide.todoList.map((todo, index) => (
                              <li
                                key={index}
                                className="text-xs text-text/80 flex items-start space-x-2"
                              >
                                <span className="text-success mt-1 flex-shrink-0">
                                  •
                                </span>
                                <span>{todo}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ツールチップ */}
          <YearTooltip
            year={hoveredYear || 1}
            isVisible={hoveredYear !== null}
            position={tooltipPosition}
          />
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

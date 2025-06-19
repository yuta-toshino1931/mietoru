import React, { useState } from "react";
import {
  TrendingUp,
  AlertCircle,
  DollarSign,
  CheckCircle,
  Star,
  Trophy,
  Medal,
  Crown,
  Award,
  Navigation,
  MapPin,
  Target,
  CheckCircle2,
} from "lucide-react";

import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Task {
  id: number;
  name: string;
  day: number;
  enabled: boolean;
  completed: boolean;
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

// ビジネスマンアイコンコンポーネント
const BusinessmanIcon: React.FC<{ isWalking: boolean }> = ({ isWalking }) => (
  <FaUserTie
    className={`w-full h-full transition-transform duration-500 ${
      isWalking ? "animate-bounce" : ""
    }`}
  />
);

const Dashboard: React.FC = () => {
  // 今月のタスク（仮データ - 実際は設定画面から取得）
  const [monthlyTasks, setMonthlyTasks] = useState<Task[]>([
    {
      id: 1,
      name: "月次売上の確認と入力",
      day: 5,
      enabled: true,
      completed: true,
    },
    {
      id: 2,
      name: "経費の整理と計上",
      day: 10,
      enabled: true,
      completed: false,
    },
    { id: 3, name: "前月実績の分析", day: 15, enabled: true, completed: false },
    { id: 4, name: "来月の予算計画", day: 20, enabled: true, completed: true },
  ]);

  // 現在の年月を取得
  const currentDate = new Date();
  const currentMonthNumber = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // 今月の利益目標と実績
  const currentMonthProfit = 485000;
  const currentMonthProfitTarget = 500000;
  const profitAchievementRate = (
    (currentMonthProfit / currentMonthProfitTarget) *
    100
  ).toFixed(1);

  // タスクの完了状況
  const completedTasks = monthlyTasks.filter(
    (task) => task.enabled && task.completed
  ).length;
  const totalEnabledTasks = monthlyTasks.filter((task) => task.enabled).length;
  const taskProgress =
    totalEnabledTasks > 0 ? (completedTasks / totalEnabledTasks) * 100 : 0;
  const allTasksCompleted =
    totalEnabledTasks > 0 && completedTasks === totalEnabledTasks;

  // タスクの完了状態を切り替え
  const toggleTask = (id: number) => {
    setMonthlyTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // サンプルデータ
  const kpiData = [
    {
      title: `${currentYear}年${currentMonthNumber
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

  // ロードマップ関連データ
  const generateMonthlyProgress = (): MonthlyProgress[] => {
    const progressData: MonthlyProgress[] = [];
    const phases = ["創業期", "成長期", "拡大期", "安定期"];

    for (let year = 1; year <= 10; year++) {
      for (let month = 1; month <= 12; month++) {
        const totalMonth = (year - 1) * 12 + month;
        const phaseIndex = Math.floor((year - 1) / 2.5);
        const currentPhase = phases[Math.min(phaseIndex, phases.length - 1)];

        progressData.push({
          month: totalMonth,
          year: year,
          phase: currentPhase,
          phaseColor: "#67BACA",
          targetNetWorth: 500000 * year,
          actualNetWorth: 400000 * year,
          isCompleted: totalMonth <= 25, // 仮の進捗
          isCurrent: totalMonth === 25, // 現在位置
        });
      }
    }
    return progressData;
  };

  const monthlyProgress = generateMonthlyProgress();
  const currentMonth = monthlyProgress.find((m) => m.isCurrent);
  const completedMonths = monthlyProgress.filter((m) => m.isCompleted).length;
  const progressPercentage = (completedMonths / 120) * 100;

  // 年次ガイドデータ
  const yearlyGuides = [
    {
      year: 1,
      milestones: [
        "事業基盤の確立",
        "初期顧客の獲得",
        "基本的な収益モデルの構築",
      ],
      todoList: [
        "事業計画の策定",
        "資金調達",
        "チーム編成",
        "マーケティング開始",
      ],
    },
    {
      year: 2,
      milestones: ["安定した収益の確保", "顧客基盤の拡大", "プロダクトの改善"],
      todoList: ["顧客満足度向上", "新規事業の検討", "効率化の推進"],
    },
    {
      year: 3,
      milestones: ["市場での地位確立", "競合優位性の構築", "組織の拡大"],
      todoList: ["人材採用", "システム強化", "品質向上", "ブランド構築"],
    },
    {
      year: 4,
      milestones: ["事業の多角化", "新市場への参入", "技術革新の推進"],
      todoList: ["新サービス開発", "パートナーシップ構築", "研究開発投資"],
    },
    {
      year: 5,
      milestones: ["業界リーダーの地位", "国際展開の開始", "持続可能な成長"],
      todoList: ["海外進出準備", "ESG対応", "デジタル変革", "人材育成"],
    },
    {
      year: 6,
      milestones: ["グローバル展開", "イノベーション創出", "業界標準の確立"],
      todoList: ["国際認証取得", "特許出願", "業界団体参加", "専門人材確保"],
    },
    {
      year: 7,
      milestones: ["市場支配力の強化", "新技術の実用化", "社会貢献活動"],
      todoList: ["M&A検討", "次世代技術投資", "CSR活動拡大", "後継者育成"],
    },
    {
      year: 8,
      milestones: ["持続的競争優位", "エコシステム構築", "業界変革の牽引"],
      todoList: ["プラットフォーム化", "スタートアップ投資", "産学連携"],
    },
    {
      year: 9,
      milestones: [
        "業界の変革者",
        "新しいビジネスモデル",
        "次世代リーダー育成",
      ],
      todoList: ["事業承継準備", "知的財産活用", "業界標準策定参加"],
    },
    {
      year: 10,
      milestones: ["目標純資産達成", "業界レガシー確立", "次世代への継承"],
      todoList: ["資産管理最適化", "継承計画実行", "メンター活動開始"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-text">
          ダッシュボード
        </h1>
        <div className="text-xs sm:text-sm text-text/70">
          最終更新: 2024年6月15日 10:30
        </div>
      </div>

      {/* アラート・通知エリアとタスクエリア */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 今月のタスク */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-text">
              今月のタスク
            </h3>
            {allTasksCompleted && (
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                <span className="text-xs sm:text-sm font-bold">Clear!</span>
              </div>
            )}
          </div>

          {/* タスク進捗バー */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-text/70 mb-1">
              <span>進捗状況</span>
              <span>
                {completedTasks}/{totalEnabledTasks}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  allTasksCompleted ? "bg-yellow-500" : "bg-primary"
                }`}
                style={{ width: `${taskProgress}%` }}
              />
            </div>
          </div>

          {/* タスクリスト */}
          <div className="space-y-2">
            {monthlyTasks
              .filter((task) => task.enabled)
              .map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    task.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-primary"
                    }`}
                  >
                    {task.completed && <CheckCircle className="h-3 w-3" />}
                  </button>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-text"
                      }`}
                    >
                      {task.name}
                    </p>
                    <p className="text-xs text-text/60">毎月{task.day}日</p>
                  </div>
                </div>
              ))}
          </div>

          {allTasksCompleted && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <p className="text-sm font-medium text-yellow-800">
                🎉 今月のタスクがすべて完了しました！
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                お疲れ様でした。順調に事業管理ができています。
              </p>
            </div>
          )}
        </div>

        {/* 今月のワンポイントアドバイス */}
        <div className="card bg-blue/5 border-blue/20">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-text">
                今月のワンポイントアドバイス
              </h3>
              <p className="text-xs sm:text-sm text-text/70 mt-1">
                【税理士からのコメント】今月の利益率が改善しています。この調子で経費管理を継続し、来月も安定した利益確保を目指しましょう。節税対策のご相談もお気軽にどうぞ。
              </p>
              <button className="text-xs sm:text-sm text-primary hover:underline mt-2">
                詳しく見る →
              </button>
            </div>
          </div>
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
                        <div className="absolute left-0 top-0.5 sm:top-1 bottom-0.5 sm:bottom-1 w-0.5 sm:w-1 bg-warning rounded-full shadow-md cursor-pointer hover:w-1 sm:hover:w-2 transition-all duration-200"></div>
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
        </div>
      </div>

      {/* ランキング・表彰情報 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 現在の順位 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-text">
              ランキング・順位
            </h3>
            <Link
              to="/mietoru/ranking"
              className="text-primary hover:underline text-sm"
            >
              詳しく見る →
            </Link>
          </div>

          <div className="space-y-4">
            {/* 総合順位 */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg">
              <div className="flex items-center space-x-3">
                <Trophy className="h-6 w-6" />
                <div>
                  <p className="text-sm opacity-90">総合順位</p>
                  <p className="text-xl font-bold">#15</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-80">1,247社中</p>
                <p className="text-sm font-semibold">上位 1.2%</p>
              </div>
            </div>

            {/* カテゴリー別順位 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 p-2 bg-sub2 rounded-lg">
                <Medal className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-xs text-text/70">業界別</p>
                  <p className="text-sm font-bold text-text">#8</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-sub2 rounded-lg">
                <Crown className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-text/70">規模別</p>
                  <p className="text-sm font-bold text-text">#12</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-sub2 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xs text-text/70">成長率</p>
                  <p className="text-sm font-bold text-text">#22</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-sub2 rounded-lg">
                <Award className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-xs text-text/70">利益率</p>
                  <p className="text-sm font-bold text-text">#7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* バッジ・表彰 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-text">
              バッジ・表彰
            </h3>
            <Link
              to="/mietoru/ranking"
              className="text-primary hover:underline text-sm"
            >
              詳しく見る →
            </Link>
          </div>

          <div className="space-y-4">
            {/* 獲得バッジ統計 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Medal className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-text">3</p>
                <p className="text-xs text-text/70">獲得バッジ</p>
              </div>
              <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-text">1</p>
                <p className="text-xs text-text/70">今月の表彰</p>
              </div>
              <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <Star className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-text">82.3</p>
                <p className="text-xs text-text/70">総合スコア</p>
              </div>
            </div>

            {/* 最近の表彰 */}
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-warning" />
                <span className="text-sm font-semibold text-text">
                  最新の表彰
                </span>
              </div>
              <p className="text-sm text-text">
                🏆 業界別ランキング 3位 (2024年5月)
              </p>
              <p className="text-xs text-text/70 mt-1">
                IT・ソフトウェア業界で優秀な成果を達成！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Trophy, Shield, Users, Info } from "lucide-react";
import type {
  InitialSetup,
  CompanySize,
  Industry,
  BusinessExperience,
  FinancialKnowledge,
  SetupStep,
} from "../types";

const Setup: React.FC = () => {
  const { user, completeSetup, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [setupData, setSetupData] = useState<InitialSetup>({
    currentAssets: 0,
    companySize: "個人事業主",
    companyName: "",
    fiscalYearStartMonth: 4,
    employeeCount: 1,
    industry: "IT・ソフトウェア",
    businessExperience: "1年未満",
    financialKnowledge: "初心者",
    priorityGoals: [],
    longTermGoal: {
      targetYear: new Date().getFullYear() + 10,
      targetNetWorth: 50000000, // 5000万円
      description: "10年で純資産5000万円を達成する",
    },
    rankingSettings: {
      isParticipating: true,
      isAnonymous: false,
      allowBenchmarking: true,
      notificationEnabled: true,
    },
  });

  // ログインしていない場合はリダイレクト
  if (!user && !isLoading) {
    return <Navigate to="/mietoru/login" replace />;
  }

  // 既に設定完了済みの場合はダッシュボードへ
  if (user?.isSetupComplete) {
    return <Navigate to="/mietoru" replace />;
  }

  const steps: SetupStep[] = [
    {
      id: 0,
      title: "基本情報",
      description: "事業の基本情報を教えてください",
      completed: false,
    },
    {
      id: 1,
      title: "財務情報",
      description: "現在の資産状況を教えてください",
      completed: false,
    },
    {
      id: 2,
      title: "経験・知識",
      description: "あなたの事業経験を教えてください",
      completed: false,
    },
    {
      id: 3,
      title: "ランキング設定",
      description: "ランキング・表彰機能の設定を行います",
      completed: false,
    },
    {
      id: 4,
      title: "設定完了",
      description: "設定内容を確認して完了します",
      completed: false,
    },
  ];

  const companyTypes: CompanySize[] = [
    "個人事業主",
    "法人（従業員1-5名）",
    "法人（従業員6-20名）",
    "法人（従業員21名以上）",
  ];

  const industries: Industry[] = [
    "IT・ソフトウェア",
    "製造業",
    "小売業",
    "飲食業",
    "サービス業",
    "建設業",
    "医療・福祉",
    "教育",
    "金融・保険",
    "不動産",
    "その他",
  ];

  const experienceOptions: BusinessExperience[] = [
    "1年未満",
    "1-3年",
    "3-5年",
    "5-10年",
    "10年以上",
  ];

  const knowledgeOptions: FinancialKnowledge[] = [
    "初心者",
    "基本レベル",
    "中級レベル",
    "上級レベル",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    // 実際のアプリでは、設定データをAPIに送信
    console.log("Setup completed:", setupData);
    completeSetup(setupData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // 基本情報
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                会社名（任意）
              </label>
              <input
                type="text"
                value={setupData.companyName || ""}
                onChange={(e) =>
                  setSetupData({ ...setupData, companyName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="会社名を入力してください（任意）"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                企業規模
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setSetupData({ ...setupData, companySize: type })
                    }
                    className={`p-3 sm:p-4 border rounded-lg text-left transition-colors ${
                      setupData.companySize === type
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-sm sm:text-base font-medium">
                      {type}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                業界
              </label>
              <select
                value={setupData.industry}
                onChange={(e) =>
                  setSetupData({
                    ...setupData,
                    industry: e.target.value as Industry,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  事業年度開始月
                </label>
                <select
                  value={setupData.fiscalYearStartMonth}
                  onChange={(e) =>
                    setSetupData({
                      ...setupData,
                      fiscalYearStartMonth: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}月
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  従業員数
                </label>
                <input
                  type="number"
                  min="1"
                  value={setupData.employeeCount}
                  onChange={(e) =>
                    setSetupData({
                      ...setupData,
                      employeeCount: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
        );

      case 1: // 財務情報
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                現在の総資産（個人資産含む）
              </label>
              <p className="text-sm text-gray-500 mb-3">
                事業資金や個人資産を含めた現在の総資産額を入力してください
              </p>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={setupData.currentAssets}
                  onChange={(e) =>
                    setSetupData({
                      ...setupData,
                      currentAssets: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-right text-lg"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  円
                </span>
              </div>
              {setupData.currentAssets > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  現在の資産: {formatCurrency(setupData.currentAssets)}
                </p>
              )}
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">長期目標</h4>
              <p className="text-blue-800 text-sm">
                10年後の目標純資産:{" "}
                <span className="font-bold">
                  {formatCurrency(setupData.longTermGoal.targetNetWorth)}
                </span>
              </p>
              <p className="text-blue-700 text-xs mt-1">
                必要な資産増加額:{" "}
                {formatCurrency(
                  setupData.longTermGoal.targetNetWorth -
                    setupData.currentAssets
                )}
              </p>
            </div>
          </div>
        );

      case 2: // 経験・知識
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                事業経験年数
              </label>
              <div className="space-y-2">
                {experienceOptions.map((exp) => (
                  <label key={exp} className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      value={exp}
                      checked={setupData.businessExperience === exp}
                      onChange={(e) =>
                        setSetupData({
                          ...setupData,
                          businessExperience: e.target
                            .value as BusinessExperience,
                        })
                      }
                      className="mr-3 text-primary focus:ring-primary"
                    />
                    <span>{exp}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                財務・会計の知識レベル
              </label>
              <div className="space-y-2">
                {knowledgeOptions.map((knowledge) => (
                  <label key={knowledge} className="flex items-center">
                    <input
                      type="radio"
                      name="knowledge"
                      value={knowledge}
                      checked={setupData.financialKnowledge === knowledge}
                      onChange={(e) =>
                        setSetupData({
                          ...setupData,
                          financialKnowledge: e.target
                            .value as FinancialKnowledge,
                        })
                      }
                      className="mr-3 text-primary focus:ring-primary"
                    />
                    <span>{knowledge}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // ランキング設定
        return (
          <div className="space-y-6">
            {/* ランキング機能の説明 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">
                  ランキング・表彰機能について
                </h4>
              </div>
              <p className="text-blue-800 text-sm">
                他の企業と匿名でパフォーマンスを比較し、モチベーション向上や業界ベンチマークの確認ができます。
                いつでも設定で変更可能です。
              </p>
            </div>

            {/* ランキング参加設定 */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Trophy className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">
                    ランキング参加
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    企業間パフォーマンス比較ランキングに参加しますか？
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="ranking_participation"
                        checked={
                          setupData.rankingSettings.isParticipating === true
                        }
                        onChange={() =>
                          setSetupData({
                            ...setupData,
                            rankingSettings: {
                              ...setupData.rankingSettings,
                              isParticipating: true,
                            },
                          })
                        }
                        className="mr-3 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium text-gray-900">
                          参加する
                        </span>
                        <p className="text-sm text-gray-600">
                          ランキングに参加し、業界ベンチマークや比較機能を利用
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="ranking_participation"
                        checked={
                          setupData.rankingSettings.isParticipating === false
                        }
                        onChange={() =>
                          setSetupData({
                            ...setupData,
                            rankingSettings: {
                              ...setupData.rankingSettings,
                              isParticipating: false,
                              isAnonymous: false,
                              allowBenchmarking: false,
                            },
                          })
                        }
                        className="mr-3 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium text-gray-900">
                          参加しない
                        </span>
                        <p className="text-sm text-gray-600">
                          ランキング機能を使用せず、個人利用のみ
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* ランキング参加時の詳細設定 */}
              {setupData.rankingSettings.isParticipating && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h5 className="font-medium text-gray-900 mb-3">
                    プライバシー設定
                  </h5>

                  {/* 匿名表示設定 */}
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h6 className="font-medium text-gray-900 mb-2">
                        匿名表示
                      </h6>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="anonymous_setting"
                            checked={
                              setupData.rankingSettings.isAnonymous === false
                            }
                            onChange={() =>
                              setSetupData({
                                ...setupData,
                                rankingSettings: {
                                  ...setupData.rankingSettings,
                                  isAnonymous: false,
                                },
                              })
                            }
                            className="mr-2 text-primary focus:ring-primary"
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-900">
                              実名表示
                            </span>
                            <p className="text-xs text-gray-600">
                              ランキングで会社名を表示（推奨）
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="anonymous_setting"
                            checked={
                              setupData.rankingSettings.isAnonymous === true
                            }
                            onChange={() =>
                              setSetupData({
                                ...setupData,
                                rankingSettings: {
                                  ...setupData.rankingSettings,
                                  isAnonymous: true,
                                },
                              })
                            }
                            className="mr-2 text-primary focus:ring-primary"
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-900">
                              匿名表示
                            </span>
                            <p className="text-xs text-gray-600">
                              ランキングで「A社」等の匿名で表示
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* ベンチマーク参加設定 */}
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={setupData.rankingSettings.allowBenchmarking}
                          onChange={(e) =>
                            setSetupData({
                              ...setupData,
                              rankingSettings: {
                                ...setupData.rankingSettings,
                                allowBenchmarking: e.target.checked,
                              },
                            })
                          }
                          className="mr-3 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="font-medium text-gray-900">
                            ベンチマーク参加
                          </span>
                          <p className="text-sm text-gray-600">
                            業界平均データの計算に参加し、より正確なベンチマークを提供
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ランキング算定基準の説明 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h5 className="font-medium text-yellow-900 mb-2">
                  総合スコア算定基準
                </h5>
                <div className="grid grid-cols-2 gap-2 text-sm text-yellow-800">
                  <div>• 純資産形成率: 40%</div>
                  <div>• 売上成長率: 25%</div>
                  <div>• 利益率改善: 20%</div>
                  <div>• 目標達成率: 15%</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // 完了
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                設定完了！
              </h3>
              <p className="text-gray-600">
                ミエトルの準備が整いました。あなたの事業成長をサポートします。
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
              <h4 className="font-medium text-gray-900">設定内容の確認</h4>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">会社名:</span>{" "}
                  {setupData.companyName || "未設定"}
                </p>
                <p>
                  <span className="text-gray-600">企業規模:</span>{" "}
                  {setupData.companySize}
                </p>
                <p>
                  <span className="text-gray-600">業界:</span>{" "}
                  {setupData.industry}
                </p>
                <p>
                  <span className="text-gray-600">現在の資産:</span>{" "}
                  {formatCurrency(setupData.currentAssets)}
                </p>
                <p>
                  <span className="text-gray-600">事業経験:</span>{" "}
                  {setupData.businessExperience}
                </p>
                <p>
                  <span className="text-gray-600">財務知識:</span>{" "}
                  {setupData.financialKnowledge}
                </p>
                <p>
                  <span className="text-gray-600">10年後の目標:</span>{" "}
                  {formatCurrency(setupData.longTermGoal.targetNetWorth)}
                </p>
                <p>
                  <span className="text-gray-600">ランキング参加:</span>{" "}
                  {setupData.rankingSettings.isParticipating
                    ? "参加する"
                    : "参加しない"}
                </p>
                {setupData.rankingSettings.isParticipating && (
                  <p>
                    <span className="text-gray-600">表示設定:</span>{" "}
                    {setupData.rankingSettings.isAnonymous
                      ? "匿名表示"
                      : "実名表示"}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/5 py-4 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-lg sm:text-xl font-bold">ミ</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            初期設定
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            あなたに最適化された経営サポートのための設定を行います
          </p>
        </div>

        {/* プログレスバー */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium ${
                  index <= currentStep
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center">
            ステップ {currentStep + 1} / {steps.length}:{" "}
            {steps[currentStep].title}
          </p>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            {steps[currentStep].description}
          </p>

          {renderStepContent()}
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 sm:px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            戻る
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 sm:px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 text-sm sm:text-base"
            >
              次へ
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm sm:text-base"
            >
              設定完了
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setup;

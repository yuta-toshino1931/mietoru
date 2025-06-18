import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Bell,
  User,
  Database,
  Building,
  Target,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import type {
  InitialSetup,
  CompanySize,
  Industry,
  BusinessExperience,
  FinancialKnowledge,
} from "../types";

interface Task {
  id: number;
  name: string;
  day: number;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const { user, userSetup, updateUserSetup } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "月次売上の確認と入力", day: 5, enabled: true },
    { id: 2, name: "経費の整理と計上", day: 10, enabled: true },
    { id: 3, name: "前月実績の分析", day: 15, enabled: false },
  ]);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDay, setNewTaskDay] = useState(1);

  // 初期設定データの状態管理
  const [setupData, setSetupData] = useState<InitialSetup | null>(null);

  const [userInfo, setUserInfo] = useState({
    name: user?.name || "田中太郎",
    email: user?.email || "tanaka@example.com",
    phone: "03-1234-5678",
  });

  const [yayoiSettings, setYayoiSettings] = useState({
    connected: true,
    apiKey: "****-****-****-1234",
    autoSync: true,
    syncFrequency: "daily",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    mobile: false,
  });

  // オプション定義
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

  // 設定データを初期化
  useEffect(() => {
    if (userSetup) {
      setSetupData(userSetup);
    }
  }, [userSetup]);

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: newTaskName,
        day: newTaskDay,
        enabled: true,
      };
      setTasks([...tasks, newTask]);
      setNewTaskName("");
      setNewTaskDay(1);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTaskToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, enabled: !task.enabled } : task
      )
    );
  };

  const handleSaveSettings = () => {
    if (setupData) {
      updateUserSetup(setupData);
    }
    alert("設定を保存しました。");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!setupData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500">初期設定データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-text">設定</h1>
        <button
          onClick={handleSaveSettings}
          className="btn-primary flex items-center justify-center space-x-2 text-sm"
        >
          <Save className="h-4 w-4" />
          <span>設定を保存</span>
        </button>
      </div>

      {/* 事業基本情報設定 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* 基本情報 */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Building className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-text">
              事業基本情報
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text/70 mb-2">
                会社名（任意）
              </label>
              <input
                type="text"
                value={setupData.companyName || ""}
                onChange={(e) =>
                  setSetupData({ ...setupData, companyName: e.target.value })
                }
                className="input-field w-full"
                placeholder="会社名を入力してください（任意）"
              />
            </div>

            <div>
              <label className="block text-sm text-text/70 mb-2">
                企業規模
              </label>
              <select
                value={setupData.companySize}
                onChange={(e) =>
                  setSetupData({
                    ...setupData,
                    companySize: e.target.value as CompanySize,
                  })
                }
                className="input-field w-full pr-8 appearance-none bg-white"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "calc(100% - 4px) center",
                  backgroundSize: "16px",
                }}
              >
                {companyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-text/70 mb-2">業界</label>
              <select
                value={setupData.industry}
                onChange={(e) =>
                  setSetupData({
                    ...setupData,
                    industry: e.target.value as Industry,
                  })
                }
                className="input-field w-full pr-8 appearance-none bg-white"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "calc(100% - 4px) center",
                  backgroundSize: "16px",
                }}
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-text/70 mb-2">
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
                className="input-field w-full pr-8 appearance-none bg-white"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "calc(100% - 4px) center",
                  backgroundSize: "16px",
                }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}月
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 財務・目標設定 */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-text">
              財務・目標設定
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text/70 mb-2">
                現在の総資産
              </label>
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
                  className="input-field w-full pr-12 text-right"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/50">
                  円
                </span>
              </div>
              <p className="text-xs text-text/60 mt-1">
                現在: {formatCurrency(setupData.currentAssets)}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>長期目標:</strong> {setupData.longTermGoal.targetYear}
                年までに
                {formatCurrency(setupData.longTermGoal.targetNetWorth)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                必要増加額:{" "}
                {formatCurrency(
                  setupData.longTermGoal.targetNetWorth -
                    setupData.currentAssets
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm text-text/70 mb-2">
                事業経験
              </label>
              <select
                value={setupData.businessExperience}
                onChange={(e) =>
                  setSetupData({
                    ...setupData,
                    businessExperience: e.target.value as BusinessExperience,
                  })
                }
                className="input-field w-full pr-8 appearance-none bg-white"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "calc(100% - 4px) center",
                  backgroundSize: "16px",
                }}
              >
                {experienceOptions.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-text/70 mb-2">
                財務知識レベル
              </label>
              <select
                value={setupData.financialKnowledge}
                onChange={(e) =>
                  setSetupData({
                    ...setupData,
                    financialKnowledge: e.target.value as FinancialKnowledge,
                  })
                }
                className="input-field w-full pr-8 appearance-none bg-white"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "calc(100% - 4px) center",
                  backgroundSize: "16px",
                }}
              >
                {knowledgeOptions.map((knowledge) => (
                  <option key={knowledge} value={knowledge}>
                    {knowledge}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 月次タスク通知設定 */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-text">
              月次タスク通知設定
            </h3>
          </div>

          <div className="space-y-4">
            {/* 既存タスク一覧 */}
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={task.enabled}
                      onChange={() => handleTaskToggle(task.id)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-medium text-text">{task.name}</p>
                      <p className="text-sm text-text/70">
                        毎月{task.day}日に通知
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-error hover:bg-error/10 p-1 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* 新しいタスクの追加 */}
            <div className="border-t border-border pt-4">
              <h4 className="font-medium text-text mb-3">新しいタスクを追加</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  className="input-field w-full"
                  placeholder="タスク名を入力"
                />
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-text/70">毎月</label>
                  <select
                    value={newTaskDay}
                    onChange={(e) => setNewTaskDay(Number(e.target.value))}
                    className="input-field pr-8 appearance-none bg-white"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "calc(100% - 4px) center",
                      backgroundSize: "16px",
                    }}
                  >
                    {Array.from({ length: 28 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}日
                      </option>
                    ))}
                  </select>
                  <label className="text-sm text-text/70">に通知</label>
                </div>
                <button
                  onClick={handleAddTask}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>タスクを追加</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 通知方法設定 */}
        <div className="card">
          <h3 className="text-base sm:text-lg font-semibold text-text mb-4">
            通知方法
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text">メール通知</p>
                <p className="text-sm text-text/70">
                  登録メールアドレスに通知を送信
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.email}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    email: e.target.checked,
                  })
                }
                className="rounded border-border text-primary focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text">ブラウザ通知</p>
                <p className="text-sm text-text/70">ブラウザに通知を表示</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.browser}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    browser: e.target.checked,
                  })
                }
                className="rounded border-border text-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ユーザー情報設定 */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-text">
              ユーザー情報
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text/70 mb-1">お名前</label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">
                電話番号
              </label>
              <input
                type="tel"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
                className="input-field w-full"
              />
            </div>
          </div>
        </div>

        {/* 弥生会計連携設定 */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Database className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-text">
              弥生会計連携
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-sub2/30 rounded-lg">
              <div>
                <p className="font-medium text-text">連携状況</p>
                <p className="text-sm text-text/70">
                  APIキー: {yayoiSettings.apiKey}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  yayoiSettings.connected
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                {yayoiSettings.connected ? "接続済み" : "未接続"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text">自動同期</p>
                <p className="text-sm text-text/70">定期的にデータを自動取得</p>
              </div>
              <input
                type="checkbox"
                checked={yayoiSettings.autoSync}
                onChange={(e) =>
                  setYayoiSettings({
                    ...yayoiSettings,
                    autoSync: e.target.checked,
                  })
                }
                className="rounded border-border text-primary focus:ring-primary"
              />
            </div>

            {yayoiSettings.autoSync && (
              <div>
                <label className="block text-sm text-text/70 mb-1">
                  同期頻度
                </label>
                <select
                  value={yayoiSettings.syncFrequency}
                  onChange={(e) =>
                    setYayoiSettings({
                      ...yayoiSettings,
                      syncFrequency: e.target.value,
                    })
                  }
                  className="input-field w-full pr-8 appearance-none bg-white"
                  style={{
                    backgroundImage:
                      'url(\'data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "calc(100% - 4px) center",
                    backgroundSize: "16px",
                  }}
                >
                  <option value="hourly">1時間ごと</option>
                  <option value="daily">1日ごと</option>
                  <option value="weekly">1週間ごと</option>
                </select>
              </div>
            )}

            <button className="btn-secondary w-full">連携設定を変更</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

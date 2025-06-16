import React, { useState } from "react";
import { Save, Plus, Trash2, Bell, User, Database } from "lucide-react";

interface Task {
  id: number;
  name: string;
  day: number;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "月次売上の確認と入力", day: 5, enabled: true },
    { id: 2, name: "経費の整理と計上", day: 10, enabled: true },
    { id: 3, name: "前月実績の分析", day: 15, enabled: false },
  ]);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDay, setNewTaskDay] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "田中太郎",
    email: "tanaka@example.com",
    company: "株式会社サンプル",
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
    alert("設定を保存しました。");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text">設定</h1>
        <button
          onClick={handleSaveSettings}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>設定を保存</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 月次タスク通知設定 */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-text">
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
                    className="input-field"
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
          <h3 className="text-lg font-semibold text-text mb-4">通知方法</h3>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ユーザー情報設定 */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-text">ユーザー情報</h3>
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
              <label className="block text-sm text-text/70 mb-1">会社名</label>
              <input
                type="text"
                value={userInfo.company}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, company: e.target.value })
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
            <Database className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-text">弥生会計連携</h3>
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
                  className="input-field w-full"
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

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Map,
  BarChart3,
  MessageCircle,
  Settings,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "ダッシュボード", href: "/mietoru", icon: Home },
    { name: "ロードマップ設定", href: "/mietoru/roadmap", icon: Map },
    { name: "予実管理", href: "/mietoru/budget-actual", icon: BarChart3 },
    { name: "相談・サポート", href: "/mietoru/support", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-white border-b border-border px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-1.5 sm:p-2 rounded-md text-text hover:bg-sub2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary ml-2 lg:ml-0">
              ミエトル
            </h1>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* ユーザー情報 */}
            <div className="hidden md:flex items-center space-x-2 px-2 sm:px-3 py-1 bg-sub2 rounded-lg">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-5 w-5 sm:h-6 sm:w-6 rounded-full"
                />
              ) : (
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-text" />
              )}
              <span className="text-xs sm:text-sm font-medium text-text">
                {user?.name}
              </span>
            </div>

            {/* 設定ボタン */}
            <Link
              to="/mietoru/settings"
              className="p-1.5 sm:p-2 rounded-md text-text hover:bg-sub2 transition-colors"
              title="設定"
            >
              <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            {/* ログアウトボタン */}
            <button
              onClick={() => {
                if (window.confirm("ログアウトしますか？")) {
                  logout();
                }
              }}
              className="p-1.5 sm:p-2 rounded-md text-text hover:bg-sub2 transition-colors"
              title="ログアウト"
            >
              <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* サイドバー（PC） */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-56 xl:w-64 bg-white border-r border-border">
            <nav className="p-3 xl:p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 xl:px-4 py-2.5 xl:py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text hover:bg-sub2"
                    }`}
                  >
                    <item.icon className="h-4 w-4 xl:h-5 xl:w-5 mr-2 xl:mr-3" />
                    <span className="text-sm xl:text-base">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* モバイルサイドバー */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-64 sm:w-72 bg-white shadow-xl">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
                <h2 className="text-lg sm:text-xl font-bold text-primary">
                  ミエトル
                </h2>
                <button
                  type="button"
                  className="p-1.5 sm:p-2 rounded-md text-text hover:bg-sub2"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
              <nav className="p-3 sm:p-4 space-y-2">
                {/* ユーザー情報（モバイル時のみ表示） */}
                <div className="md:hidden flex items-center space-x-2 px-3 py-2 bg-sub2 rounded-lg mb-4">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5 text-text" />
                  )}
                  <span className="text-sm font-medium text-text">
                    {user?.name}
                  </span>
                </div>

                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-text hover:bg-sub2"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="text-sm sm:text-base">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* メインコンテンツ */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

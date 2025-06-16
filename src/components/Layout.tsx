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
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "ダッシュボード", href: "/mietoru", icon: Home },
    { name: "ロードマップ設定", href: "/mietoru/roadmap", icon: Map },
    { name: "予実管理", href: "/mietoru/budget-actual", icon: BarChart3 },
    { name: "相談・サポート", href: "/mietoru/support", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-white border-b border-border px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-text hover:bg-sub2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-primary ml-2 lg:ml-0">
              ミエトル
            </h1>
          </div>
          <Link
            to="/settings"
            className="p-2 rounded-md text-text hover:bg-sub2 transition-colors"
          >
            <Settings className="h-6 w-6" />
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* サイドバー（PC） */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-64 bg-white border-r border-border">
            <nav className="p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text hover:bg-sub2"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
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
            <div className="fixed inset-y-0 left-0 w-64 bg-white">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-xl font-bold text-primary">ミエトル</h2>
                <button
                  type="button"
                  className="p-2 rounded-md text-text hover:bg-sub2"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-text hover:bg-sub2"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* メインコンテンツ */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

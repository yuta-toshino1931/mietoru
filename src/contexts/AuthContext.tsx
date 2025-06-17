import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthUser, InitialSetup } from "../types";

interface AuthContextType {
  user: AuthUser | null;
  userSetup: InitialSetup | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => void;
  completeSetup: (setupData: InitialSetup) => void;
  updateUserSetup: (setupData: Partial<InitialSetup>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userSetup, setUserSetup] = useState<InitialSetup | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ローカルストレージからトークンをチェック
    const token = localStorage.getItem("token");
    const savedSetup = localStorage.getItem("userSetup");

    if (token) {
      // 実際のアプリでは、トークンを検証してユーザー情報を取得
      // 今はデモ用に仮のユーザーデータを設定
      const isSetupComplete = savedSetup !== null;
      setUser({
        id: "1",
        email: "demo@example.com",
        name: "デモユーザー",
        isSetupComplete,
        createdAt: new Date(),
        lastLogin: new Date(),
      });

      // 保存された設定データを復元
      if (savedSetup) {
        setUserSetup(JSON.parse(savedSetup));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // 実際のアプリでは、APIを呼び出してログイン処理
      // 今はデモ用に固定のレスポンスを返す
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 擬似的な遅延

      const demoUser: AuthUser = {
        id: "1",
        email: email,
        name: "デモユーザー",
        isSetupComplete: false,
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      setUser(demoUser);
      localStorage.setItem("token", "demo-token");
    } catch (error) {
      throw new Error("ログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (_idToken: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Google認証処理のデモ実装
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const demoUser: AuthUser = {
        id: "1",
        email: "demo@gmail.com",
        name: "Google ユーザー",
        avatar: "https://lh3.googleusercontent.com/a/default-user",
        isSetupComplete: false,
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      setUser(demoUser);
      localStorage.setItem("token", "demo-google-token");
    } catch (error) {
      throw new Error("Google認証に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserSetup(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userSetup");
  };

  const completeSetup = (setupData: InitialSetup) => {
    if (user) {
      setUser({ ...user, isSetupComplete: true });
      setUserSetup(setupData);
      localStorage.setItem("userSetup", JSON.stringify(setupData));
    }
  };

  const updateUserSetup = (setupData: Partial<InitialSetup>) => {
    if (userSetup) {
      const updatedSetup = { ...userSetup, ...setupData };
      setUserSetup(updatedSetup);
      localStorage.setItem("userSetup", JSON.stringify(updatedSetup));
    }
  };

  const value: AuthContextType = {
    user,
    userSetup,
    isLoading,
    login,
    loginWithGoogle,
    logout,
    completeSetup,
    updateUserSetup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

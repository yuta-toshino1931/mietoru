// 財務データ関連の型定義
export interface FinancialData {
  month: string;
  year: number;
  revenue: number;
  profit: number;
  expenses: number;
  customers: number;
}

// KPI関連の型定義
export interface KPIData {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  color: string;
  status: "success" | "warning" | "error" | "info";
}

// ロードマップ関連の型定義
export interface YearlyTarget {
  year: number;
  revenue: number;
  profit: number;
  employees: number;
  phase: BusinessPhase;
}

export type BusinessPhase = "創業期" | "成長期" | "拡大期" | "安定期";

// 通知・タスク関連の型定義
export interface Task {
  id: number;
  name: string;
  day: number;
  enabled: boolean;
  type: TaskType;
}

export type TaskType = "revenue" | "expense" | "analysis" | "report" | "custom";

// 相談・サポート関連の型定義
export interface Consultation {
  id: number;
  date: string;
  advisor: string;
  topic: string;
  status: ConsultationStatus;
  notes?: string;
}

export type ConsultationStatus = "予約済み" | "完了" | "キャンセル";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

// ユーザー関連の型定義
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  createdAt: Date;
  lastLogin: Date;
}

// 設定関連の型定義
export interface NotificationSettings {
  email: boolean;
  browser: boolean;
  mobile: boolean;
  frequency: "immediate" | "daily" | "weekly";
}

export interface YayoiSettings {
  connected: boolean;
  apiKey: string;
  autoSync: boolean;
  syncFrequency: "hourly" | "daily" | "weekly";
  lastSync?: Date;
}

// APIレスポンス関連の型定義
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// チャート関連の型定義
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData extends ChartData {
  date: string;
  target?: number;
  actual?: number;
}

// アラート関連の型定義
export interface Alert {
  id: number;
  type: AlertType;
  title: string;
  message: string;
  severity: AlertSeverity;
  createdAt: Date;
  read: boolean;
  actionUrl?: string;
}

export type AlertType =
  | "target_miss"
  | "revenue_drop"
  | "expense_increase"
  | "system"
  | "reminder";
export type AlertSeverity = "low" | "medium" | "high" | "critical";

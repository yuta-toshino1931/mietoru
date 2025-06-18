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
  netWorth: number; // 純資産
  revenue: number; // 売上
  profit: number; // 事業の利益
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
  completed?: boolean; // タスクの完了状態を追加
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

// 認証関連の型定義
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isSetupComplete: boolean;
  createdAt: Date;
  lastLogin: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

// 初期設定関連の型定義
export interface InitialSetup {
  currentAssets: number;
  companySize: CompanySize;
  companyName?: string; // 会社名を追加（任意項目）
  fiscalYearStartMonth: number;
  employeeCount: number;
  industry: Industry;
  businessExperience: BusinessExperience;
  financialKnowledge: FinancialKnowledge;
  priorityGoals: PriorityGoal[];
  longTermGoal: LongTermGoal;
}

export type CompanySize =
  | "個人事業主"
  | "法人（従業員1-5名）"
  | "法人（従業員6-20名）"
  | "法人（従業員21名以上）";

export type Industry =
  | "IT・ソフトウェア"
  | "製造業"
  | "小売業"
  | "飲食業"
  | "サービス業"
  | "建設業"
  | "医療・福祉"
  | "教育"
  | "金融・保険"
  | "不動産"
  | "その他";

export type BusinessExperience =
  | "1年未満"
  | "1-3年"
  | "3-5年"
  | "5-10年"
  | "10年以上";

export type FinancialKnowledge =
  | "初心者"
  | "基本レベル"
  | "中級レベル"
  | "上級レベル";

export type PriorityGoal =
  | "売上向上"
  | "利益改善"
  | "コスト削減"
  | "キャッシュフロー改善"
  | "投資計画"
  | "税務対策"
  | "資金調達"
  | "事業拡大";

export interface LongTermGoal {
  targetYear: number;
  targetNetWorth: number; // 目標純資産
  description?: string;
}

// 設定ステップ関連
export interface SetupStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

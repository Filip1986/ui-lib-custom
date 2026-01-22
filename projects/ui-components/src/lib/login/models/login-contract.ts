export interface LoginFeatures {
  showSocialLogin?: boolean;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showRegisterLink?: boolean;
}

export interface LoginSuccessEvent {
  success: boolean;
  refreshTokenIdentifier?: string;
}

export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export type LoginVariant = '1' | '2' | '3';

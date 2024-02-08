import { Router } from 'express';

export interface Route {
  basePath: string;
  router: Router;
}

export interface signupEvent {
  user_id: number;
  email: string;
  token: string;
  username: string;
}

export interface verifyLogin {
  user_id: number;
  token: string;
}
export interface qrCodeGenerateInterface {
  dataUrl?: string;
  message?: void;
  isError: boolean;
}

export interface kafkaCrednetials {
  clientId?: string;
  brokers: Array<string>;
  connectionTimeout?: number;
  requestTimeout?: number;
  retry?: any;
}

interface PagenationColumn {
  user_id: number;
  balance: number;
  locked_balance: number;
  address: string;
  created_at: string;
  updated_at: string;
  coin_name: string;
}

export interface PagenationInterface {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  list: Array<PagenationColumn>;
}

export interface saveAccountVersion {
  user_id: number;
  coin_name: string;
  current_balance: number;
  locked_balance: number;
  amount: number;
  event_type: string;
  type_id?: number;
}

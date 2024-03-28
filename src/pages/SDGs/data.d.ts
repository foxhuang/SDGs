
import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export interface BaseForm {
  date?: string[];
  
  current?: number;
  pageSize?: number;
  sorter?: string;
}

export interface VisitDataType {
  x: string;
  y: number;
  color: string;
}

export interface DashboardData {
  oneYearData: VisitDataType[];
  sevenDayData: { title: string; num: number; remainder: number }[];
  lastMonthKeepsiteData: { title: string; total: number }[];
}

export interface DashboardReturnResult {
  getDashboardData: DashboardData;
}

export interface ReaderStatsItem {
  reader_code: string;
  reader_name: string;
  lend_total: number;
  point_total: number;
  prize_total: number;
  prize_points: number;
}

export interface ReaderStatsReturnResult {
  getReaderStats: {
    total: number;
    data: ReaderStatsItem[];
  };
}

export interface ReaderStatsForm {
  date?: string[];
  point_type?: number;
  rank?: number;

  current?: number;
  pageSize?: number;
  sorter?: string;
}

export interface KeepsiteExchangeStatsItem {
  keepsite: string;
  type: string;
  prize_name: string;
  status: string;
  point_type: string;
  count: number;
  num: number;
  time: number;
  point: number;

  exchange_date: string;
  reader_code: string;
  reader_name: string;

  prize_detail_id: number;
  readercnt: number;
  muser_name: string;
  lendcnt: number;
}

export interface KeepsiteExchangeStatsReturnResult {
  getKeepsiteExchangeStats: {
    total: number;
    data: KeepsiteExchangeStatsItem[];
  };
}

export interface KeepsiteExchangeStatsForm {
  date?: string[];
  keepsite?: number[];
  mode?: string;
  prize_detail_id?: number;
  status_id?: number;

  current?: number;
  pageSize?: number;
  sorter?: string;
}

export interface RewardPointType {
  id: number;
  name: string;
  cate_id: string;
  message_code: string;
  code: string;
}

export interface RewardPointTypeReturnResult {
  getRewardPointType: {
    total: number;
    data: RewardPointType[];
  };
}

export interface DownloadResult {
  success: boolean;
  message: string;
  contenttype: string;
  content: string;
}

export interface RewardPointHistoryItem {
  reader_code: string;
  reader_name: string;
  reward_point_type: string;
  point: number
  status: string;
  reward_prize_type: string;
  reward_prize_name: string;
  keepsite_name: string;
  create_date: string;
  create_user: string;
}

export interface RewardPointHistoryReturnResult {
  getRewardPointHistoryList: {
    total: number;
    data: RewardPointHistoryItem[];
  }
}

export interface RewardPointHistoryForm {
  id?: number;
  reader_code?: string;
  reader_name?: string;
  creuser?: number;
  create_date?: string[]
  action?: number

  current?: number;
  pageSize?: number;
  sorter?: string;
}

export interface MuserListReturnResult {
  getMuserList: {
    total: number;
    data: MuserItem[];
  };
}

export interface MuserItem {
  muser_id: number;
  muser_code: string;
  muser_name: string;
  groups_name: string;
  muser_enable: number;
}

export interface MuserListForm {
  muser_code?: string;
  muser_name?: string;
  groups_id?: number;

  current?: number;
  pageSize?: number;
  sorter?: string;
}

export interface UntakeStatsDetail {
  reader_code: string;
  reader_name: string;
  create_date: string;
  keepsite_name: string;
  prize_name: string;
  type_id: number;
}

export interface UntakeStatsDetailReturnResult {
  list: {
    total: number;
    data: UntakeStatsDetail[];
  }
}

export interface UntakeStatsList {
  keepsite_name: string;
  prize_detail_id: number;
  prize_name: string;
  count: number;
  point_type_name: string;
  prize_type_name: string;
}

export interface UntakeStatsListReturnResult {
  list: {
    total: number;
    data: UntakeStatsList[];
  }
}

export interface UntakeStatsForm {
  keepsite_id?: number[];
  prize_detail_id?: number;
  mode?: string;
  expire_date?: string[];
  point_type_id?: number;
  prize_type_id?: number;

  current?: number;
  pageSize?: number;
  sorter?: string;
}

export interface Region {
  RId: number;
  code: string;
  title: string;
  select_keepsit: string;
}

export interface StatLibPrizePoint {
  prize_point_name: string;
  takenum: number;
}

export interface StatLibList {
  keepsite_name: string;
  point_type_name: string;
  prize_type_name: string;
  lend_total: number;
  prize_total: number;
  prize_points: number;
}

export interface StatLibReturnResult {
  list: {
    total: number;
    data: StatLibList[];
  }
}

export interface StatLibForm {
  keepsite_id?: number[];
  create_date?: string[];
  point_type_id?: number;
  prize_type_id?: number;

  current?: number;
  pageSize?: number;
  sorter?: string;
}

export interface VisitDataType {
  x: string;
  y: number;
}

export type SearchDataType = {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
};

export type OfflineDataType = {
  name: string;
  cvr: number;
};

export interface OfflineChartData {
  date: number;
  type: number;
  value: number;
}

export type RadarData = {
  name: string;
  label: string;
  value: number;
};

export interface AnalysisData {
  visitData: DataItem[];
  visitData2: DataItem[];
  salesData: DataItem[];
  searchData: DataItem[];
  offlineData: OfflineDataType[];
  offlineChartData: DataItem[];
  salesTypeData: DataItem[];
  salesTypeDataOnline: DataItem[];
  salesTypeDataOffline: DataItem[];
  radarData: RadarData[];
}

export type SDGsBooksItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  isbn: string;
  pubyear: string;
  source: string;
  insert_date: string;
  marcId: string;
  isshow: string;
  sdgsId: number;
  maincodeId: number;
  reasons:string,
  extended:string;
  flag:string;
  share:string;
};

type SDGsItems = {
  url: string;
  id: number;
  number: number;
  title: string;
  source: string;
  isshow: string;
  insert_date: string; 
  sdgsId: number;
  maincodeId: number;
};
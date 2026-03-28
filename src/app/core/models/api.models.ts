export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
}

export interface PharmacyContext {
  ncpdp: string;
  pharmacyId: string;
}

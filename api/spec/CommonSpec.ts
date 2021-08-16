export interface Paging {
  createdAt?: string | Date;
  limit?: number;
}

export interface QueryFilter extends Paging {
  searchString?: string;
}

export interface SuccessData<T> {
  data: T;
}

export interface FailureData {
  error: {
    code: string;
    message: string;
  };
}

export enum FirebaseAccessMethod {
  EMAIL_AND_PASSWORD = "EMAIL_AND_PASSWORD",
  PHONE = "PHONE",
  GOOGLE = "GOOGLE",
}

export interface EmailAndPasswordAccessCred {
  email: string;
  password: string;
}

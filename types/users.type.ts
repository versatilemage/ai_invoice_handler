import {
    API_RESPONSE_STATUS_CODE,
    TENANT_PROVIDED_ROLES,
  } from "@/lib/enum/auth.enum";
  
  export type CustomerDataType = {
    email?: string;
    customer_name?: string;
    tenant_id: string;
    role: TENANT_PROVIDED_ROLES.CUSTOMER;
  };
  
  export type CommonResponseType<T> = {
    status: API_RESPONSE_STATUS_CODE;
    data: T;
    errors?: string;
    msg?: string;
  };
  
  /* Auth Response type */
  
  export type SignupResponseType = {
    public_id: string;
    created_at: Date;
  };
  
  export type SigninResponseType = {
    token: string;
    tenant_id: string;
    user_id: string;
  };
  
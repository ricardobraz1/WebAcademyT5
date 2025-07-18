export interface AuthPayload {
    email: string;
    password: string;
  }
  
  export interface SignupPayload extends AuthPayload {
    name: string;
    userTypeId: string;
  }
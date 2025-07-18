export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    userTypeId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserType {
    id: string;
    label: string;
  }
  
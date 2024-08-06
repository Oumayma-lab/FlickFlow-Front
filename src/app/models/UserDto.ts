export interface UserDto {
  id?: number;
  username: string;
  password?: string;
  firstname: string;
  lastname: string;
  birthday: string ;
  subscriptionType: string;
  email: string;
  roles?: string[];
  joindate?: string; // Optional as it will be set on the backend
}

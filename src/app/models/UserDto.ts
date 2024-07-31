export interface UserDto {
  id?: number;
  username: string;
  password?: string;
  name: string;
  lastname: string;
  birthdate: Date | string;
  subscriptionType: string;
  email: string;
  roles?: string[];
}

export interface IUsers {
  id?: number;
  name: string;
  password: string;
  age?: number;
}

export interface ICreateUser {
  name: string;
  password: string;
  age?: number;
}

//Interface responses
export interface ICreateUserResponse {
  message: string;
  data: IUsers;
}
export interface IGetUsersResponse {
  message: string;
  data: IUsers[];
}
export interface IGetUserByIdResponse {
  message: string;
  data: IUsers;
}

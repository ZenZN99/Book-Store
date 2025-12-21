export  interface IUser {
  _id: string;
  fullname: string;
  email: string;
  avatar:string;
  cover:string;
  balance:number;
  role:string;
}

export interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  loadUser: () => void;
  logout: () => void;
}

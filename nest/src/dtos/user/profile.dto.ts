export interface UpdateProfileResponse {
  success: string;
  user: {
    _id: string;
    fullname: string;
    email: string;
    avatar?: string;
    cover?: string;
    role: string;
    balance: number;
  };
}



// Types
export interface User {
  id: string;
  email: string;
  username: string | null;
  address: object | null;
  sportsData: { _id: string; name: string }[];
  fetchedUsers: User[];
  selectedSports: string[] | any;
  profilePic: string | null;
  coverPic: string | null;
  headline: string;
  followerCount: number | null,
  followingCount: number | null,
  [key: string]: any;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
  success: boolean;
  status: number | null;
  msgBackend: string | null;
}
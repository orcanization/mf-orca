export interface ApiError {
  message: string;
  status: number;
}

export type Plugin = {
  name: string;
  url: string;
  isLocal: boolean;
};

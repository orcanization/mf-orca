export interface ApiError {
  message: string;
  status: number;
}

export type Plugin = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  url: string;
  isLocal: boolean;
};

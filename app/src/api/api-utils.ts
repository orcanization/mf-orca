import { ApiClient } from '@/api/api-client';

export function apiClient() {
  return new ApiClient('http://localhost:8888');
}

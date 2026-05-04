import type { ApiError, Plugin } from '@/api/models';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // A generic request helper
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return (await response.json()) as Promise<T>;
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  public post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public getPlugins() {
    return this.get<Plugin[]>('/plugins');
  }

  /**
   * @param plugin The plugin to fetch the entrypoint URL for.
   * @return Returns the entrypoint URL for a plugin.
   */
  public getPluginUrl(plugin: Plugin) {
    return plugin.isLocal ? `${this.baseUrl}${plugin.url}` : plugin.url;
  }
}

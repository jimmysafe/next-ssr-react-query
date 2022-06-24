import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// declare module 'axios' {
//     interface AxiosResponse<T = any> extends Promise<T> {}
// }

export class APIError extends Error {
  constructor(public code: number, message: string, public details?: string) {
    super(message);
  }
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this._authenticate);
  };

  private async _authenticate(
    _config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    const config = _config;

    //@ts-expect-error
    config.headers["x-rapidapi-host"] =
      "free-to-play-games-database.p.rapidapi.com";
    //@ts-expect-error
    config.headers["x-rapidapi-key"] =
      "894518425emsh10c0f7d5e2533e8p1d4225jsnd66081659192";

    return config;
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  private _handleResponse = (data: AxiosResponse) => data.data;

  protected _handleError(error: any) {
    const data = error.response?.data;
    if (data?.code && data?.data?.message)
      return Promise.reject(
        new APIError(data.code, data.data.message, data.data.details)
      );

    return Promise.reject(error);
  }

  /**
   * Perform a GET request against a resource
   * @description To perform a request against `https://example.com/v1-user/login`, pass `/login` as the request URL
   * @param url Resource (excluding base URL)
   * @param config Request config parameters
   * @returns Response
   */
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T, any>(url, config);
  }

  /**
   * Perform a DELETE request against a resource
   * @description To perform a request against `https://example.com/v1-user/login`, pass `/login` as the request URL
   * @param url Resource (excluding base URL)
   * @param config Request config parameters
   * @returns Response
   */
  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T, any>(url, config);
  }

  /**
   * Perform a POST request against a resource
   * @description To perform a request against `https://example.com/v1-user/login`, pass `/login` as the request URL
   * @param url Resource (excluding base URL)
   * @param config Request config parameters
   * @returns Response
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post<T, any>(url, data, config);
  }

  /**
   * Perform a PUT request against a resource
   * @description To perform a request against `https://example.com/v1-user/login`, pass `/login` as the request URL
   * @param url Resource (excluding base URL)
   * @param config Request config parameters
   * @returns Response
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put<T, any>(url, data, config);
  }

  /**
   * Perform a PATCH request against a resource
   * @description To perform a request against `https://example.com/v1-user/login`, pass `/login` as the request URL
   * @param url Resource (excluding base URL)
   * @param config Request config parameters
   * @returns Response
   */
  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.patch<T, any>(url, data, config);
  }
}

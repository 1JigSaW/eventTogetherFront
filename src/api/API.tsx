/* eslint-disable no-shadow */
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const apiUrl = 'https://66ea-213-7-244-92.ngrok-free.app';

export class API {
  private static axios = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });

  static Config: AxiosRequestConfig = {
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };

  static refreshToken: string;

  // /**
  //  * Configure requests headers to use the provided Authorization token
  //  * @param {string} token The user session token
  //  * @param {string} refreshToken The refresh session token
  //  */
  // static setToken(token: string, refreshToken: string) {
  //   localStorage.setItem(ACCESS_TOKEN, token);
  //   localStorage.setItem(REFRESH_TOKEN, refreshToken);
  //   API.refreshToken = refreshToken;
  //   if (API.Config.headers) {
  //     API.Config.headers.authorization = `Bearer ${token}`;
  //   }
  // }

  /**
   * Clean authorization(s)
   */
  static clean(): void {
    if (API.Config.headers?.authorization) {
      delete API.Config.headers?.authorization;
    }
  }

  /**
   * Execute a GET Request against endpoint
   * @param url string url of endpoint without /api
   * @param config
   */
  static async get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: any,
  ): Promise<R> {
    return await this.axios.get(url, {...API.Config, ...config});
  }

  /**
   * Execute a POST Request against endpoint
   * @param url string url of endpoint without /api
   * @param data any
   * @param config
   */
  static async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: any,
  ): Promise<R> {
    return await axios.post(url, data, {...API.Config, ...config});
  }

  /**
   * Execute a PUT Request against endpoint
   * @param url string url of endpoint without /api
   * @param data any
   * @param config
   */
  static async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: any,
  ): Promise<R> {
    return await this.axios.put(url, data, {...API.Config, ...config});
  }

  /**
   * Execute a PATCH Request against endpoint
   * @param url string url of endpoint without /api
   * @param data any
   * @param config
   */
  static async patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: any,
  ): Promise<R> {
    return await this.axios.patch(url, data, {...API.Config, ...config});
  }

  static setup(): void {
    this.axios.interceptors.response.use((response: any) => {
      return response;
    });
  }

  /**
   * Execute a DELETE Request against endpoint
   * @param url string url of endpoint without /api
   * @param config
   */
  static async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: any,
  ): Promise<R> {
    return await this.axios.delete(url, {...API.Config, ...config});
  }

  /**
   * This function intercept expired token response, generate a new token and replay request
   * @param error
   * @protected
   */
  // protected static async tokenInterceptor(error: any) {
  //   const config = error?.config;
  //
  //   if (error?.response?.status !== 401 || !API.refreshToken) {
  //     throw error;
  //   }
  //
  //   if (
  //     error?.response?.status === 401 &&
  //     config?.url !== 'users/api/v1/tokens/confirm/' &&
  //     config?.url !== 'users/api/v1/tokens/refresh/'
  //   ) {
  //     console.log('HERE');
  //     delete API.Config.headers?.authorization;
  //     const {access, refresh} = await LoginApi.refreshToken(API.refreshToken);
  //     API.setToken(access, refresh);
  //     if (access && API.Config.headers) {
  //       config.headers.authorization = `Bearer ${access}`;
  //       API.Config.headers.authorization = `Bearer ${access}`;
  //       return this.axios.request(config);
  //     }
  //   }
  //
  //   if (config?.url === 'users/api/v1/tokens/refresh/') {
  //     API.clean();
  //     throw error;
  //   }
  // }
}

API.setup();

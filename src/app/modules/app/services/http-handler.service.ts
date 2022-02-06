import { RequestErrorHandlerService } from './request-error-handler.service';
import { Response } from './respponse.type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpHandler {
  constructor(private http: HttpClient, private requestErrorHandlerService: RequestErrorHandlerService) {}

  get<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Promise<T | null> {
    return this.http
      .get<Response<T>>(url, options)
      .toPromise()
      .then(response => this.handleResponse(response))
      .catch(error => this.handleError(error));
  }

  post<T>(
    url: string,
    data: any,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Promise<T | null> {
    return this.http
      .post<Response<T>>(url, data, options)
      .toPromise()
      .then(response => this.handleResponse(response))
      .catch(error => this.handleError(error));
  }

  delete(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Promise<any> {
    return this.http
      .delete<Response<any>>(url, options)
      .toPromise()
      .then(response => this.handleResponse(response))
      .catch(error => this.handleError(error));
  }

  private handleResponse<T>(response: Response<T>): T | null {
    // this.events.broadcast(NetworkEvent.NETWORK_OK);
    console.log(response);
    if (response.success) {
      return response.data;
    } else {
      this.requestErrorHandlerService.responseErrorHandler(response);
      return null;
    }
  }

  private async handleError(error: any) {
    console.log(error);
    this.requestErrorHandlerService.networkErrorHandler(error);
    return null;
  }
}

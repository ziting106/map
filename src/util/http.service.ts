import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiActionMode, ApiPath } from './con-type.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  apiAction(
    path: ApiPath,
    action: ApiActionMode,
    model: any,
    isParams?: boolean
  ): Observable<any> {
    // console.log(this.apiUrl + path + action);

    if (isParams == null || isParams == undefined) {
      isParams = false;
    }
    if (isParams) {
      let params: HttpParams = new HttpParams();
      let dic = this.convertObjToDics(model);
      dic.forEach((e) => {
        params = params.set(e.name, e.value);
      });
      return this.httpClient.post(this.apiUrl + path + '/' + action, '', {
        params: params,
      });
    } else {
      return this.httpClient.post(this.apiUrl + path + '/' + action, model);
    }
  }

  /**
   * @description
   * 自訂API與方法，參數為Model[isParam=false]，若參數值為個別使用[isParam=true]
   */
  model: any;
  apiResult: any;
  async ajaxDataInfo<T>(
    useApi: any,
    action: any,
    postModel: any,
    isParam: boolean = false
  ) {
    let response: any = await lastValueFrom(
      this.apiAction(useApi, action, postModel, isParam)
    );
    this.apiResult = response;
    this.model = response.Data as T;
    return response.Data as T;
  }

  async ajaxFileDownload(useApi: any, action: any, postModel: any) {
    let uri: string = `${this.apiUrl}${useApi}/${action}`;
    let options: any = {
      params: postModel,
      observe: 'response',
      responseType: 'blob',
    };
    let obserable$: Observable<any> = this.httpClient.post(uri, '', options);
    return await lastValueFrom(obserable$);
  }

  convertObjToDics(obj: any) {
    return Object.keys(obj).map((key) => ({
      name: key,
      value: obj[key],
    }));
  }
}

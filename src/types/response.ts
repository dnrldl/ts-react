import { AxiosHeaders } from "axios";

export interface BaseResponse {
  config: {};
  data: any[];
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

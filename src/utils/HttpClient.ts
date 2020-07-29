import { webAPIUrl } from "../AppSettings";

export interface HttpRequest<RequestBody> {
  path: string;
}

export interface HttpResponse<ResponseBody> extends Response {
  parsedBody?: ResponseBody;
}

export const http = <RequestBody, ResponseBody>(
  config: HttpRequest<RequestBody>,
): Promise<HttpResponse<ResponseBody>> => {
  return new Promise((resolve, reject) => {
    const request = new Request(`${webAPIUrl}${config.path}`);
    let response: HttpResponse<ResponseBody>;

    fetch(request)
      .then(res => {
        response = res;
        return res.json();
      })
      .then(body => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

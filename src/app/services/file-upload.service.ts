import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "./auth/auth.service";
import CONST from "../../helpers/CONST";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  httpOptions = {};

  constructor(
    private http: HttpClient,
    @Inject('BaseURL') private baseUrl: string,
    private authService: AuthService,
  ) {
    const authToken = this.authService.getAuthToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      }),
      reportProgress: true,
      responseType: 'json'
    }
  }

  upload(file: File, id: number, type: String): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    const fileToUpload = new File(
      [file],
      type + "-" + id + "-" + file.name,
      {type: file.type}
    )

    formData.append('file', fileToUpload);

    const req = new HttpRequest('POST', `${CONST.API_URL}/upload/${type}/${id}`, formData, this.httpOptions);
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

}

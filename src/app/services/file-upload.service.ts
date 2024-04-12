import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient,
    @Inject('BaseURL') private baseUrl: string) { }
   

 upload(file: File,id:number,type :String ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    const fileToUpload = new File(
      [file],
      type+"-"+id+"-"+file.name,
      {type: file.type}
    )

    formData.append('file', fileToUpload);

    const req = new HttpRequest('POST', `${this.baseUrl}api/upload/${type}/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

export abstract class GenericRestService<T> {

  constructor(protected http: HttpClient,
    protected endpoint: string) { }

  public list() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<T[]>(this.endpoint, { headers });
  }

  public add(obj: T) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    return this.http.post<T>(this.endpoint, obj, { headers }).pipe(take(1));
  }

  public get(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<T>(`${this.endpoint}/${id}`, { headers }).pipe(take(1));
  }

  public delete(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.endpoint}/${id}`, { headers }).pipe(take(1));
  }

  public edit(obj: T) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<T>(this.endpoint, obj, { headers }).pipe(take(1));
  }
}

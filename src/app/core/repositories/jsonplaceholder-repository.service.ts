import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonPlaceholderApi } from 'src/environments/config';

import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderRepository {

  constructor(private http: HttpClient) { }

  public getResource(id: string): Observable<Post> {
    return this.http.get<Post>(JsonPlaceholderApi.GetResource.replace(':id', id));
  }

  public getResourceList(): Observable<Post[]> {
    return this.http.get<Post[]>(JsonPlaceholderApi.GetResourceList);
  }

  public createResource(post: Post): Observable<any> {
    return this.http.post(JsonPlaceholderApi.CreateResource.replace(':id', String(post.id)), post);
  }

  public updateResource(post: Post): Observable<any> {
    return this.http.put(JsonPlaceholderApi.UpdateResource.replace(':id', String(post.id)), post);
  }

  public deleteResource(id: string): Observable<any> {
    return this.http.delete(JsonPlaceholderApi.DeleteResource.replace(':id', id));
  }
}

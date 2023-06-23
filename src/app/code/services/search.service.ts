import { Injectable } from '@angular/core';
import { SearchResultDto } from '../models/SearchDto';
import { BaseService } from '../BaseService';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService  extends BaseService<SearchResultDto>{

  constructor(private http: HttpClient) {
    super(http, environment.artistApi, 'Search');
  }

  search(search: string): Observable<SearchResultDto> {
    return this.http.get<SearchResultDto>(`${environment.artistApi}Search/byName/${search}`);
  }
}

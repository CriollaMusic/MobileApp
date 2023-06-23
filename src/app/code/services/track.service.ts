import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService';
import { HttpClient } from '@angular/common/http';
import { Track, TrackDto } from '../models/Track';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService extends BaseService<Track> {

  constructor(private http: HttpClient) {
    super(http, environment.artistApi, 'Track');
  }

  getByAlbum(albumId: number): Observable<TrackDto> {
    return this.client.get<TrackDto>(`${this.apiUrl}/byAlbum/${albumId}`);
  }
  
  getTopTracks(): Observable<TrackDto[]> {
    return this.client.get<TrackDto[]>(`${this.apiUrl}/topTracks`);
  }

  getStream(itemId: number): Observable<any> {
    return this.client.get<any>(`${this.apiUrl}/streamAudio/${itemId}`);
  }

  override new(item: Track, id: number = 0): Observable<Track> {
    item.id = 0;
    return this.client.post<Track>(`${this.apiUrl}/add${id > 0 ? '/' + id : ''}`, item);
  }
}


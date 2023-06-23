import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Track, TrackDto } from '../models/Track';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService extends BaseService<Track> {

  $player = new BehaviorSubject<TrackDto|undefined>(undefined);
  $playListAdd = new BehaviorSubject<TrackDto|undefined>(undefined);
  static $playNext = new BehaviorSubject<TrackDto|undefined>(undefined);

  constructor(private http: HttpClient) {
    super(http, environment.playbackApi, 'PlayBack');
  }


}

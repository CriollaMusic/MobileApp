import { Component, ViewChild } from '@angular/core';
import { Track, TrackDto } from '../code/models/Track';
import { TrackService } from '../code/services/track.service';
import { AuthenticatedDto } from '../code/AuthenticationDto';
import { UserService } from '../code/services/users.service';
import { environment } from 'src/environments/environment';
import { PlaybackService } from '../code/services/playback.service';
import { SearchService } from '../code/services/search.service';
import { SearchResultDto } from '../code/models/SearchDto';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tracks: TrackDto[] | undefined;
  nowPlaying: string = '';
  playingIcon: string = 'play-circle-outline';
  albumName: string = '';
  artistName: string = '';
  albumPicture: string = '';
  audioSource: string = '';
  searchContent: string = '';
  isPlaying: boolean = false;
  @ViewChild('audioOption') audio!: HTMLAudioElement;

  constructor(private trackService: TrackService, private playbackService: PlaybackService, private searchService: SearchService) {

  }

  ngOnInit(): void {
    this.trackService.getTopTracks().subscribe(res => this.tracks = res);
  }

  playPause(audio: number): void {

    // let storageContent = localStorage.getItem(UserService.UserLocalStorageKey);
    // let url = environment.playbackApi;
    // if (storageContent) {
    //   let content = <AuthenticatedDto>JSON.parse(storageContent);
    //   url += `PlayBack/streamAudio/${audio}/${content.token.value}`;
    // }


    //   this.audio = new Audio();

    // this.audio.src = encodeURI(url);

    this.playbackService.$player.next(this.tracks?.find(x=> x.id == audio));

    // if (!this.isPlaying) {
    //   this.playingIcon = 'pause-circle-outline';
    //   this.isPlaying = true;
    //   // this.audioSource = url;
    //   this.audio.play();
    // }
    // else {
    //   this.playingIcon = 'play-circle-outline';
    //   this.isPlaying = false;
    //   this.audio.pause();
    // }

  }

  addToPlaylist(audio: number): void {

    // let storageContent = localStorage.getItem(UserService.UserLocalStorageKey);
    // let url = environment.playbackApi;
    // if (storageContent) {
    //   let content = <AuthenticatedDto>JSON.parse(storageContent);
    //   url += `PlayBack/streamAudio/${audio}/${content.token.value}`;
    // }


    //   this.audio = new Audio();

    // this.audio.src = encodeURI(url);

    this.playbackService.$playListAdd.next(this.tracks?.find(x=> x.id == audio));

    // if (!this.isPlaying) {
    //   this.playingIcon = 'pause-circle-outline';
    //   this.isPlaying = true;
    //   // this.audioSource = url;
    //   this.audio.play();
    // }
    // else {
    //   this.playingIcon = 'play-circle-outline';
    //   this.isPlaying = false;
    //   this.audio.pause();
    // }

  }

  searchForValues($event:any){
    console.log('Event',$event.target?.value);
    this.searchService.search($event.target.value).subscribe(res => {
      this.tracks = res.tracks;
    });
  }

}

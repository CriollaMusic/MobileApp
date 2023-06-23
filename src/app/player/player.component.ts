import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaybackService } from '../code/services/playback.service';
import { UserService } from '../code/services/users.service';
import { environment } from 'src/environments/environment';
import { AuthenticatedDto } from '../code/AuthenticationDto';
import { Track, TrackDto } from '../code/models/Track';
import * as moment from 'moment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  nowPlaying: string | undefined = '';
  playingIcon: string = 'play-circle-outline';
  albumName: string = '';
  artistName: string = '';
  albumPicture: string = '';
  audioSource: string = '';
  playlistIndex = -1;
  isPlaying: boolean = false;
  trackDuration = 0;
  @ViewChild('audioOption',) audio!: HTMLAudioElement;
  public playlist: Array<TrackDto | undefined>;

  constructor(private playbackService: PlaybackService) {
    this.audio = <HTMLAudioElement>document.getElementById("audioOption");
    this.playlist = new Array<TrackDto>();
  }

  ngOnInit() {
    this.nowPlaying = 'Random Song';
    this.albumName = 'Random Album';
    this.artistName = 'Artist Name';
    this.albumPicture = 'https://ionicframework.com/docs/img/demos/card-media.png';
    this.initPlayBackInstantPlayListener();
    this.initPlayBackPlayListListener();
    this.initPlayNextSongListener();
  }

  initPlayBackInstantPlayListener() {

    this.playbackService.$player.subscribe(res => {
      this.audio = <HTMLAudioElement>document.getElementById("audioOption");
      if (res == undefined)
        return;
      this.playlist.splice(0);

      let storageContent = localStorage.getItem(UserService.UserLocalStorageKey);
      let url = environment.playbackApi;
      if (storageContent) {
        let content = <AuthenticatedDto>JSON.parse(storageContent);
        url += `PlayBack/streamAudio/${res?.id}/${content.token.value}`;
      }
      this.nowPlaying = res?.name;
      this.isPlaying = false;
      if (this.audio.paused == false) {
        try {
          (this.audio).pause();
          this.audio.src = encodeURI(url);
        } catch {
          this.audio.src = encodeURI(url);
        }
      } else {
        this.audio.src = encodeURI(url);
      }

      if (res) {
        if (!this.playlist.find(x => x?.id == res?.id))
          this.playlist.push(res);
        this.audio.play();
        this.isPlaying = true;
        this.playingIcon = 'pause-circle-outline';
        this.initPlayerProgress();
      }
      // this.audio.play();
      // this.audioSource = url;
    });

  }


  initPlayNextSongListener() {

    PlaybackService.$playNext.subscribe(res => {
      this.audio = <HTMLAudioElement>document.getElementById("audioOption");
      if (res == undefined)
        res = this.playlist[this.playlistIndex];
      else
        this.playlistIndex = this.playlist.indexOf(res)

      let storageContent = localStorage.getItem(UserService.UserLocalStorageKey);
      let url = environment.playbackApi;
      if (storageContent) {
        let content = <AuthenticatedDto>JSON.parse(storageContent);
        url += `PlayBack/streamAudio/${res?.id}/${content.token.value}`;
      }
      this.nowPlaying = res?.name;
      this.isPlaying = false;

      try {
        this.audio.pause();
        this.audio.src = encodeURI(url);
      } catch {
        this.audio.src = encodeURI(url);
      }
      this.audio.src = encodeURI(url);


      if (res) {
        this.audio.play();
        this.isPlaying = true;
        this.playingIcon = 'pause-circle-outline';
        this.initPlayerProgress();
      }
      // this.audio.play();
      // this.audioSource = url;
    });

  }

  initPlayBackPlayListListener() {
    this.playbackService.$playListAdd.subscribe(res => {
      this.audio = <HTMLAudioElement>document.getElementById("audioOption");
      if (!res)
        return;
      if (!this.playlist.find(x => x?.id == res?.id))
        this.playlist.push(res);

      if (!this.isPlaying) {
        let storageContent = localStorage.getItem(UserService.UserLocalStorageKey);
        let url = environment.playbackApi;
        if (storageContent) {
          let content = <AuthenticatedDto>JSON.parse(storageContent);
          url += `PlayBack/streamAudio/${res?.id}/${content.token.value}`;
        }
        this.nowPlaying = res?.name;
        this.audio.src = encodeURI(url);

        this.audio.onended = function () {
          PlaybackService.$playNext.next(undefined);
        };

        if (res) {
          this.audio.play();
          this.playlistIndex = 0;
          this.isPlaying = true;
          this.playingIcon = 'pause-circle-outline';
          this.initPlayerProgress();
        }

      }
    });
  }

  playPause(): void {
    this.playlistIndex = -1;
    if (!this.isPlaying) {
      this.playingIcon = 'pause-circle-outline';
      this.isPlaying = true;
      this.audio.play();
    }
    else {
      this.playingIcon = 'play-circle-outline';
      this.isPlaying = false;
      this.audio.pause();
    }

  }

  initPlayerProgress() {
    this.audio.addEventListener("timeupdate", (currentTime) => {
      this.audio = <HTMLAudioElement>document.getElementById("audioOption");
      this.trackDuration = this.audio.currentTime / this.audio.duration;
    })

  }

  playNextTrack(id: number | undefined): void {
    if (id == this.playlist.length)
      this.playlistIndex = 0;
    else if (id ?? 0 < 0)
      this.playlistIndex = this.playlist.length - 1;
    else
      this.playlistIndex = id ?? 0;
    let track = this.playlist[id ?? 0];
    PlaybackService.$playNext.next(track);
  }

}

import { BaseEntity } from "../BaseEntity";
import { MusicGender } from "./MusicGender";
import { MusicGenderDto } from "./MusicGenderDto";

export class Track extends BaseEntity {
    name!: string;
    publishDate!: string;
    gender!: MusicGender;
    details!: string;
    audio!: string;
    extension!: string;
    videoLink!: string;
    collaborators!: string;
    reproductionsCount!: number;
}

export interface TrackDto extends BaseEntity {
  name: string;
  publishDate: Date;
  gender: MusicGenderDto;
  details: string;
  audioDuration: number;
  audio: string;
  videoLink: string;
  collaborators: string;
  extension: string;
  reproductionsCount: number;
  artistName: string;
  albumName: string;
}
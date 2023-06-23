import { AlbumDto } from "./AlbumDto";
import { ArtistDto } from "./ArtistDto";
import { TrackDto } from "./Track";

export interface SearchResultDto {
    countOfItems: number;
    totalAlbums: number;
    albums: AlbumDto[];
    totalTracks: number;
    tracks: TrackDto[];
    totalArtist: number;
    atists: ArtistDto[];
}
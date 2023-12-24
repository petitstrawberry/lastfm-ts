import { PaginationQueryParams } from '../../common/apiClient.types';
import { Album } from '../album/album.types';
import { Artist } from '../artist/artist.types';
import { AttrPagination, Image, Period, Registered, TaggingType, UtcDate } from '../common.types';
import { Tag } from '../tag/tag.types';
import { Track } from '../track/track.types';

export enum UserApiMethods {
    GET_FIRENDS = 'user.getFriends',
    GET_INFO = 'user.getInfo',
    GET_LOVED_TRACKS = 'user.getLovedTracks',
    GET_PERSONAL_TAGS = 'user.getPersonalTags',
    GET_RECENT_TRACKS = 'user.getRecentTracks',
    GET_TOP_ALBUMS = 'user.getTopAlbums',
    GET_TOP_ARTISTS = 'user.getTopArtists',
    GET_TOP_TAGS = 'user.getTopTags',
    GET_TOP_TRACKS = 'user.getTopTracks',
    GET_WEEKLY_ALBUM_CHART = 'user.getWeeklyAlbumChart',
    GET_WEEKLY_ARTIST_CHART = 'user.getWeeklyArtistChart',
    GET_WEEKLY_TRACK_CHART = 'user.getWeeklyTrackChart',
}

export type UserGetFriendsParams = PaginationQueryParams & {
    user: string;
};

export type UserGetFriendsResponse = {
    friends: {
        '@attr': AttrPagination & {
            user: string;
        };
        user: UserFriend[];
    };
};

export type UserFriend = Pick<
    User,
    | 'bootstrap'
    | 'country'
    | 'image'
    | 'name'
    | 'playcount'
    | 'playlists'
    | 'realname'
    | 'registered'
    | 'subscriber'
    | 'type'
    | 'url'
>;

export type UserGetInfoParams = {
    user?: string;
};

export type UserGetInfoResponse = {
    user: User;
};

export type UserGetLovedTracksParams = PaginationQueryParams & {
    user: string;
};

export type UserGetLovedTracksResponse = {
    lovedtracks: {
        '@attr': AttrPagination & {
            user: string;
        };
        track: UserLovedTrack[];
    };
};

export type UserLovedTrack = Pick<Track, 'artist' | 'name' | 'mbid' | 'url'> & {
    date: UtcDate;
    image: Image[];
};

export type UserGetPersonalTagsParams = PaginationQueryParams & {
    user: string;
    tag: string;
    taggingtype: TaggingType;
};

interface BaseUserGetPersonalTagsResponse {
    '@attr': AttrPagination & {
        user: string;
        tag: string;
    };
}

interface UserGetPersonalTagsAlbumsResponse extends BaseUserGetPersonalTagsResponse {
    albums: {
        album: UserPersonalTagsAlbum[];
    };
}

export type UserPersonalTagsAlbum = Pick<Album, 'image' | 'mbid' | 'name' | 'url'> & {
    artist: Pick<Artist, 'mbid' | 'name' | 'url'>;
};

interface UserGetPersonalTagsArtistsResponse extends BaseUserGetPersonalTagsResponse {
    artists: {
        artist: UserPersonalTagsArtist[];
    };
}

export type UserPersonalTagsArtist = Pick<Artist, 'image' | 'mbid' | 'name' | 'url'>;

interface UserGetPersonalTagsTracksResponse extends BaseUserGetPersonalTagsResponse {
    tracks: {
        track: UserPersonalTagsTrack[];
    };
}

export type UserPersonalTagsTrack = Pick<Track, 'artist' | 'duration' | 'mbid' | 'name' | 'url'> & {
    image: Image[];
};

export type UserGetPersonalTagsResponse<T> = {
    taggings: T extends TaggingType.ALBUM
        ? UserGetPersonalTagsAlbumsResponse
        : T extends TaggingType.ARTIST
          ? UserGetPersonalTagsArtistsResponse
          : T extends TaggingType.TRACK
            ? UserGetPersonalTagsTracksResponse
            : BaseUserGetPersonalTagsResponse;
};

export type UserGetRecentTracksParams = PaginationQueryParams & {
    user: string;
    extended?: RecentTracksType;
    from?: string;
    to?: string;
};

export enum RecentTracksType {
    REGULAR = '0',
    EXTENDED = '1',
}

interface BaseUserGetRecentTracksResponse {
    '@attr': AttrPagination & {
        user: string;
    };
}

interface UserGetRecentTracksResponseRegular extends BaseUserGetRecentTracksResponse {
    track: UserRecentTrack[];
}

interface UserGetRecentTracksResponseExtended extends BaseUserGetRecentTracksResponse {
    track: UserRecentTrackExtended[];
}

export type UserGetRecentTracksResponse<T = RecentTracksType.REGULAR> = {
    recenttracks: T extends RecentTracksType.EXTENDED
        ? UserGetRecentTracksResponseExtended
        : UserGetRecentTracksResponseRegular;
};

export type UserRecentTrack = Pick<Track, 'mbid' | 'name' | 'url'> & {
    album: UserRecentTrackAlbum;
    artist: UserRecentTrackArtist;
    date: UtcDate;
    image: Image[];
};

export type UserRecentTrackExtended = Omit<UserRecentTrack, 'artist'> & {
    artist: UserRecentTrackArtistExtended;
    loved: string;
};

export type UserRecentTrackAlbum = Pick<Album, 'mbid'> & {
    '#text': string;
};

export type UserRecentTrackArtist = Pick<Artist, 'mbid'> & {
    '#text': string;
};

export type UserRecentTrackArtistExtended = Pick<Artist, 'image' | 'mbid' | 'name' | 'url'>;

export type UserGetTopAlbumsParams = PaginationQueryParams & {
    user: string;
    period?: Period;
};

export interface UserGetTopAlbumsResponse {
    topalbums: {
        '@attr': AttrPagination & {
            user: string;
        };
        album: UserTopAlbum[];
    };
}

export type UserTopAlbum = Pick<Album, 'image' | 'mbid' | 'name' | 'playcount' | 'url'> & {
    '@attr': {
        rank: string;
    };
    artist: Pick<Artist, 'mbid' | 'name' | 'url'>;
};

export type UserGetTopArtistsParams = PaginationQueryParams & {
    user: string;
    period?: Period;
};

export interface UserGetTopArtistsResponse {
    topartists: {
        '@attr': AttrPagination & {
            user: string;
        };
        artist: UserTopArtist[];
    };
}

export type UserTopArtist = Pick<Artist, 'image' | 'mbid' | 'name' | 'url'> & {
    '@attr': {
        rank: string;
    };
    playcount: string;
};

export type UserGetTopTagsParams = Pick<PaginationQueryParams, 'limit'> & {
    user: string;
};

export interface UserGetTopTagsResponse {
    toptags: {
        '@attr': {
            user: string;
        };
        tag: UserTopTag[];
    };
}

export type UserTopTag = Pick<Tag, 'name'> & {
    count: string;
    url: string;
};

export type UserGetTopTracksParams = PaginationQueryParams & {
    user: string;
    period?: Period;
};

export interface UserGetTopTracksResponse {
    toptracks: {
        '@attr': AttrPagination & {
            user: string;
        };
        track: UserTopTrack[];
    };
}

export type UserTopTrack = Pick<Track, 'artist' | 'duration' | 'mbid' | 'name' | 'playcount' | 'url'> & {
    '@attr': {
        rank: string;
    };
    image: Image[];
};

export type UserGetWeeklyAlbumChartParams = {
    user: string;
    from?: string;
    to?: string;
};

export interface UserGetWeeklyAlbumChartResponse {
    weeklyalbumchart: {
        '@attr': {
            from: string;
            to: string;
            user: string;
        };
        album: UserWeeklyAlbum[];
    };
}

export type UserWeeklyAlbum = Pick<Album, 'mbid' | 'name' | 'playcount' | 'url'> & {
    '@attr': {
        rank: string;
    };
    artist: UserWeeklyAlbumArtist;
};

export type UserWeeklyAlbumArtist = Pick<Artist, 'mbid'> & {
    '#text': string;
};

export type UserGetWeeklyArtistChartParams = {
    user: string;
    from?: string;
    to?: string;
};

export interface UserGetWeeklyArtistChartResponse {
    weeklyartistchart: {
        '@attr': {
            from: string;
            to: string;
            user: string;
        };
        artist: UserWeeklyArtist[];
    };
}

export type UserWeeklyArtist = Pick<Artist, 'mbid' | 'name' | 'url'> & {
    '@attr': {
        rank: string;
    };
    playcount: string;
};

export type UserGetWeeklyArtistTrackParams = {
    user: string;
    from?: string;
    to?: string;
};

export interface UserGetWeeklyArtistTrackResponse {
    weeklytrackchart: {
        '@attr': {
            from: string;
            to: string;
            user: string;
        };
        artist: UserWeeklyTrack[];
    };
}

export type UserWeeklyTrack = Pick<Track, 'mbid' | 'name' | 'playcount' | 'url'> & {
    '@attr': {
        rank: string;
    };
    artist: UserWeeklyTrackArtist;
    image: Image[];
};

export type UserWeeklyTrackArtist = Pick<Artist, 'mbid'> & {
    '#text': string;
};

export type User = {
    age: string;
    album_count: string;
    artist_count: string;
    bootstrap: string;
    country: string;
    gender: string;
    image: Image[];
    name: string;
    playcount: string;
    playlists: string;
    realname: string;
    registered: Registered;
    subscriber: SubscriberStatus;
    track_count: string;
    type: UserType;
    url: string;
};

export enum SubscriberStatus {
    INACTIVE = '0',
    ACTIVE = '1',
}

export enum UserType {
    USER = 'user',
    SUBSCRIBER = 'subscriber',
    ALUM = 'alum',
    STAFF = 'staff',
}

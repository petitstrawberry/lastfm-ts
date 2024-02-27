type Image = {
    size: "small" | "medium" | "large" | "extralarge" | "mega" | "";
    "#text": string;
};
interface Registered {
    unixtime: string;
    "#text": number | string;
}
interface UtcDate {
    uts: string;
    "#text": number | string;
}
interface AttrPagination {
    page: string;
    perPage: string;
    total: string;
    totalPages: string;
}
type TaggingType = "artist" | "album" | "track";
type Period = "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
interface Wiki {
    content: string;
    published: string;
    summary: string;
}
type FlagString = "0" | "1";
type OptionalUserPlayCount = "userplaycount" | undefined;
type OpenSearch = {
    "opensearch:Query": {
        "#text": string;
        role: string;
        searchTerms: string;
        startPage: string;
    };
    "opensearch:itemsPerPage": string;
    "opensearch:startIndex": string;
    "opensearch:totalResults": string;
};
type ApiClientError = {
    error: ApiError;
    message: string;
};
declare enum ApiError {
    INVALID_SERVICE = 2,
    INVALID_METHOD = 3,
    AUTHENTICATION_FAILED = 4,
    INVALID_FORMAT = 5,
    INVALID_PARAMETERS = 6,
    INVALID_RESOURCE = 7,
    OPERATION_FAILED = 8,
    INVALID_SESSION_KEY = 9,
    INVALID_API_KEY = 10,
    SERVICE_OFFLINE = 11,
    INVALID_METHOD_SIGNATURE_SUPPLIED = 13,
    TEMPORARY_ERROR = 16,
    SUSPENDED_API_KEY = 26,
    RATE_LIMIT_EXCEEDED = 29
}
type QueryParams<T = unknown> = T & RequiredQueryParams;
type RequiredQueryParams = {
    method: string;
    api_key: string;
};
interface PaginationQueryParams {
    limit?: string;
    page?: string;
}
declare class ApiClient implements ApiClientInterface {
    private baseUrl;
    get<ResponseType = unknown, ParamsType = unknown>(params: QueryParams<ParamsType>): Promise<ResponseType>;
}
interface ApiClientInterface {
    get<ResponseType = unknown, ParamsType = unknown>(params: QueryParams<ParamsType>): Promise<ResponseType>;
}
declare class LastFmApi {
    protected apiKey: string;
    protected apiClient: ApiClient;
    constructor(apiKey: string);
}
interface TrackGetCorrectionParams {
    track: string;
    artist: string;
}
type TrackGetCorrectionResponse = {
    corrections: {
        correction: {
            "@attr": {
                artistcorrected: string;
                index: string;
                trackcorrected: string;
            };
            track: Pick<Track, "artist" | "mbid" | "name" | "url">;
        };
    };
};
interface TrackGetInfoParams {
    track: string;
    artist: string;
    username?: string;
    autocorrect?: FlagString;
}
interface TrackGetInfoResponseRegular {
    track: Track;
}
interface TrackGetInfoResponseWithUserPlayCount {
    track: Track & {
        userloved: string;
        userplaycount: string;
    };
}
type TrackGetInfoResponse<T extends OptionalUserPlayCount = undefined> = T extends "userplaycount" ? TrackGetInfoResponseWithUserPlayCount : TrackGetInfoResponseRegular;
interface TrackGetSimilarParams extends Pick<PaginationQueryParams, "limit"> {
    track: string;
    artist: string;
    autocorrect?: FlagString;
}
type TrackGetSimilarResponse = {
    similartracks: {
        "@attr": {
            artist: string;
        };
        track: (Pick<Track, "artist" | "duration" | "mbid" | "name" | "playcount" | "url"> & {
            image: Image[];
            match: number;
        })[];
    };
};
interface TrackGetTagsParams {
    track: string;
    artist: string;
    autocorrect?: FlagString;
    user: string;
}
type TrackGetTagsResponse = {
    tags: {
        "#text"?: string;
        "@attr": {
            artist: string;
            track: string;
        };
        tag?: (Pick<Tag, "name"> & {
            url: string;
        })[];
    };
};
interface TrackGetTopTagsParams {
    track: string;
    artist: string;
    autocorrect?: FlagString;
}
type TrackGetTopTagsResponse = {
    toptags: {
        "@attr": {
            artist: string;
            track: string;
        };
        tag: (Pick<Tag, "name"> & {
            count: number;
            url: string;
        })[];
    };
};
interface TrackSearchParams extends PaginationQueryParams {
    track: string;
    artist?: string;
}
type TrackSearchParamsResponse = {
    results: Omit<OpenSearch, "opensearch:Query"> & {
        "opensearch:Query": Pick<OpenSearch["opensearch:Query"], "#text" | "role" | "startPage">;
        "@attr": object;
        trackmatches: {
            track: (Pick<Track, "listeners" | "mbid" | "name" | "url"> & {
                artist: string;
                image: Image[];
            })[];
        };
    };
};
interface Track {
    album: Pick<Album, "artist" | "image" | "mbid" | "url"> & {
        "@attr": {
            position: number;
        };
        title: string;
    };
    artist: Pick<Artist, "mbid" | "name" | "url">;
    duration: string | number | null;
    listeners: string;
    mbid?: string;
    name: string;
    playcount: string | number;
    toptags: {
        tag: (Pick<Tag, "name"> & {
            url: string;
        })[];
    };
    url: string;
    wiki?: Wiki;
    "@attr"?: {
        nowplaying: string;
    };
}
interface ArtistGetCorrectionParams {
    artist: string;
}
type ArtistGetCorrectionResponse = {
    corrections: {
        correction: {
            "@attr": {
                index: string;
            };
            artist: Pick<Artist, "name" | "url">;
        };
    };
};
interface ArtistGetInfoParams {
    artist: string;
    autocorrect?: FlagString;
    username?: string;
    lang?: string;
}
interface ArtistGetInfoResponseRegular {
    artist: Artist;
}
interface ArtistGetInfoResponseWithUserPlayCount {
    artist: Omit<Artist, "stats"> & {
        stats: Pick<Artist["stats"], "listeners" | "playcount"> & {
            userplaycount: string;
        };
    };
}
type ArtistGetInfoResponse<T extends OptionalUserPlayCount = undefined> = T extends "userplaycount" ? ArtistGetInfoResponseWithUserPlayCount : ArtistGetInfoResponseRegular;
interface ArtistGetSimilarParams {
    artist: string;
    autocorrect?: FlagString;
}
type ArtistGetSimilarResponse = {
    similarartists: {
        "@attr": {
            artist: string;
        };
        artist: (Pick<Artist, "image" | "name" | "url"> & {
            match: string;
        })[];
    };
};
interface ArtistGetTagsParams {
    artist: string;
    user: string;
    autocorrect?: FlagString;
}
type ArtistGetTagsResponse = {
    tags: {
        "#text"?: string;
        "@attr": {
            artist: string;
        };
        tag?: (Pick<Tag, "name"> & {
            url: string;
        })[];
    };
};
interface ArtistGetTopAlbumsParams extends PaginationQueryParams {
    artist: string;
    autocorrect?: FlagString;
}
type ArtistGetTopAlbumsResponse = {
    topalbums: {
        "@attr": AttrPagination & {
            artist: string;
        };
        album: (Pick<Album, "image" | "mbid" | "name" | "playcount" | "url"> & {
            artist: Pick<Artist, "mbid" | "name" | "url">;
        })[];
    };
};
interface ArtistGetTopTagsParams {
    artist: string;
    autocorrect?: FlagString;
}
type ArtistGetTopTagsResponse = {
    toptags: {
        "@attr": {
            artist: string;
        };
        tag: (Pick<Tag, "name"> & {
            count: number;
            url: string;
        })[];
    };
};
interface ArtistGetTopTracksParams extends PaginationQueryParams {
    artist: string;
    autocorrect?: FlagString;
}
type ArtistGetTopTracksResponse = {
    toptracks: {
        "@attr": AttrPagination & {
            artist: string;
        };
        track: (Pick<Track, "artist" | "listeners" | "mbid" | "name" | "playcount" | "url"> & {
            "@attr": {
                rank: string;
            };
            image: Image[];
        })[];
    };
};
interface ArtistSearchParams extends PaginationQueryParams {
    artist: string;
}
type ArtistSearchResponse = {
    results: OpenSearch & {
        "@attr": {
            for: string;
        };
        artistmatches: {
            artist: (Pick<Artist, "image" | "mbid" | "name" | "url"> & {
                listeners: string;
            })[];
        };
    };
};
interface Artist {
    bio: Wiki & {
        links: {
            link: {
                "#text": string;
                href: string;
                rel: string;
            };
        };
    };
    image: Image[];
    mbid?: string;
    name: string;
    ontour: FlagString;
    similar: {
        artist: Pick<Artist, "image" | "name" | "url">[];
    };
    stats: {
        listeners: string;
        playcount: string;
    };
    tags: {
        tag: (Pick<Tag, "name"> & {
            url: string;
        })[];
    };
    url: string;
}
interface TagGetInfoParams {
    tag: string;
    lang?: string;
}
type TagGetInfoResponse = {
    tag: Tag;
};
interface TagGetTopAlbumsParams extends PaginationQueryParams {
    tag: string;
}
type TagGetTopAlbumsResponse = {
    albums: {
        "@attr": AttrPagination & {
            tag: string;
        };
        album: (Pick<Album, "image" | "mbid" | "name" | "url"> & {
            "@attr": {
                rank: string;
            };
            artist: Pick<Artist, "mbid" | "name" | "url">;
        })[];
    };
};
interface TagGetTopArtistsParams extends PaginationQueryParams {
    tag: string;
}
type TagGetTopArtistsResponse = {
    topartists: {
        "@attr": AttrPagination & {
            tag: string;
        };
        artist: (Pick<Artist, "image" | "mbid" | "name" | "url"> & {
            "@attr": {
                rank: string;
            };
        })[];
    };
};
type TagGetTopTagsResponse = {
    toptags: {
        "@attr": {
            num_res: number;
            offset: number;
            total: number;
        };
        tag: (Pick<Tag, "name" | "reach"> & {
            count: number;
        })[];
    };
};
interface TagGetTopTracksParams extends PaginationQueryParams {
    tag: string;
}
type TagGetTopTracksResponse = {
    tracks: {
        "@attr": AttrPagination & {
            tag: string;
        };
        track: (Pick<Track, "artist" | "duration" | "mbid" | "name" | "url"> & {
            "@attr": {
                rank: string;
            };
            image: Image[];
        })[];
    };
};
interface Tag {
    name: string;
    reach: number | string;
    total: number;
    wiki?: Pick<Wiki, "content" | "summary">;
}
interface AlbumGetInfoParams {
    artist: string;
    album: string;
    autocorrect?: FlagString;
    username?: string;
    lang?: string;
}
interface AlbumGetInfoResponseRegular {
    album: Album;
}
interface AlbumGetInfoResponseWithUserPlayCount {
    album: Album & {
        userplaycount?: number;
    };
}
type AlbumGetInfoResponse<T extends OptionalUserPlayCount = undefined> = T extends "userplaycount" ? AlbumGetInfoResponseWithUserPlayCount : AlbumGetInfoResponseRegular;
interface AlbumGetTagsParams {
    artist: string;
    album: string;
    autocorrect?: FlagString;
    user: string;
}
type AlbumGetTagsResponse = {
    tags: {
        "#text"?: string;
        "@attr": {
            album: string;
            artist: string;
        };
        tag?: (Pick<Tag, "name"> & {
            url: string;
        })[];
    };
};
interface AlbumGetTopTagsParams extends PaginationQueryParams {
    artist: string;
    album: string;
    autocorrect?: FlagString;
}
type AlbumGetTopTagsResponse = {
    toptags: {
        "@attr": {
            album: string;
            artist: string;
        };
        tag: (Pick<Tag, "name"> & {
            count: number;
            url: string;
        })[];
    };
};
interface AlbumSearchParams extends PaginationQueryParams {
    album: string;
}
type AlbumSearchParamsResponse = {
    results: OpenSearch & {
        "@attr": {
            for: string;
        };
        albummatches: {
            album: Pick<Album, "artist" | "image" | "mbid" | "name" | "url">[];
        };
    };
};
interface Album {
    artist: string;
    image: Image[];
    listeners: string;
    mbid?: string;
    name: string;
    playcount: string | number;
    tags: (Pick<Tag, "name"> & {
        url: string;
    })[] | string;
    tracks?: (Pick<Track, "artist" | "duration" | "name" | "url"> & {
        "@attr": {
            rank: number;
        };
    })[];
    url: string;
    wiki?: Wiki;
}
interface UserGetFriendsParams extends PaginationQueryParams {
    user: string;
}
type UserGetFriendsResponse = {
    friends: {
        "@attr": AttrPagination & {
            user: string;
        };
        user: Pick<User, "bootstrap" | "country" | "image" | "name" | "playcount" | "playlists" | "realname" | "registered" | "subscriber" | "type" | "url">[];
    };
};
interface UserGetInfoParams {
    user: string;
}
type UserGetInfoResponse = {
    user: User;
};
interface UserGetLovedTracksParams extends PaginationQueryParams {
    user: string;
}
type UserGetLovedTracksResponse = {
    lovedtracks: {
        "@attr": AttrPagination & {
            user: string;
        };
        track: (Pick<Track, "artist" | "name" | "mbid" | "url"> & {
            date: UtcDate;
            image: Image[];
        })[];
    };
};
interface UserGetPersonalTagsParams extends PaginationQueryParams {
    user: string;
    tag: string;
    taggingtype: TaggingType;
}
interface BaseUserGetPersonalTagsResponse {
    "@attr": AttrPagination & {
        user: string;
        tag: string;
    };
}
interface UserGetPersonalTagsAlbumsResponse extends BaseUserGetPersonalTagsResponse {
    albums: {
        album: (Pick<Album, "image" | "mbid" | "name" | "url"> & {
            artist: Pick<Artist, "mbid" | "name" | "url">;
        })[];
    };
}
interface UserGetPersonalTagsArtistsResponse extends BaseUserGetPersonalTagsResponse {
    artists: {
        artist: Pick<Artist, "image" | "mbid" | "name" | "url">[];
    };
}
interface UserGetPersonalTagsTracksResponse extends BaseUserGetPersonalTagsResponse {
    tracks: {
        track: (Pick<Track, "artist" | "duration" | "mbid" | "name" | "url"> & {
            image: Image[];
        })[];
    };
}
type UserGetPersonalTagsResponse<T extends TaggingType> = {
    taggings: T extends "album" ? UserGetPersonalTagsAlbumsResponse : T extends "artist" ? UserGetPersonalTagsArtistsResponse : T extends "track" ? UserGetPersonalTagsTracksResponse : BaseUserGetPersonalTagsResponse;
};
type UserGetRecentTracksParams = PaginationQueryParams & {
    user: string;
    extended?: FlagString;
    from?: string;
    to?: string;
};
type TrackDetailLevel = "extended" | undefined;
interface BaseUserGetRecentTracksResponse {
    "@attr": AttrPagination & {
        user: string;
    };
}
interface UserGetRecentTracksResponseRegular extends BaseUserGetRecentTracksResponse {
    track: (Pick<Track, "mbid" | "name" | "url"> & {
        album: Pick<Album, "mbid"> & {
            "#text": string;
        };
        artist: Pick<Artist, "mbid"> & {
            "#text": string;
        };
        date: UtcDate;
        image: Image[];
    })[];
}
interface UserGetRecentTracksResponseExtended extends BaseUserGetRecentTracksResponse {
    track: (Pick<Track, "mbid" | "name" | "url"> & {
        album: Pick<Album, "mbid"> & {
            "#text": string;
        };
        artist: Pick<Artist, "image" | "mbid" | "name" | "url">;
        date: UtcDate;
        image: Image[];
        loved: string;
    })[];
}
type UserGetRecentTracksResponse<T extends TrackDetailLevel = undefined> = {
    recenttracks: T extends "extended" ? UserGetRecentTracksResponseExtended : UserGetRecentTracksResponseRegular;
};
interface UserGetTopAlbumsParams extends PaginationQueryParams {
    user: string;
    period?: Period;
}
type UserGetTopAlbumsResponse = {
    topalbums: {
        "@attr": AttrPagination & {
            user: string;
        };
        album: (Pick<Album, "image" | "mbid" | "name" | "playcount" | "url"> & {
            "@attr": {
                rank: string;
            };
            artist: Pick<Artist, "mbid" | "name" | "url">;
        })[];
    };
};
interface UserGetTopArtistsParams extends PaginationQueryParams {
    user: string;
    period?: Period;
}
type UserGetTopArtistsResponse = {
    topartists: {
        "@attr": AttrPagination & {
            user: string;
        };
        artist: (Pick<Artist, "image" | "mbid" | "name" | "url"> & {
            "@attr": {
                rank: string;
            };
            playcount: string;
        })[];
    };
};
interface UserGetTopTagsParams extends Pick<PaginationQueryParams, "limit"> {
    user: string;
}
type UserGetTopTagsResponse = {
    toptags: {
        "@attr": {
            user: string;
        };
        tag: (Pick<Tag, "name"> & {
            count: string;
            url: string;
        })[];
    };
};
interface UserGetTopTracksParams extends PaginationQueryParams {
    user: string;
    period?: Period;
}
type UserGetTopTracksResponse = {
    toptracks: {
        "@attr": AttrPagination & {
            user: string;
        };
        track: (Pick<Track, "artist" | "duration" | "mbid" | "name" | "playcount" | "url"> & {
            "@attr": {
                rank: string;
            };
            image: Image[];
        })[];
    };
};
interface UserGetWeeklyAlbumChartParams {
    user: string;
    from?: string;
    to?: string;
}
type UserGetWeeklyAlbumChartResponse = {
    weeklyalbumchart: {
        "@attr": {
            from: string;
            to: string;
            user: string;
        };
        album: (Pick<Album, "mbid" | "name" | "playcount" | "url"> & {
            "@attr": {
                rank: string;
            };
            artist: Pick<Artist, "mbid"> & {
                "#text": string;
            };
        })[];
    };
};
interface UserGetWeeklyArtistChartParams {
    user: string;
    from?: string;
    to?: string;
}
type UserGetWeeklyArtistChartResponse = {
    weeklyartistchart: {
        "@attr": {
            from: string;
            to: string;
            user: string;
        };
        artist: (Pick<Artist, "mbid" | "name" | "url"> & {
            "@attr": {
                rank: string;
            };
            playcount: string;
        })[];
    };
};
interface UserGetWeeklyArtistTrackParams {
    user: string;
    from?: string;
    to?: string;
}
type UserGetWeeklyArtistTrackResponse = {
    weeklytrackchart: {
        "@attr": {
            from: string;
            to: string;
            user: string;
        };
        artist: (Pick<Track, "mbid" | "name" | "playcount" | "url"> & {
            "@attr": {
                rank: string;
            };
            artist: Pick<Artist, "mbid"> & {
                "#text": string;
            };
            image: Image[];
        })[];
    };
};
interface User {
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
    subscriber: FlagString;
    track_count: string;
    type: "user" | "subscriber" | "alum" | "staff";
    url: string;
}
declare class UserApi extends LastFmApi implements UserApiInterface {
    getFriends(params: UserGetFriendsParams): Promise<UserGetFriendsResponse>;
    getInfo(params: UserGetInfoParams): Promise<UserGetInfoResponse>;
    getLovedTracks(params: UserGetLovedTracksParams): Promise<UserGetLovedTracksResponse>;
    getPersonalTags<T extends TaggingType>(params: UserGetPersonalTagsParams): Promise<UserGetPersonalTagsResponse<T>>;
    getRecentTracks<T extends TrackDetailLevel = undefined>(params: UserGetRecentTracksParams): Promise<UserGetRecentTracksResponse<T>>;
    getTopAlbums(params: UserGetTopAlbumsParams): Promise<UserGetTopAlbumsResponse>;
    getTopArtists(params: UserGetTopArtistsParams): Promise<UserGetTopArtistsResponse>;
    getTopTags(params: UserGetTopTagsParams): Promise<UserGetTopTagsResponse>;
    getTopTracks(params: UserGetTopTracksParams): Promise<UserGetTopTracksResponse>;
    getWeeklyAlbumChart(params: UserGetWeeklyAlbumChartParams): Promise<UserGetWeeklyAlbumChartResponse>;
    getWeeklyArtistChart(params: UserGetWeeklyArtistChartParams): Promise<UserGetWeeklyArtistChartResponse>;
    getWeeklyTrackChart(params: UserGetWeeklyArtistTrackParams): Promise<UserGetWeeklyArtistTrackResponse>;
}
interface UserApiInterface {
    getFriends: (params: UserGetFriendsParams) => Promise<UserGetFriendsResponse>;
    getInfo: (params: UserGetInfoParams) => Promise<UserGetInfoResponse>;
    getLovedTracks: (params: UserGetLovedTracksParams) => Promise<UserGetLovedTracksResponse>;
    getPersonalTags: <T extends TaggingType>(params: UserGetPersonalTagsParams) => Promise<UserGetPersonalTagsResponse<T>>;
    getRecentTracks: <T extends TrackDetailLevel = undefined>(params: UserGetRecentTracksParams) => Promise<UserGetRecentTracksResponse<T>>;
    getTopAlbums: (params: UserGetTopAlbumsParams) => Promise<UserGetTopAlbumsResponse>;
    getTopArtists: (params: UserGetTopArtistsParams) => Promise<UserGetTopArtistsResponse>;
    getTopTags: (params: UserGetTopTagsParams) => Promise<UserGetTopTagsResponse>;
    getTopTracks: (params: UserGetTopTracksParams) => Promise<UserGetTopTracksResponse>;
    getWeeklyAlbumChart: (params: UserGetWeeklyAlbumChartParams) => Promise<UserGetWeeklyAlbumChartResponse>;
    getWeeklyArtistChart: (params: UserGetWeeklyArtistChartParams) => Promise<UserGetWeeklyArtistChartResponse>;
    getWeeklyTrackChart: (params: UserGetWeeklyArtistTrackParams) => Promise<UserGetWeeklyArtistTrackResponse>;
}
interface LibraryGetArtistsParams extends PaginationQueryParams {
    user: string;
}
type LibraryGetArtistsResponse = {
    artists: {
        "@attr": AttrPagination & {
            user: string;
        };
        artist: (Pick<Artist, "image" | "mbid" | "name" | "url"> & {
            playcount: string;
            tagcount: string;
        })[];
    };
};
declare class LibraryApi extends LastFmApi implements LibraryApiInterface {
    getArtists(params: LibraryGetArtistsParams): Promise<LibraryGetArtistsResponse>;
}
interface LibraryApiInterface {
    getArtists: (params: LibraryGetArtistsParams) => Promise<LibraryGetArtistsResponse>;
}
interface GeoGetTopArtistsParams extends PaginationQueryParams {
    country: string;
}
type GeoGetTopArtistsResponse = {
    topartists: {
        "@attr": AttrPagination & {
            country: string;
        };
        artist: (Pick<Artist, "image" | "mbid" | "name" | "url"> & {
            listeners: string;
        })[];
    };
};
interface GeoGetTopTracksParams extends PaginationQueryParams {
    country: string;
}
type GeoGetTopTracksResponse = {
    tracks: {
        "@attr": AttrPagination & {
            country: string;
        };
        track: (Pick<Track, "artist" | "duration" | "listeners" | "mbid" | "name" | "url"> & {
            "@attr": {
                rank: string;
            };
            image: Image[];
        })[];
    };
};
declare class GeoApi extends LastFmApi implements GeoApiInterface {
    getTopArtists(params: GeoGetTopArtistsParams): Promise<GeoGetTopArtistsResponse>;
    getTopTracks(params: GeoGetTopTracksParams): Promise<GeoGetTopTracksResponse>;
}
interface GeoApiInterface {
    getTopArtists: (params: GeoGetTopArtistsParams) => Promise<GeoGetTopArtistsResponse>;
    getTopTracks: (params: GeoGetTopTracksParams) => Promise<GeoGetTopTracksResponse>;
}
type ChartGetTopArtistsParams = PaginationQueryParams;
type ChartGetTopArtistsResponse = {
    artists: {
        "@attr": AttrPagination;
        artist: (Pick<Artist, "image" | "mbid" | "name" | "url"> & {
            listeners: string;
            playcount: string;
        })[];
    };
};
type ChartGetTopTagsParams = PaginationQueryParams;
type ChartGetTopTagsResponse = {
    tags: {
        "@attr": AttrPagination;
        tag: (Pick<Tag, "name" | "reach" | "wiki"> & {
            taggings: string;
            url: string;
        })[];
    };
};
type ChartGetTopTracksParams = PaginationQueryParams;
type ChartGetTopTracksResponse = {
    tracks: {
        "@attr": AttrPagination;
        track: (Pick<Track, "artist" | "duration" | "listeners" | "mbid" | "name" | "playcount" | "url"> & {
            image: Image[];
        })[];
    };
};
declare class ChartApi extends LastFmApi implements ChartApiInterface {
    getTopArtists(params?: ChartGetTopArtistsParams): Promise<ChartGetTopArtistsResponse>;
    getTopTags(params?: ChartGetTopTagsParams): Promise<ChartGetTopTagsResponse>;
    getTopTracks(params?: ChartGetTopTracksParams): Promise<ChartGetTopTracksResponse>;
}
interface ChartApiInterface {
    getTopArtists: (params?: ChartGetTopArtistsParams) => Promise<ChartGetTopArtistsResponse>;
    getTopTags: (params?: ChartGetTopTagsParams) => Promise<ChartGetTopTagsResponse>;
    getTopTracks: (params?: ChartGetTopTracksParams) => Promise<ChartGetTopTracksResponse>;
}
declare class TagApi extends LastFmApi implements TagApiInterface {
    getInfo(params: TagGetInfoParams): Promise<TagGetInfoResponse>;
    getTopAlbums(params: TagGetTopAlbumsParams): Promise<TagGetTopAlbumsResponse>;
    getTopArtists(params: TagGetTopArtistsParams): Promise<TagGetTopArtistsResponse>;
    getTopTags(): Promise<TagGetTopTagsResponse>;
    getTopTracks(params: TagGetTopTracksParams): Promise<TagGetTopTracksResponse>;
}
interface TagApiInterface {
    getInfo: (params: TagGetInfoParams) => Promise<TagGetInfoResponse>;
    getTopAlbums: (params: TagGetTopAlbumsParams) => Promise<TagGetTopAlbumsResponse>;
    getTopArtists(params: TagGetTopArtistsParams): Promise<TagGetTopArtistsResponse>;
    getTopTags(): Promise<TagGetTopTagsResponse>;
    getTopTracks(params: TagGetTopTracksParams): Promise<TagGetTopTracksResponse>;
}
declare class AlbumApi extends LastFmApi implements AlbumApiInterface {
    getInfo<T extends OptionalUserPlayCount = undefined>(params: AlbumGetInfoParams): Promise<AlbumGetInfoResponse<T>>;
    getTags(params: AlbumGetTagsParams): Promise<AlbumGetTagsResponse>;
    getTopTags(params: AlbumGetTopTagsParams): Promise<AlbumGetTopTagsResponse>;
    search(params: AlbumSearchParams): Promise<AlbumSearchParamsResponse>;
}
interface AlbumApiInterface {
    getInfo<T extends OptionalUserPlayCount = undefined>(params: AlbumGetInfoParams): Promise<AlbumGetInfoResponse<T>>;
    getTags(params: AlbumGetTagsParams): Promise<AlbumGetTagsResponse>;
    getTopTags: (params: AlbumGetTopTagsParams) => Promise<AlbumGetTopTagsResponse>;
    search: (params: AlbumSearchParams) => Promise<AlbumSearchParamsResponse>;
}
declare class ArtistApi extends LastFmApi implements ArtistApiInterface {
    getCorrection(params: ArtistGetCorrectionParams): Promise<ArtistGetCorrectionResponse>;
    getInfo<T extends OptionalUserPlayCount = undefined>(params: ArtistGetInfoParams): Promise<ArtistGetInfoResponse<T>>;
    getSimilar(params: ArtistGetSimilarParams): Promise<ArtistGetSimilarResponse>;
    getTags(params: ArtistGetTagsParams): Promise<ArtistGetTagsResponse>;
    getTopAlbums(params: ArtistGetTopAlbumsParams): Promise<ArtistGetTopAlbumsResponse>;
    getTopTags(params: ArtistGetTopTagsParams): Promise<ArtistGetTopTagsResponse>;
    getTopTracks(params: ArtistGetTopTracksParams): Promise<ArtistGetTopTracksResponse>;
    search(params: ArtistSearchParams): Promise<ArtistSearchResponse>;
}
interface ArtistApiInterface {
    getCorrection(params: ArtistGetCorrectionParams): Promise<ArtistGetCorrectionResponse>;
    getInfo<T extends OptionalUserPlayCount = undefined>(params: ArtistGetInfoParams): Promise<ArtistGetInfoResponse<T>>;
    getSimilar(params: ArtistGetSimilarParams): Promise<ArtistGetSimilarResponse>;
    getTags(params: ArtistGetTagsParams): Promise<ArtistGetTagsResponse>;
    getTopAlbums(params: ArtistGetTopAlbumsParams): Promise<ArtistGetTopAlbumsResponse>;
    getTopTags(params: ArtistGetTopTagsParams): Promise<ArtistGetTopTagsResponse>;
    getTopTracks(params: ArtistGetTopTracksParams): Promise<ArtistGetTopTracksResponse>;
    search(params: ArtistSearchParams): Promise<ArtistSearchResponse>;
}
declare class TrackApi extends LastFmApi implements TrackApiInterface {
    getCorrection(params: TrackGetCorrectionParams): Promise<TrackGetCorrectionResponse>;
    getInfo<T extends OptionalUserPlayCount = undefined>(params: TrackGetInfoParams): Promise<TrackGetInfoResponse<T>>;
    getSimilar(params: TrackGetSimilarParams): Promise<TrackGetSimilarResponse>;
    getTags(params: TrackGetTagsParams): Promise<TrackGetTagsResponse>;
    getTopTags(params: TrackGetTopTagsParams): Promise<TrackGetTopTagsResponse>;
    search(params: TrackSearchParams): Promise<TrackSearchParamsResponse>;
}
interface TrackApiInterface {
    getCorrection(params: TrackGetCorrectionParams): Promise<TrackGetCorrectionResponse>;
    getInfo<T extends OptionalUserPlayCount = undefined>(params: TrackGetInfoParams): Promise<TrackGetInfoResponse<T>>;
    getSimilar(params: TrackGetSimilarParams): Promise<TrackGetSimilarResponse>;
    getTags(params: TrackGetTagsParams): Promise<TrackGetTagsResponse>;
    getTopTags(params: TrackGetTopTagsParams): Promise<TrackGetTopTagsResponse>;
    search(params: TrackSearchParams): Promise<TrackSearchParamsResponse>;
}
declare class LastFm implements LastFmInterface {
    user: UserApi;
    library: LibraryApi;
    geo: GeoApi;
    chart: ChartApi;
    tag: TagApi;
    album: AlbumApi;
    artist: ArtistApi;
    track: TrackApi;
    constructor(apiKey: string);
}
interface LastFmInterface {
    user: UserApi;
    library: LibraryApi;
    geo: GeoApi;
    chart: ChartApi;
    tag: TagApi;
    album: AlbumApi;
    artist: ArtistApi;
    track: TrackApi;
}
export { LastFm, ApiClientError, ApiError, Image, AttrPagination, Registered, UtcDate, Wiki, OpenSearch, User, Artist, Track, Album, Tag };

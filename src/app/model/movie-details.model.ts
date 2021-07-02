import { GenresModel } from './genre.model';
import { LanguageModel } from './language.model';

export interface MovieDetailsModel {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        backdrop_path: string;
        id: number;
        name: string;
        poster_path: string;
    };
    budget: number;
    genres: GenresModel[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: LanguageModel[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

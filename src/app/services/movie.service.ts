import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { GenreModel } from '../model/genre.model';
import { LanguageModel } from '../model/language.model';
import { MovieModel } from '../model/movie.model';
import { MovieDetailsModel } from '../model/movie-details.model';

@Injectable()

export class MovieService {
    apiUrl = 'https://api.themoviedb.org/3/';
    discoverUrl = 'discover/movie';
    genreUrl = 'genre/movie/list';
    languageUrl = 'configuration/languages';
    searchUrl = 'search/movie';
    apiKey = '?api_key=8f599c5e623c3e3a606c7242f5b33884';

    constructor(private httpClient: HttpClient) {
    }

    public getMovies(page?: number, genres?: string, language?: string): Observable<MovieModel> {
        return this.httpClient.get<MovieModel>(this.apiUrl + this.discoverUrl + this.apiKey
            + (page ? ('&page=' + page) : '')
            + (genres ? ('&with_genres=' + genres) : '')
            + (language ? ('&with_original_language=' + language) : ''));
    }

    public getMovieDetails(movieId: number): Observable<MovieDetailsModel> {
        return this.httpClient.get<MovieDetailsModel>(this.apiUrl + 'movie/' + movieId + this.apiKey);
    }

    public getMoviesGenre(): Observable<GenreModel> {
        return this.httpClient.get<GenreModel>(this.apiUrl + this.genreUrl + this.apiKey);
    }

    public getLanguages(): Observable<LanguageModel[]> {
        return this.httpClient.get<LanguageModel[]>(this.apiUrl + this.languageUrl + this.apiKey);
    }

    public searchMovie(title: string, page?: number): Observable<MovieModel> {
        return this.httpClient.get<MovieModel>(this.apiUrl + this.searchUrl + this.apiKey + (title ? ('&query=' + title) : ''));
    }
}

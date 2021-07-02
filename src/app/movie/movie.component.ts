import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { zip } from 'rxjs';
import { GenreModel } from '../model/genre.model';
import { LanguageModel } from '../model/language.model';
import { MovieModel } from '../model/movie.model';
import { debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

    public movies: MovieModel;
    public filtersForm: FormGroup;
    public genres: GenreModel;
    public languages: LanguageModel[];
    public isLoading = true;

    constructor(private movieService: MovieService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.getMovies();

        zip(this.movieService.getMoviesGenre(), this.movieService.getLanguages()).subscribe(([genres, languages]) => {
            this.genres = genres;
            this.languages = languages;
        });

        this.filtersForm = this.formBuilder.group({
            'search': [''],
            'genre': [''],
            'language': [''],
        });

        this.filtersForm.get('search').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(value => {
                this.isLoading = true;
                if ( value && value.length > 0 ) {
                    return this.searchMovie(value);
                } else {
                    return this.movieService.getMovies().pipe(finalize(() => {
                        this.isLoading = false;
                    }));
                }
            })).subscribe(movies => {
            this.movies = movies;
        });
    }

    public goToDetails(movieId: number) {
        this.router.navigateByUrl('/movie/' + movieId);
    }

    public submitForm() {
        if ( this.filtersForm.controls['genre'].value || this.filtersForm.controls['language'].value ) {
            this.getMovies(1, this.filtersForm.controls['genre'].value,
                this.filtersForm.controls['language'].value);
            this.filtersForm.controls['search'].reset();
        }
    }

    public resetForm() {
        if ( this.filtersForm.controls['genre'].value || this.filtersForm.controls['language'].value ) {
            this.getMovies(1, null, null);
        }
        this.filtersForm.controls['genre'].reset();
        this.filtersForm.controls['language'].reset();
    }

    public backPage() {
        const newPage = this.movies.page - 1;
        this.changePage(newPage);
    }

    public nextPage() {
        const newPage = this.movies.page + 1;
        this.changePage(newPage);
    }

    private getMovies(page?: number, genre?: string, language?: string) {
        this.movieService.getMovies(page, genre, language).subscribe(movies => {
            this.movies = movies;
            this.isLoading = true;
        }, () => {
        }, () => {
            this.isLoading = false;
        });
    }

    private changePage(newPage: number) {
        if ( this.filtersForm.get('search').value ) {
            this.movieService.searchMovie(this.filtersForm.controls['search'].value, newPage).subscribe(movies => {
                this.movies = movies;
            });
        } else if ( this.filtersForm.controls['genre'].value || this.filtersForm.controls['language'].value ) {
            this.getMovies(newPage, this.filtersForm.controls['genre'].value,
                this.filtersForm.controls['language'].value);
        }

    }

    private searchMovie(value) {
        if ( value ) {
            this.filtersForm.controls['genre'].reset();
            this.filtersForm.controls['language'].reset();
            return this.movieService.searchMovie(value).pipe(finalize(() => {
                this.isLoading = false;
            }));
        }
    }

}

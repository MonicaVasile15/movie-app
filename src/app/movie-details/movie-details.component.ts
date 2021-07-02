import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsModel } from '../model/movie-details.model';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

    public movie: MovieDetailsModel;

    constructor(private movieService: MovieService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.movieService.getMovieDetails(this.activatedRoute.snapshot.params['id']).subscribe(movie => this.movie = movie);
    }

}

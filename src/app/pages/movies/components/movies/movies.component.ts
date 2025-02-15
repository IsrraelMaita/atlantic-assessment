import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '../../models/movies.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  moviesList: Movie[] = [];
  movie!: Movie;
  currentPage = 1;
  totalPages = 0;
  totalMovies = 0;
  ready = false;

  constructor(private moviesService: MoviesService) {

  }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (resp) => {
        this.moviesList = resp.results;
        this.movie = this.moviesList[0];
        this.currentPage = resp.page;
        this.totalMovies = resp.total_results;
        this.totalPages = resp.total_pages;
        this.ready = true;
      },
      error: (err: HttpErrorResponse) => {
        console.log('error ',err);
      }
    })
  }
}

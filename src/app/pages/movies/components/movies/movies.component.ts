import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '../../models/movies.model';
import { PAGINATION_ITEMS } from 'src/app/resources/pagination-items';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  moviesList: Movie[] = [];
  paginationItems = PAGINATION_ITEMS;
  currentPage = 1;
  totalPages = 0;
  totalMovies = 0;

  constructor(
    private moviesService: MoviesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(specificPage?: number) {

    const queryParams = specificPage !== undefined ? `?page=${specificPage}` : ''

    this.moviesService.getMovies(queryParams).subscribe({
      next: (resp) => {
        this.moviesList = resp.results;
        this.currentPage = resp.page;
        this.totalMovies = resp.total_results;
        this.totalPages = resp.total_pages;
        this.enablePaginationButtons();
      },
      error: (err: HttpErrorResponse) => {
          this.snackBar.open(err.error.status_message, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        this.currentPage = 1;
        this.enablePaginationButtons();
      }
    })
  }

  onPaginate(action: string): void {
    switch (action) {
      case 'start':
        this.currentPage = 1;
        break;
      case 'prev':
        this.currentPage--;
        break;
      case 'next':
        this.currentPage++;
        break;
      case 'end':
        this.currentPage = this.totalPages;
        break;
    }

    this.disablePagination();
    this.getMovies(this.currentPage);
  }

  disablePagination(): void {
    this.paginationItems.forEach((item) => {
      item.disabled = true;
    })
  }

  enablePaginationButtons(): void {
    if (this.currentPage === 1) {
      this.paginationItems[0].disabled = true;
      this.paginationItems[1].disabled = true;
      this.paginationItems[2].disabled = false;
      this.paginationItems[3].disabled = false;
    }
    else if (this.currentPage === this.totalPages) {
      this.paginationItems[0].disabled = false;
      this.paginationItems[1].disabled = false;
      this.paginationItems[2].disabled = true;
      this.paginationItems[3].disabled = true;  
    }
    else {
      this.paginationItems.forEach((item) => {
        item.disabled = false;
      })
    }
  }

}

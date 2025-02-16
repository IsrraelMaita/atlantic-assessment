import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';

import { Genre, Movie, MovieQueryParams } from '../../models/movies.model';
import { MoviesService } from '../../services/movies.service';
import { ColorSchemeService } from 'src/app/core/services/color-scheme.service';
import { NavigationButtons, PAGINATION_ITEMS, SORT_BY_TYPES } from 'src/app/resources/filter-items';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  paginationItems = PAGINATION_ITEMS;
  selectedGenres: string[] = [];
  sortByTypes = SORT_BY_TYPES;
  moviesList: Movie[] = [];
  genresList: Genre[] = [];
  selectedSortType = '';
  years: number[] = [];
  isDarkMode = false;
  selectedYear = 0;
  currentPage = 1;
  totalMovies = 0;
  totalPages = 0;

  constructor(
    private moviesService: MoviesService,
    private colorSchemeService: ColorSchemeService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.isDarkMode = this.colorSchemeService.isDarkTheme();
    this.handleSuscriptions();
    this.formatYearsList();
    this.getGenres();
    this.getMovies();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  handleSuscriptions(): void {
    this.colorSchemeService.colorSchemaChangeListener().subscribe((_) => {
      this.isDarkMode = this.colorSchemeService.isDarkTheme();
    })
  }

  formatYearsList(): void {
    const currentYear = new Date().getFullYear();
    // Last 50 years 
    for (let i = 0; i <= 50; i++) {
      this.years.push(currentYear-i);
    }
  }

  getGenres(): void {
    this.moviesService.getMoviesGenres().subscribe(({
      next: (resp) => {
        this.genresList = resp.genres;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.status_message, 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      this.currentPage = 1;
      this.getMovies();
    }
    }))
  }

  getMovies() {

    const queryParams = this.formatQueryParams();

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
        this.onSearch();
      }
    })
  }

  onPaginate(action: string): void {
    switch (action) {
      case NavigationButtons.start:
        this.currentPage = 1;
        break;
      case NavigationButtons.previous:
        this.currentPage--;
        break;
      case NavigationButtons.next:
        this.currentPage++;
        break;
      case NavigationButtons.end:
        this.currentPage = this.totalPages;
        break;
    }

    this.disablePagination();
    this.getMovies();
  }

  disablePagination(): void {
    this.paginationItems.forEach((item) => {
      item.disabled = true;
    })
  }

  enablePaginationButtons(): void {
    if (this.currentPage === 1) {
      this.paginationItems.forEach((item) => {
        const paginateToStart = 
          item.action === NavigationButtons.start ||
          item.action === NavigationButtons.previous;
        if (paginateToStart) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      })
    } else if (this.currentPage === this.totalPages) {
      this.paginationItems.forEach((item) => {
        const paginateToEnd =
          item.action === NavigationButtons.end ||
          item.action === NavigationButtons.next;
        if (paginateToEnd) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      })
    } else {
      this.paginationItems.forEach((item) => {
        item.disabled = false;
      })
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.getMovies();
  }

  formatQueryParams(): string {
    
    // Set page to search
    let finalQuery = `?${MovieQueryParams.currentPage}=${this.currentPage}`;

    // Set sort type
    if (this.selectedSortType) {
      finalQuery += `&${MovieQueryParams.sortType}=${this.selectedSortType}`;
    }

    // Set selected genres
    if (this.selectedGenres.length > 0) {
      let genresQuery = ''
      this.selectedGenres.forEach((genre) => {
        if (genresQuery === '') {
          genresQuery += `${genre}`;  
        } else {
          genresQuery += `|${genre}`;
        }
      });
      finalQuery += `&${MovieQueryParams.genres}=${genresQuery}`;
    }

    // Set selected release year
    if (this.selectedYear) {
      finalQuery += `&${MovieQueryParams.releaseYear}=${this.selectedYear}`;
    }

    return finalQuery;
  }
}

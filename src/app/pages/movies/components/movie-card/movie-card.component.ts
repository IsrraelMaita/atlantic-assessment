import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { Movie } from '../../models/movies.model';
import { ColorSchemeService } from 'src/app/core/services/color-scheme.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnDestroy {

  movieImageURL = `https://image.tmdb.org/t/p/w500`;
  showFullInfo = false;
  isDarkMode = false;

  destroy$ = new Subject<boolean>();

  @Input() movie!: Movie;

  constructor(private colorSchemeService: ColorSchemeService) { }

  ngOnInit(): void {
    this.movieImageURL += this.movie.poster_path
    this.isDarkMode = this.colorSchemeService.isDarkTheme();
    this.handleSuscriptions();
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

  onMouseEnter(): void {
    this.showFullInfo = true;
  }

  onMouseLeave(): void {
    this.showFullInfo = false;
  }

}

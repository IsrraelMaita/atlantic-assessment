import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MoviesResponse } from '../models/movies.model';
import { ApiClientPrefixBuilderService } from 'src/app/core/services/api-client-prefix-builder.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private urls = {
    movies: this.apiClientPrefixBuilderService.forApi('discover/movie'),
  };
  constructor(
    private httpClient: HttpClient,
    private apiClientPrefixBuilderService: ApiClientPrefixBuilderService
  ) {}

  getMovies(queryString?: string): Observable<MoviesResponse> {
    return this.httpClient.get<MoviesResponse>(`${this.urls.movies}${queryString}`);
  }
}

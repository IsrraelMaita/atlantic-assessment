import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiClientPrefixBuilderService } from 'src/app/core/services/api-client-prefix-builder.service';
import { ActorResponse } from '../models/actors.model';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  private urls = {
    actors: this.apiClientPrefixBuilderService.forApi('person/popular'),
  };
  constructor(
    private httpClient: HttpClient,
    private apiClientPrefixBuilderService: ApiClientPrefixBuilderService
  ) {}

  getActors(page: number): Observable<ActorResponse> {
    return this.httpClient.get<ActorResponse>(`${this.urls.actors}?page=${page}`);
  }
}

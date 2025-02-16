import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiClientPrefixBuilderService } from 'src/app/core/services/api-client-prefix-builder.service';

interface AccountDetail {
  avatar: {
    gravatar: {
      hash: string;
    },
    tmdb: {
      avatar_path: null;
    }
  },
  id: number,
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private urls = {
    account: this.apiClientPrefixBuilderService.forApi('account/21820591'),
  };
  constructor(
    private httpClient: HttpClient,
    private apiClientPrefixBuilderService: ApiClientPrefixBuilderService
  ) {}

  getAccountDetail(): Observable<AccountDetail> {
    return this.httpClient.get<AccountDetail>(this.urls.account);
  }
}
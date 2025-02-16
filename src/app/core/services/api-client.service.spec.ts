import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';
import { ApiClientPrefixBuilderService } from './api-client-prefix-builder.service';

describe('ApiClientService', () => {
  let apiClientService: ApiClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiClientService, ApiClientPrefixBuilderService]
    });

    apiClientService = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve data from API', () => {
    const mockData = {
      avatar: {
        gravatar: {
          hash: "8556c6763c5c62967cc760b06ed77b3f"
        },
        tmdb: {
          avatar_path: null
        }
      },
      id: 21820591,
      iso_639_1: "en",
      iso_3166_1: "AR",
      name: "",
      include_adult: false,
      username: "imaita"
    };

    console.log('??');

    // Call the service method
    apiClientService.getAccountDetail().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    console.log('++');

    // Expect an HTTP GET request to the API URL
    const req = httpMock.expectOne('https://api.themoviedb.org/3/account/21820591');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockData);
  });
});
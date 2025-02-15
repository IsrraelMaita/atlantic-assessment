export class ApiClientPrefixBuilderService {
  constructor() {}
  forApi(route: string): string {
    return 'https://api.themoviedb.org/3/'.concat(route);
  }
}
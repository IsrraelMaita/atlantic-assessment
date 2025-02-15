import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzkzZmIxMWQ1MmNkMmI1ZjkzYzEzM2RkYmUxMjY5OCIsIm5iZiI6MTczOTY1MDE5MS41MDcsInN1YiI6IjY3YjBmNDhmMmE5ZTk2ZGE4ZDZjNTI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUVAE6GR-PPowHxqBCxjnDXGst6-0ayilcsonzIjF7c';
    
    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(headers);
  }
}

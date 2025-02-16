import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MovieCardComponent } from './movie-card.component';
import { MaterialModule } from 'src/app/modules/material.module';

describe('MyComponent', () => {
  let movieCardComponent: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      imports: [MaterialModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    movieCardComponent = fixture.componentInstance;
    const movieMockUp = {
      adult: false,
      backdrop_path: "/zo8CIjJ2nfNOevqNajwMRO6Hwka.jpg",
      genre_ids: [
        16,
        12,
        10751,
        35
      ],
      id: 1241982,
      original_language: "en",
      original_title: "Moana 2",
      overview: "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
      popularity: 4401.583,
      poster_path: "/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",
      release_date: "2024-11-21",
      title: "Moana 2",
      video: false,
      vote_average: 7.222,
      vote_count: 1500
    };

    movieCardComponent.movie = movieMockUp;
    fixture.detectChanges();
  });

  it('should display movie name', () => {
    fixture.detectChanges();
    const divElement = fixture.debugElement.query(By.css('#movie-title')).nativeElement;
    expect(divElement.textContent).toBe('Moana 2');
  });
});
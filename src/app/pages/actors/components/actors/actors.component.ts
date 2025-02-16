import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'
;
import { Actor } from '../../models/actors.model';
import { ActorsService } from '../../services/actors.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {

  actorsList: Actor[] = []
  disabledRefresh = false;

  constructor(
    private actorsService: ActorsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getActors();
  }

  getActors(): void {
    this.actorsList = [];
    this.disabledRefresh = true;
    const page = this.getRandomPage(40);
    this.actorsService.getActors(page).subscribe({
      next: (resp) => {
        this.actorsList = resp.results;
        this.disabledRefresh = false;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.status_message, 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.actorsList = [];
        this.disabledRefresh = false;
      }
    })
  }

  getRandomPage(limit: number): number {
    return Math.floor(Math.random() * limit) + 1;
  }


}

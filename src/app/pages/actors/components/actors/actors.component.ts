import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Component, OnInit, ViewChild } from '@angular/core';
;
import { Actor } from '../../models/actors.model';
import { ActorsService } from '../../services/actors.service';
import { ActorsChartsComponent } from '../actors-charts/actors-charts.component';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {

  actorsList: Actor[] = []
  disabledActions = false;

  @ViewChild(ActorsChartsComponent) actorsChartsComponent!: ActorsChartsComponent;

  constructor(
    private actorsService: ActorsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getActors();
  }

  getActors(): void {
    this.actorsList = [];
    this.disabledActions = true;
    const page = this.getRandomPage(40);
    this.actorsService.getActors(page).subscribe({
      next: (resp) => {
        this.actorsList = resp.results;
        this.disabledActions = false;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.status_message, 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.actorsList = [];
        this.disabledActions = false;
      }
    })
  }

  getRandomPage(limit: number): number {
    return Math.floor(Math.random() * limit) + 1;
  }

  onDrawBarChart(): void {
    this.actorsChartsComponent.createBarChart()
  }

  onDrawPieChart(): void {
    this.actorsChartsComponent.createPieChart()
  }

}

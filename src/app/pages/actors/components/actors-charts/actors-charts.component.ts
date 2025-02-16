import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { Chart, ChartType } from 'chart.js/auto';
import { Actor } from '../../models/actors.model';
import { CHART_COLORS } from 'src/app/utils/filter-items';
import { ColorSchemeService } from 'src/app/core/services/color-scheme.service';

@Component({
  selector: 'app-actors-charts',
  templateUrl: './actors-charts.component.html',
  styleUrls: ['./actors-charts.component.scss']
})
export class ActorsChartsComponent implements OnInit, OnDestroy {
  
  destroy$ = new Subject<boolean>();

  chart!: Chart;
  isDarkMode = false;
  selectedChart = 0;

  @Input() actorsList: Actor[] = [];

  constructor(private colorSchemeService: ColorSchemeService) { }

  ngOnInit(): void {
    this.isDarkMode = this.colorSchemeService.isDarkTheme();
    this.handleSuscriptions();
    this.createBarChart();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  handleSuscriptions(): void {
    this.colorSchemeService.colorSchemaChangeListener().subscribe((_) => {
      this.isDarkMode = this.colorSchemeService.isDarkTheme();
      if (this.selectedChart === 0) {
        this.createBarChart();
      } else {
        this.createPieChart();
      }
    })
  }

  createBarChart(): void {
    this.selectedChart = 0;
    if (this.chart) {
      this.chart.destroy()
    }
    const datasetss: { label: string; data: number[]; fill: boolean; backgroundColor: string; }[] = [];
    this.actorsList.forEach((actor, index) => {

      let popularity = 0;

      actor.known_for.forEach((movie) => {
        popularity += movie.popularity;
      });

      popularity += actor.popularity;

      datasetss.push({
        label: actor.name,
        data: [popularity],
        fill: false,
        backgroundColor: index < 20? CHART_COLORS[index] : '#ffffff' ,
      })
    })

    const data = {
      labels: ["Popularity"],
      datasets: datasetss
    }
    this.chart = new Chart("chart",{
      type: 'bar' as ChartType,
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: this.isDarkMode ? 'white' : 'black',
              font: {
                size: 16,
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'gray',
              lineWidth: 2
              
            },
            ticks: {
              color: this.isDarkMode ? 'white' : 'black',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          y: {
            grid: {
              color: 'gray',
              lineWidth: 2,
            },
            ticks: {
              color: this.isDarkMode ? 'white' : 'black',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          }
        }
      }
    })
  }

  createPieChart(): void {
    this.selectedChart = 1;
    if (this.chart) {
      this.chart.destroy()
    }
    const labels: string[] = [];
    const popularityList: number[] = []
    this.actorsList.forEach((actor) => {
      labels.push(actor.name);
      let popularity = 0;
      actor.known_for.forEach((movie) => {
        popularity += movie.popularity;
      });
      popularity += actor.popularity;
      popularityList.push(popularity);
    })

    const data = {
      labels,
      datasets: [
        {
          label: 'Popularity',
          data: popularityList,
          backgroundColor: Object.values(CHART_COLORS),
        },
      ]
    }
    this.chart = new Chart("chart",{
      type: 'pie' as ChartType,
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: this.isDarkMode ? 'white' : 'black',
              font: {
                size: 16,
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'gray',
              lineWidth: 2
              
            },
            ticks: {
              color: this.isDarkMode ? 'white' : 'black',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          y: {
            grid: {
              color: 'gray',
              lineWidth: 2,
            },
            ticks: {
              color: this.isDarkMode ? 'white' : 'black',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          }
        }
      }
    })
  }
}

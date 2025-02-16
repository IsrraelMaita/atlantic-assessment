import { Component, Input, OnInit } from '@angular/core';

import { Chart, ChartType } from 'chart.js/auto';
import { Actor } from '../../models/actors.model';
import { CHART_COLORS } from 'src/app/utils/filter-items';

@Component({
  selector: 'app-actors-charts',
  templateUrl: './actors-charts.component.html',
  styleUrls: ['./actors-charts.component.scss']
})
export class ActorsChartsComponent implements OnInit {
  chart!: Chart;
  @Input() actorsList: Actor[] = []

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
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
        plugins: {
          legend: {
            labels: {
              color: 'white',
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
              color: 'white',
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
              color: 'white',
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

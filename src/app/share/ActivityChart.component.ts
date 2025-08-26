import { Component } from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';


@Component({
  selector: 'app-activity-chart',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  template: `
    <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <h2 class="text-lg font-bold mb-4 dark:text-white">نمودار فعالیت</h2>
      <canvas baseChart
        [data]="chartData"
        [options]="chartOptions"
        [type]="'line'">
      </canvas>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      width: 100%;
      max-width: 700px;
      margin: auto;
    }
    canvas {
      display: block;
      width: 100% !important;
      height: 400px !important;
    }
  `]
})
export class ActivityChartComponent {
  chartData = {
    labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'],
    datasets: [
      {
        label: 'فعالیت کاربران',
        data: [12, 19, 3, 5, 2],
        borderColor: 'blue',
        backgroundColor: 'rgba(30,144,255,0.3)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'روزهای هفته'
        },
        ticks: { color: '#000' },
        grid: { display: true }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'میزان فعالیت'
        },
        ticks: { color: '#000' },
        grid: { display: true }
      }
    }
  };
}

import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  public delay = false;
  public neihboorHoodchart = [];
  public yearExpandValue = 6;
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[];

  // Doughnut
  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartType = 'doughnut';

  public radarChartType = 'radar';
  // Pie
  public pieChartLabels: string[] = ['Idoso', 'Gestante', 'Criança'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  // PolarArea
  public polarAreaChartLabels: string[];
  public polarAreaChartData: number[];

  public polarAreaChartType = 'polarArea';
  // lineChart
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(253, 252, 243,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(253, 252, 243,0.2)',
      borderColor: 'rgba(1,31,75)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(175,238,238,0.2)',
      borderColor: 'rgba(225,5,49)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(253, 252, 243,0.2)',
      borderColor: 'rgba(91,31,75)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }


  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
  ngOnInit() {
    this.fillNeighboorhood();
    this.fillCredentialType();
    this.fillByMonthCurrentYear();
    this.fillBarChartData();
  }

  fillNeighboorhood() {
    this.dashboardService
      .getNeighborhood()
      .map(res => {
        this.polarAreaChartLabels = res.map(data => data[0]);
        this.polarAreaChartData = res.map(data =>  data[1]);
      })
      .subscribe();
  }

  fillCredentialType() {
    this.dashboardService
      .getCredentialType()
      .map(res => {

        this.doughnutChartLabels = res.map(data => data[0]);
        this.doughnutChartData = res.map(data => data[1]);
      })
      .subscribe();
  }

  fillByMonthCurrentYear() {
    const gelsonArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const penultimate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const antiPenultimate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const tetra = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.dashboardService
      .getByMonthCurrentYear()
      .map(res => {
        if (typeof res[0] !== 'undefined') {
          res[0].forEach(function (reg) {
            if (typeof reg[1] !== 'undefined' && reg.length > 0) {
              gelsonArray[reg[0] - 1] += reg[1];
            }
          });
        }

        if (typeof res[1] !== 'undefined') {
          res[1].forEach(function (reg) {
            if (typeof reg[1] !== 'undefined' && reg.length > 0) {
              penultimate[reg[0] - 1] += reg[1];
            }
          });
        }

        if (typeof res[2] !== 'undefined') {
          res[2].forEach(function (reg) {
            if (typeof reg[1] !== 'undefined' && reg.length > 0) {
              antiPenultimate[reg[0] - 1] += reg[1];
            }
          });
        }

        if (typeof res[3] !== 'undefined') {
          res[3].forEach(function (reg) {
            if (typeof reg[1] !== 'undefined' && reg.length > 0) {
              tetra[reg[0] - 1] += reg[1];
            }
          });
        }

        const currentyear = new Date().getFullYear();
        this.lineChartData = [
          { data: gelsonArray, label: currentyear },
          { data: penultimate, label: currentyear - 1 },
          { data: antiPenultimate, label: currentyear - 2 },
          { data: antiPenultimate, label: currentyear - 3 }
        ];


        this.lineChartLabels = [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ];
        this.delay = true;
      })
      .subscribe();
  }

  fillBarChartData() {
    const elderArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const childrenArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const pregnantArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const deficientArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.dashboardService
      .fillBarChartData()
      .map(res => {
        if (typeof res[0] !== 'undefined') {
          res.forEach(function (reg) {
            if (typeof reg[2] !== 'undefined' && reg.length > 0 && reg[0] === 'IDOSO') {
              elderArray[reg[2] - 1] += reg[1];
            }
          });
        }

        if (typeof res[0] !== 'undefined') {
          res.forEach(function (reg) {
            if (typeof reg[2] !== 'undefined' && reg.length > 0 && reg[0] === 'INFANTIL') {
              childrenArray[reg[2] - 1] += reg[1];
            }
          });
        }

        if (typeof res[0] !== 'undefined') {
          res.forEach(function (reg) {
            if (typeof reg[2] !== 'undefined' && reg.length > 0 && reg[0] === 'GESTANTE') {
              pregnantArray[reg[2] - 1] += reg[1];
            }
          });
        }

        if (typeof res[0] !== 'undefined') {
          res.forEach(function (reg) {
            if (typeof reg[2] !== 'undefined' && reg.length > 0 && reg[0] === 'DEFICIENTE') {
              deficientArray[reg[2] - 1] += reg[1];
            }
          });
        }

        this.barChartData = [
          { data: elderArray, label: 'Idoso' },
          { data: childrenArray, label: 'Infantil' },
          { data: pregnantArray, label: 'Gestante' },
          { data: deficientArray, label: 'Deficiente' },
        ];

      }).subscribe();

    this.barChartLabels = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ]


  }
  toggleYearSize(num) {
    this.yearExpandValue = num;
  }

  constructor(private dashboardService: DashboardService) { }
}

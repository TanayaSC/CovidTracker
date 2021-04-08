import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary }  from '/home/mxgbc/Desktop/covidwebsite/src/app/models/global-data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    totalConfirmed = 0;
    totalRecovered = 0;
    totalActive = 0;
    totalDeaths = 0;
    globalData:  GlobalDataSummary[];
    pieChart:  GoogleChartInterface= {
        chartType : 'pieChart'
    }

  constructor(private dataService: DataServiceService) { }


initChart(){
     let datatable = [];
     datatable.push(["country" , "cases"])
     this.globalData.forEach(cs=>{
         datatable.push([
             cs.country , cs.confirmed
            ])
         })
        console.log(datatable);
   this.pieChart  = {
    chartType: 'PieChart',
    dataTable: datatable,
         
    //firstRowIsData: true,
    options: {"country": "cases"}
  };
}


  ngOnInit(): void {
      this.dataService.getGlobalData().subscribe({
        next: (result)=>{
            console.log(result);
            this.globalData = result;
        result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
            this.totalActive =cs.active
            this.totalConfirmed =cs.confirmed
            this.totalDeaths =cs.deaths
            this.totalRecovered =cs.active
            }
        })
        this.initChart();
        }
      }
         
      )
  }

}

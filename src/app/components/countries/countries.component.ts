import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
    data: GlobalDataSummary[];
    countries:string[]=[];
@Input('totalConfirmed')
totalConfirmed;
@Input('totalRecovered')
totalRecovered;
@Input('totalActive')
totalActive;
@Input('totalDeaths')
totalDeaths;

  constructor(private service : DataServiceService) { }

  ngOnInit(): void {
      this.service.getGlobalData().subscribe(result=> {
        this.data = result;
        this.data.forEach(cs=>{
            this.countries.push(cs.country)
        })
      })

    
    }
     updateValues(coutry : string){
        console.log(coutry);
        this.data.forEach(cs=>{
            if(cs.country = coutry){
                this.totalActive=cs.active;
                this.totalActive=cs.deaths;
                this.totalActive=cs.recovered;
                this.totalActive=cs.confirmed;

            }
        })
     }
}





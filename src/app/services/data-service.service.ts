import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
    private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-07-2021.csv';
  constructor( private http: HttpClient) { }
  getGlobalData(){
     return this.http.get(this.globalDataUrl,{responseType: 'text'}).pipe(
      map(result =>{
let data :GlobalDataSummary[] = [];
let raw = {}
        let rows= result.split('\n');
        rows.splice(0,1);
        console.log(rows);
        rows.forEach(row =>{
            let cols = row.split(',');


            let cs={
                country: cols[3],
                confirmed: +cols[7],
                active: +cols[10],
                recovered: +cols[9],
                deaths:+cols[8]
            }
            let temp: GlobalDataSummary = raw[cs.country];
            if (temp){
                temp.active=cs.active+temp.active
                temp.confirmed=cs.active+temp.confirmed
                temp.recovered=cs.active+temp.recovered
                temp.deaths=cs.active+temp.deaths

                raw[cs.country]=temp;
            }else {
                raw[cs.country] = cs;
            }
            
            
            
        } )

        return <GlobalDataSummary[]>Object.values (raw);
        
      } )
      )
  }
}

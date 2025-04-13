import { Component, inject, NgModule, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  masterSrv = inject(MasterService);
  locations$: Observable<any[]> = new Observable<any[]>

  @NgModule() searchObj:any = {
    fromLocation: '',
    toLocation: '',
    travelDate:''
  }
 
  busList: any[] = [];

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations(){
    this.locations$ = this.masterSrv.getLocations()
  }
  
  onSearch() {
    const {fromLocation, toLocation, travelDate} = this.searchObj;
    this.masterSrv.searchBus(fromLocation, toLocation, travelDate).subscribe((res:any) => {
       this.busList = res;
       console.log(this.busList)
    })
  }
}

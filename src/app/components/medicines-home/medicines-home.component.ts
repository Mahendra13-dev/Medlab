import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { UtilityService } from 'src/app/core/utility.service';

@Component({
  selector: 'app-medicines-home',
  templateUrl: './medicines-home.component.html',
  styleUrls: ['./medicines-home.component.css'],
})
export class MedicinesHomeComponent {
  pincode: string ="33333";
  city: string = "Jaipur";
  searchSubject:Subject<string>= new Subject<string>();

  searchProduct:string="";
  medicines:any=[];
  
  

  constructor(private api: ApiService,private utility:UtilityService) {}
  ngOnInit(){
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query:string) => 
         this.api.getDataFromServer("top-deals?description_like="+this.searchProduct))
       ).subscribe({
         next: (response: any) => {
           console.log("response", response);
         this.medicines = response && response.length > 0 ? response : [];
      },
         error: (error:any) => {
           console.error("Error fetching data", error);
           
         },
       })
      
     
    }


  searchCityByPincode() {
    if(this.pincode.trim().length===6){
    const endpoint = "get-pincode-details?pincode=" + this.pincode;
    console.log(endpoint)
    this.api.getDataFromServer(endpoint).subscribe({
      next:(response:any)=>{
        console.log(response);
        if(response && response.length > 0){
          this.city = response[0].pincodeCity
          this.utility.setPinCodeDetails(response[0]);
        }
      },
      error:() => {

      }
    })
  }
}
searchProducts(){
  const trimmedSearch = this.searchProduct.trim();
  if(trimmedSearch === ''){
    this.medicines=[];
  }
  else{
    this.searchSubject.next(trimmedSearch);
  }
}

}

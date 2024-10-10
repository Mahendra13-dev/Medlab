import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private selectedPinCodeObj : any ;

  constructor() { }

  setPinCodeDetails(obj:any){
    this.selectedPinCodeObj = obj;
  }

  getPinCodeDetails(){
     return this.selectedPinCodeObj;
  }
}

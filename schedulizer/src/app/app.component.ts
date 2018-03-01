import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  selectedModelName: any;

  ngOnInit(): void {
   this.selectedModelName = 'employee';
  }


  public selectModelName(modelName: string){

    this.selectedModelName = modelName;
  }


}

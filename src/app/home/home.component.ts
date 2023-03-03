import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  command:string = "./helloWorld";
  location:string = "~";

  constructor(private toolbarService:ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.changeDisplayInfo(this.location, this.command);
  }

}

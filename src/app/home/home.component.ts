import { Component, OnInit } from '@angular/core';
import { CommandDisplayService } from './../services/command-display.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  command:string = "./helloWorld";
  location:string = "~";

  constructor(private commandDisplayService:CommandDisplayService) { }

  ngOnInit(): void {
    this.commandDisplayService.changeDisplayInfo(this.location, this.command);
  }

}

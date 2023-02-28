import { Component, OnInit } from '@angular/core';
import { CommandDisplayService } from '../services/command-display.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  command:string = "";
  location:string = "";

  constructor(private commandDisplayService:CommandDisplayService) { }

  ngOnInit(): void {
    this.commandDisplayService.changeDisplayInfoEvent.subscribe(info => {
      this.command = info.command;
      this.location = info.location;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { CommandDisplayService } from './../services/command-display.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  command:string = "ls projects";
  location:string = "desktop/cs";

  constructor(private commandDisplayService:CommandDisplayService) { }

  ngOnInit(): void {
    this.commandDisplayService.changeDisplayInfo(this.location, this.command);
  }

}

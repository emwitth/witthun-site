import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  command:string = "ls projects";
  location:string = "desktop/cs";

  constructor(private toolbarService:ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.changeDisplayInfo(this.location, this.command);
  }

}

import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  command:string = "man Evan";
  location:string = "~/resume";

  constructor(private toolbarService:ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.changeDisplayInfo(this.location, this.command);
  }

}

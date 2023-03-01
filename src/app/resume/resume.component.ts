import { Component, OnInit } from '@angular/core';
import { CommandDisplayService } from './../services/command-display.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  command:string = "man Evan";
  location:string = "~/resume";

  constructor(private commandDisplayService:CommandDisplayService) { }

  ngOnInit(): void {
    this.commandDisplayService.changeDisplayInfo(this.location, this.command);
  }

}

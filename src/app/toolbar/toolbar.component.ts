import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';
import { Location } from '@angular/common';

export interface Link {
  href:string,
  name:string,
  isSelected:boolean
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  command:string = "";
  location:string = "";

  selected: number = 0;
  localToolbarLinks: Link[] = [
    {
      href: "/",
      name: "Home",
      isSelected: false
    },
    {
      href: "/projects",
      name: "Projects",
      isSelected: false
    },
    {
      href: "/resume",
      name: "Resume",
      isSelected: false
    }
  ]

  constructor(private toolbarService:ToolbarService, private locationChecker:Location) { }

  ngOnInit(): void {
    this.toolbarService.changeDisplayInfoEvent.subscribe(info => {
      this.command = info.command;
      this.location = info.location;
    });
    
    for(let i in this.localToolbarLinks) {
      console.log(i, this.localToolbarLinks[i])
      console.log(this.locationChecker.isCurrentPathEqualTo(this.localToolbarLinks[i].href))
      if(this.locationChecker.isCurrentPathEqualTo(this.localToolbarLinks[i].href)) {
        this.localToolbarLinks[i].isSelected = true;
        this.selected = Number.parseInt(i);
      }
    }
    console.log(this.locationChecker.path())
    console.log(this.locationChecker.isCurrentPathEqualTo("/projects"));
  }

  selectLink(i:number) {
    this.localToolbarLinks[i].isSelected = true;
    this.localToolbarLinks[this.selected].isSelected = false;
    this.selected = i;
  }

}

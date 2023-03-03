import { Injectable, EventEmitter, Output } from '@angular/core';

import { CommandDisplayInfo } from '../interfaces/command-display-info';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  @Output() changeDisplayInfoEvent = new EventEmitter<CommandDisplayInfo>();

  constructor() { }

  public changeDisplayInfo(location:string, command:string) {
    var info: CommandDisplayInfo = {
      location: location,
      command: command
    }

    this.changeDisplayInfoEvent.emit(info);
  }
}

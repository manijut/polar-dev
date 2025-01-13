import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnChanges {
  @Input() data: any = {};
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}
}

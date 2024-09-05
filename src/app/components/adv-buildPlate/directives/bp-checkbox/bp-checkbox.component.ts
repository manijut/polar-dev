import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bp-checkbox',
  templateUrl: './bp-checkbox.component.html',
  styleUrls: ['./bp-checkbox.component.scss'],
})
export class BpCheckboxComponent implements OnChanges {
  @Input() data: any = {};
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('checkbox', this.data);
  }
}

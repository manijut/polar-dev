import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-bp-select',
  templateUrl: './bp-select.component.html',
  styleUrls: ['./bp-select.component.scss'],
})
export class BpSelectComponent implements OnChanges {
  @Input() data: any = {};

  constructor() {}

  ngOnChanges() {}
}

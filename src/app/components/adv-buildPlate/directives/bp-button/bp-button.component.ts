import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-bp-button',
  templateUrl: './bp-button.component.html',
  styleUrls: ['./bp-button.component.scss'],
})
export class BpButtonComponent implements OnChanges {
  @Input() data: any = {};
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data);
  }
}

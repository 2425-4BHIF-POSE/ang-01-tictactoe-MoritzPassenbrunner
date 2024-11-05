import {Component, Input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent {
  @Input() value : number = 0;

}

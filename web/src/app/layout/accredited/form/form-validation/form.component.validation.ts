import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'error-display',
  templateUrl: './form.component.validation.html',
  styleUrls: ['./form.component.validation.scss']
})
export class FormErrorDisplayComponent {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
}
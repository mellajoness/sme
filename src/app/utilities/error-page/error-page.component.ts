import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  @Input() errorMessage: string;
  constructor() { }

  close() {

  }
  ngOnInit() {
  }

}

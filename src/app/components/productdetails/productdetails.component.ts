import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/Business/Shared/sharedservices/shared.components';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  constructor(
    public sharedData: SharedData
  ) { }

  ngOnInit() {
  }

}

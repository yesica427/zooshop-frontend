import { Component, OnInit } from '@angular/core';
import {faPaw} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
fapaw=faPaw;
  constructor() { }

  ngOnInit(): void {
  }

}

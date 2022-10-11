import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'planos-home',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  public isCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}


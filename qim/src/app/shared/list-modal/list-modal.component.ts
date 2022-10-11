import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.css']
})
export class ListModalComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() headers: string[] = [];
  @Input() items = [];
  paginaAtual = 1;


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  
  onClose() {
    this.bsModalRef.hide();
  }

}

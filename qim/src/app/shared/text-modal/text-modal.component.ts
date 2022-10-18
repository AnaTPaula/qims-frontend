import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.css']
})
export class TextModalComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() text: string | undefined;
  paginaAtual = 1;


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  
  onClose() {
    this.bsModalRef.hide();
  }

}

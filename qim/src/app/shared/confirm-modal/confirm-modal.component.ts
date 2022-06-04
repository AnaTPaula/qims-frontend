import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() body: string | undefined;
  @Input() confirm: string | undefined;
  @Input() cancel: string | undefined;
  @Input() buttomClass: string = 'btn-danger';

  confirmResult: Subject<boolean> | undefined;


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm() {
    this.confirmResult?.next(true);
    this.bsModalRef.hide();
  }
  
  onClose() {
    this.confirmResult?.next(false);
    this.bsModalRef.hide();
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Automovil } from '../models';

@Component({
  selector: 'app-modal-add-update',
  templateUrl: './modal-add-update.component.html',
  styleUrls: ['./modal-add-update.component.css']
})
export class ModalAddUpdateComponent {


  constructor(public activeModal: NgbActiveModal) { }

  //Agregar o Editar
  accion: string
  auto: Automovil;
  desde:number;
  hasta:number;



  onSubmit() {
    if (this.desde <= this.hasta) {
      this.auto.modelos = [this.desde,this.hasta];
      this.activeModal.close(this.auto);
    } else {
      this.activeModal.dismiss();
    }
  }

}

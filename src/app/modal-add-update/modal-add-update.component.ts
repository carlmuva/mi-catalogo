import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Automovil } from '../models';

@Component({
  selector: 'app-modal-add-update',
  templateUrl: './modal-add-update.component.html',
  styleUrls: ['./modal-add-update.component.css']
})
export class ModalAddUpdateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  //Agregar o Editar
  accion:string

  auto:Automovil;

  ngOnInit(): void {
  }

}

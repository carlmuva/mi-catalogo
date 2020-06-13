import { Component, OnInit } from '@angular/core';
import { AUTOMOVILES } from '../data';
import { Automovil } from '../models';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  autos: Automovil[];
  SelecionarModalAuto:Automovil;
  closeResult="";
  constructor(private modalService: NgbModal) { }
  

  ngOnInit(): void {
    this.autos = AUTOMOVILES;
  }
  open(content, auto:Automovil) {
    this.SelecionarModalAuto=auto;
    this.modalService.open(content);
    
  }

}

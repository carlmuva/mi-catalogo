import { Component, OnInit } from '@angular/core';
import { Automovil } from '../models';
import { AutosService } from '../services/autos.service';
import { ModalAddUpdateComponent } from '../modal-add-update/modal-add-update.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmActionComponent } from '../modal-confirm-action/modal-confirm-action.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  autos: Automovil[];
  page;
  pageSize;
  NoAuto: Automovil={} as Automovil;

  displayProgressBar: boolean;
  constructor(private autoService: AutosService, private modalService: NgbModal) { }

  ngOnInit(){
    this.displayProgressBar=true;
    this.pageSize=10;
    this.page = +sessionStorage.getItem('currentPage');
    this.autoService.getAutos().subscribe((response)=>{
      setTimeout(() =>{
      this.displayProgressBar= false;
      this.autos=response.data;
      },1500)

    })
  }

  openModalEditar(auto:Automovil){
    const modalRef =this.modalService.open(ModalAddUpdateComponent, {centered: true});
    modalRef.componentInstance.auto=auto;
    modalRef.componentInstance.accion='Editar';

    modalRef.result.then(
      (auto)=>{
        this.autoService.updateAutos(auto).subscribe(response=>{
          sessionStorage.setItem('currentPage',this.page.toString());
          this.ngOnInit();
          console.log(response)});
      },
      (reason)=>{console.log(reason)}
        
    )
  }

  openModalAgregar(auto:Automovil){
    const modalRef =this.modalService.open(ModalAddUpdateComponent, {centered: true});
    modalRef.componentInstance.auto=auto;
    modalRef.componentInstance.accion='Agregar';

    modalRef.result.then(
      (auto)=>{
        this.autoService.addAuto(auto).subscribe(response=>{
          sessionStorage.setItem('currentPage',this.page.toString());
          this.ngOnInit();
          console.log(response)});
        

      }
        
    );
    this.NoAuto={} as Automovil;
  }

  openModalConfirmarEliminar(auto:Automovil){
    const modalRef=this.modalService.open(ModalConfirmActionComponent,{centered: true});
    modalRef.componentInstance.auto=auto;
    modalRef.result.then(
      (autoTemp)=>{
        this.autoService.deleteAuto(autoTemp).subscribe(response =>{
          sessionStorage.setItem('currentPage',this.page.toString());
          this.ngOnInit();
          console.log("Respuesta cuando se termina de eliminar un auto")
          console.log(response)
        })
      },
      (reason)=>{
        console.log(reason)
      }
    )
  }



}

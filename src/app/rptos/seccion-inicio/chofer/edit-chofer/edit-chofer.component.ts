import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainPageService } from 'src/app/rptos/seccion-sistema/pages/main-page/services/main-page.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-chofer',
  templateUrl: './edit-chofer.component.html',
  styleUrls: ['./edit-chofer.component.css']
})
export class EditChoferComponent {
  titulo = '';
  contactosForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private choferServices: MainPageService,
      private dialogRef: MatDialogRef<EditChoferComponent>
  ) {}

  ngOnInit(): void {
      this.titulo = this.cambiarTitulo(this.data['editar']);
      this.inicializarFormulario();
  }

  crearContacto(): void {
      const choferId = this.data['result']['choferId'];
      const nombre = this.contactosForm.get('nombre')?.value;
      const telefono = this.contactosForm.get('telefono')?.value;


      if (this.contactosForm.valid) {  
        const body = { choferId: choferId, nombre: nombre, telefono: telefono }

        if(!this.data['editar']){
          this.choferServices.addClientedeEmergecia(body).subscribe((res:any) => {
              Swal.fire({
                  title: `${res['message']}`,
                  text: "",
                  icon: "success"
              }).then((result) => {
                  if(result){
                  this.dialogRef.close();
                  }
              });
          })
       }else{

          const id = this.data['result']['id'];
          const body = { id:id, choferId: choferId, nombre: nombre, telefono: telefono }
          this.choferServices.editClientedeEmergecia(body, id).subscribe((res:any) => {
              Swal.fire({
                  title: `${res['message']}`,
                  text: "",
                  icon: "success"
              }).then((result) => {
                  if(result){
                  this.dialogRef.close();
                  }
              });
          })
       }
      }
      
  }

  setContacto(): void {
      this.contactosForm.get('id')?.setValue(this.data['result']['id']);
      this.contactosForm.get('nombre')?.setValue(this.data['result']['nombre']);
      this.contactosForm.get('telefono')?.setValue(this.data['result']['telefono']);
  }

  cambiarTitulo(accion:boolean): string{
      return accion ? 'Editar contacto de emergencia': 'Agregar contacto de emergencia'
  }

  private inicializarFormulario(): void {
      this.contactosForm = this.fb.group({
        nombre: ['', Validators.required],
        telefono: ['', Validators.required],
      });
      if(this.data['editar']){
          this.setContacto();
      }
  }
}

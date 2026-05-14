import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


interface Roles {
  id:         number;
  nombre:     string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent { 

  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router);

  registroFormulario: FormGroup = this.fb.group({
    correo: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    idRol: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
  });

  roles: Roles[] = [{id: 2, nombre: "Cliente"}, {id: 3, nombre: "Chofer"}]

  constructor(){}

  //   login():void{
  //     const {email_user, password} = this.registroFormulario.value;
  //     if(!this.registroFormulario.invalid){
  //       this.authService.login(email_user, password)
  //       .subscribe(ok => {
  //         if(ok === true){
  //             this.router.navigateByUrl('/rptos/productos')
  //         }
  //         else{
  //           Swal.fire('Error', ok.toString(), 'error')
  //         }
  //       })
  //     }else{
  //       Swal.fire('Error', "Todos los parametros deben estar llenos", 'error')
  //     }
  // }

    registro():void{
      const { correo, password, idRol, nombre, apellido, cedula } = this.registroFormulario.value;
      const password_confirmation = password;
      const fechaNacimiento = '1999-01-06'
      const body = {correo, password, password_confirmation, idRol, nombre, apellido, cedula, fechaNacimiento}

      if(!this.registroFormulario.invalid){
        this.authService.registro(body)
        .subscribe(resp => {
          if(resp["estado"] === "activo"){
              Swal.fire({
                title: 'Registro Exitoso',
                text: "Vuelva a la pantalla de login e ingrese",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              }).then((result: any) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('/rptos/login')
                }
              })
          }
          else{
            Swal.fire('Error', "Hubo Un error al registrarse, hablar con soporte", 'error')
          }
        })
      }else{
        Swal.fire('Error', "Todos los parametros deben estar llenos", 'error')
      }
    }

  // login():void {
  //   const {email_user, password} = this.authFormulario.value;
  //   this.authService.login(email_user, password)
  //   .subscribe(success => {
  //     console.log(success);
  //   })
  // }

}

import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router);

  authFormulario: FormGroup = this.fb.group({
    email_user: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(){}

    login():void{
      const {email_user, password} = this.authFormulario.value;
      if(!this.authFormulario.invalid){
        this.authService.login(email_user, password)
        .subscribe(ok => {
          if(ok === true){
              this.router.navigateByUrl('/rptos/productos')
          }
          else{
            Swal.fire('Error', ok.toString(), 'error')
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

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recargar-saldo',
  templateUrl: './recargar-saldo.component.html',
  styleUrls: ['./recargar-saldo.component.css']
})
export class RecargarSaldoComponent implements OnInit {

  saldoForm!: FormGroup;
  bancos!:Array<{ nombre: string, codigo: string, id: number}>;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RecargarSaldoComponent>
  ) 
  {
    this.saldoForm = this.fb.group({
      fechaRecarga: [null, Validators.required],
      referencia: [null, Validators.required],
      idBanco: [null, Validators.required],
      monto: [null, [Validators.required]]
    });

  }

  ngOnInit(): void {
      console.log(this.data)
      this.getBancos();
  }

  recargarSaldo(): void {
    console.log(this.saldoForm.valid)
    if (this.saldoForm.valid) {
      const body = {
        fechaRecarga: formatDate(this.saldoForm.get('fechaRecarga')?.value,'yyyy-MM-dd', 'es'),
        referencia: this.saldoForm.get('referencia')?.value,
        idBanco: this.saldoForm.get('idBanco')?.value,
        monto: this.saldoForm.get('monto')?.value
      }
      console.log(body)
      this.clientService.postRescargarSaldo(body, this.data.id).subscribe(res => {
        Swal.fire({
            title: `${res['message']}`,
            text: "",
            icon: "success"
        }).then((result) => {
            if(result){
            this.dialogRef.close();
            }
        });
      });
    }
  }

  getBancos():void {
    this.clientService.getBancos().subscribe(res => {
      this.bancos = res;
    })
  }
}

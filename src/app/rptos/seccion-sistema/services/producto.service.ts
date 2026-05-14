import { environment } from "src/environments/environments";
// import { Producto } from "../interfaces";
import { computed, inject } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { HttpClient } from "@angular/common/http";

export class MainService{
    protected baseUrl: string = environment.baseUrl;
    // protected _producto: Producto[] = []
    protected authService = inject(AuthService);
    protected http = inject(HttpClient);
  
    public user = computed(() => this.authService.usuarioActual());
  
    // get producto(): Producto[]{
    //   return [...this._producto];
    // }

    
    // public set producto(v : Producto[]) {
    //   this._producto = v;
    // }
    
  
    get getBaseUrl(){
      return this.baseUrl;
    }
  
}
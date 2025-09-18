import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // private BASE_PATH = 'http://localhost/projeto-faculdade-impacta/back-end-cadastro-cliente/src/controller/ClienteController.php'
  // private API_CEP = 'http://localhost/projeto-faculdade-impacta/back-end-cadastro-cliente/src/api/CepApi.php'

  // endpoint notebook
  private API_CEP = 'http://localhost/projeto-faculdade/projeto-faculdade-impacta/back-end-cadastro-cliente/src/api/CepApi.php'
  private BASE_PATH = 'http://localhost/projeto-faculdade/projeto-faculdade-impacta/back-end-cadastro-cliente/src/controller/ClienteController.php'



  constructor(
    private _http:HttpClient
  ) { }

  public gravarNovoCliente(obj: any) {
    return this._http.post(this.BASE_PATH, obj).pipe(first())
  }

  public apiCep(cep: any) {
    return this._http.get(this.API_CEP, {
      params: {
        cep: cep
      }
    }).pipe(first())
  }
}

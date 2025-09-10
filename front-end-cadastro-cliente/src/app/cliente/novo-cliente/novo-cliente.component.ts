import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, MinLengthValidator, UntypedFormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/shared/shared.service';
import { MyErrorStateMatcher } from 'src/app/shared/erros-form';

@Component({
  selector: 'app-novo-cliente',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  formGroup!: UntypedFormGroup
  resultCep: any
  matcher = new MyErrorStateMatcher();

  constructor(
    public router: Router,
    private _fb: FormBuilder,
    private _clienteService: ClienteService,
    protected _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.formulario()
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao          : 'gravarNovoCliente',
      nome          : ['', Validators.required],
      email         : ['', [Validators.required, Validators.email]],
      celular       : ['', [Validators.required, Validators.minLength(8)]],
      dataNascimento: ['', Validators.required],
      genero        : ['', Validators.required],
      cep           : ['', [Validators.required, Validators.minLength(8)]],
      logradouro    : [{value:'', disabled: true}, Validators.required],
      complemento   : [''],
      numero        : ['', Validators.required],
      bairro        : [{value:'', disabled: true}, Validators.required],
      cidade        : [{value:'', disabled: true}, Validators.required],
      uf            : [{value:'', disabled: true}, Validators.required]
    })
  }

  consultaCep() {
    this._clienteService.apiCep(this.formGroup.get('cep')?.value).subscribe({
      next: (result: any) => {
        this.resultCep = result
        this.setEndereco(result)
      },
      error: (result: any) => {
        this._sharedService.snackbar('CEP inválido !')
      }
    })
  }

  setEndereco(data: any) {
    this.formGroup.get('logradouro')?.reset({value: data.logradouro, disabled: true})
    this.formGroup.get('complemento')?.reset({value: data.complemento, disabled: false})
    this.formGroup.get('bairro')?.reset({value: data.bairro, disabled: true})
    this.formGroup.get('cidade')?.reset({value: data.localidade, disabled: true})
    this.formGroup.get('uf')?.reset({value: data.uf, disabled: true})
  }

  onSubmit() {
    if(this.formGroup.valid) {
      this.formGroup.enable()

      this._clienteService.gravarNovoCliente(JSON.stringify(this.formGroup.value)).subscribe({
        next: (result: any) => {
          if(result.sucesso) {
            this._sharedService.snackbar(result.msg)
            this.router.navigate(['cliente/lista-clientes'])
          } else {
            this.setEndereco(this.resultCep)
            this._sharedService.snackbar(result.msg)
          }
        },
        error: (e: HttpErrorResponse) => {
          this._sharedService.snackbar(e.message)
        }
      })

    }
  }

  getErrorMessage() {
    if (this.formGroup.get('email')?.hasError('required')) {
      return 'Preencha com um e-mail válido';
    }

    return this.formGroup.get('email')?.hasError('email') ? 'E-mail inválido' : '';
  }

  getErrorCep() {
    if (this.formGroup.get('cep')?.hasError('required')) {
      return 'Preencha com um CEP válido';
    }

    return this.formGroup.get('cep')?.errors ? 'CEP inválido' : '';
  }

  getErrorCelular() {
    if (this.formGroup.get('celular')?.hasError('required')) {
      return 'Preencha com um numero de celular válido';
    }

    return this.formGroup.get('celular')?.errors ? 'Numero de celular inválido' : '';
  }

  getErrorData() {
    if (this.formGroup.get('dataNascimento')?.hasError('required')) {
      return 'Preencha com uma data valida.';
    }

    return this.formGroup.get('dataNascimento')?.errors ? 'Data de nascimento inválida.' : '';
  }

}

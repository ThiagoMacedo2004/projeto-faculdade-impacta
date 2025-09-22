import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailValidator, FormBuilder, MinLengthValidator, UntypedFormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/shared/shared.service';
import { MyErrorStateMatcher } from 'src/app/shared/erros-form';
import { Observable, switchMap } from 'rxjs';

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
  spinner: boolean = false
  idCliente!: any
  tituloCard: string = 'Cadastrar Cliente'
  iconCard: string = 'person_add'
  msgSpinner: string = ''

  constructor(
    public router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _clienteService: ClienteService,
    protected _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.obterParametroUrl()
  }

  obterParametroUrl() {
    this.spinner = true
    this.msgSpinner = 'Carregando informações do Cliente. Por favor, aguarde.'
    this._activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.tituloCard = 'Editar Cliente'
        this.iconCard = 'edit'

        this._clienteService.getCliente(params.get('id')).subscribe({
          next: (result: any) => {
            if(result.data) {
              this.setInforCliente(result.data[0])
            }
          }, error: (e: HttpErrorResponse) => {
            this.spinner = false
            this._sharedService.snackbar(`Página não encontrada... ${e.status} - ${e.statusText}`)
            this.router.navigate(['cliente/lista-clientes'])
          }
        })
      } else {
        this.spinner = false
      }
    })
  }

  setInforCliente(infoCliente: any) {

    this.spinner = false

    this.formGroup.get('acao')?.setValue('editarCliente')
    this.formGroup.get('idCliente')?.setValue(infoCliente.id)
    this.formGroup.get('nome')?.setValue(infoCliente.nome)
    this.formGroup.get('email')?.setValue(infoCliente.email)
    this.formGroup.get('celular')?.setValue(infoCliente.celular)
    this.formGroup.get('dataNascimento')?.setValue(infoCliente.data_nascimento)
    this.formGroup.get('genero')?.setValue(infoCliente.genero)
    this.formGroup.get('cep')?.setValue(infoCliente.cep)
    this.formGroup.get('logradouro')?.setValue(infoCliente.logradouro)
    this.formGroup.get('complemento')?.setValue(infoCliente.complemento)
    this.formGroup.get('numero')?.setValue(infoCliente.numero)
    this.formGroup.get('bairro')?.setValue(infoCliente.bairro)
    this.formGroup.get('cidade')?.setValue(infoCliente.cidade)
    this.formGroup.get('uf')?.setValue(infoCliente.uf)
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao          : 'gravarNovoCliente',
      idCliente     : '',
      nome          : ['', Validators.required],
      email         : ['', [Validators.required, Validators.email]],
      celular       : ['', [Validators.required, Validators.minLength(8)]],
      dataNascimento: ['', Validators.required],
      genero        : ['', Validators.required],
      cep           : ['', [Validators.required, Validators.minLength(8)]],
      logradouro    : ['', Validators.required],
      complemento   : [''],
      numero        : ['', Validators.required],
      bairro        : ['', Validators.required],
      cidade        : ['', Validators.required],
      uf            : ['', Validators.required]
    })
  }

  consultaCep() {
    this._clienteService.apiCep(this.formGroup.get('cep')?.value).subscribe({
      next: (result: any) => {
        this.resultCep = result
        this.setEndereco(result)
      },
      error: () => {
        this._sharedService.snackbar('CEP inválido !')
        this.resetEnderecoForm()
        this.formGroup.get('cep')?.reset('', Validators.required)
      }
    })
  }

  setEndereco(data: any) {
    this.formGroup.get('logradouro')?.reset(data.logradouro)
    this.formGroup.get('complemento')?.reset(data.complemento)
    this.formGroup.get('bairro')?.reset(data.bairro)
    this.formGroup.get('cidade')?.reset(data.localidade)
    this.formGroup.get('uf')?.reset(data.uf)
  }

  resetEnderecoForm() {
    this.formGroup.get('logradouro')?.reset('')
    this.formGroup.get('complemento')?.reset('')
    this.formGroup.get('bairro')?.reset('')
    this.formGroup.get('cidade')?.reset('')
    this.formGroup.get('uf')?.reset('')
  }

  onSubmit() {
    if(this.formGroup.valid) {
      this.formGroup.enable()
      this.spinner = true
      this.msgSpinner = 'Salvando Cliente. Por favor, aguarde.'
      this._clienteService.gravarNovoCliente(JSON.stringify(this.formGroup.value)).subscribe({
        next: (result: any) => {
          if(result.sucesso) {
            this._sharedService.snackbar(result.msg)
            this.router.navigate(['cliente/lista-clientes'])
          } else if(result.error) {

            this.spinner = false
            // this.setEndereco(this.resultCep)
            this._sharedService.snackbar(`${result.msg}\n${result.erro_sistema}`)
          }
        },
        error: (e: HttpErrorResponse) => {

          this.spinner = false
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

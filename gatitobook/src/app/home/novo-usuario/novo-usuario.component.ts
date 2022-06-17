import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { minusculoValidator } from './minusculo.validator';
import { NovoUsuarioService } from './novo-usuario.service';
import { Usuario } from './usuario';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

    novoUsuarioForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private novoUsuarioService: NovoUsuarioService,
        private usuarioExistenteService: UsuarioExisteService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.novoUsuarioForm = this.formBuilder.group(
            {
                email: ['', [Validators.required, Validators.email]],
                fullName: ['', [Validators.required, Validators.minLength(3)]],
                userName: ['', [minusculoValidator], [this.usuarioExistenteService.usuarioJaExiste()]],
                password: [''],
            },
            {
                validators: [usuarioSenhaIguaisValidator],
            }
        )
    }

    cadastrar() {
        if(this.novoUsuarioForm.valid){
            const novoUsuario = <Usuario>this.novoUsuarioForm.getRawValue();
            this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(() => {
                this.router.navigate(['']);
            }, (error) => {
                console.log(error)
            });
        }
    }
}

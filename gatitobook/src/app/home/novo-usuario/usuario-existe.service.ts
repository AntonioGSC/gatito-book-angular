import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { map, switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioJaExiste(){
    return (control: AbstractControl) => {
        return control.valueChanges.pipe(
            switchMap((nomeUsuario) => {
                return this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario);
            }),
            map((usuarioExiste) => {
                return usuarioExiste ? {usuarioExistente: true} : null;
            }),
            first()
        );
    }
  }
}

import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token.service';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private usuarioSubject = new BehaviorSubject<Usuario>({});

    constructor(private tokenService: TokenService) {
        if(this.tokenService.possuiToken()){
            this.decodificaJWT();
        }
    }

    retornaUsuario() {
        return this.usuarioSubject.asObservable();
    }

    salvaToken(token: string) {
        this.tokenService.salvaToken(token);
        this.decodificaJWT();
    }

    logout(){
        this.tokenService.excluirToken();
        this.usuarioSubject.next({});
    }

    estaLogado(){
        return this.tokenService.possuiToken();
    }

    private decodificaJWT() {
        const token = this.tokenService.retornaToken();
        const usuario = <Usuario>jwtDecode(token);
        this.usuarioSubject.next(usuario);
    }
}

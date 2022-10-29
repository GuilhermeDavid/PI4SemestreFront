import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/entities/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-inativos',
  templateUrl: './inativos.component.html',
  styleUrls: ['./inativos.component.css']
})
export class InativosComponent implements OnInit {
  inativos: Aluno[] = [];
  constructor(private service: AlunoService, 
    private router: Router) {} //criando um objeto de roteameno
  ngOnInit(): void {
    this.findAll();    
  } 
  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(aluno => {
        if(!aluno.ativo){
          this.inativos.push(aluno); 
        }        
      });       
    });  }

    retornar(): void {
      this.router.navigate(['']);
    }
  }
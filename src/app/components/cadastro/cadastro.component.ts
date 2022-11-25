import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/entities/aluno';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  aluno: Aluno = {
    nome: "",
    ativo: true,
    dataCadastro: new Date()
  }

  constructor(private router: Router, 
    private servico: AlunoService) { }

  ngOnInit(): void {
  }

  //Voltando a página inicial
  cancelar(): void{
    this.router.navigate([""]);
  }  

  cadastrar(): void{
    this.formatarData();
    this.servico.cadastrar(this.aluno).subscribe((resposta)=>{
      this.servico.message("Aluno cadastrado com sucesso!!!");
    }, err =>{
      this.servico.message("Erro ao cadastrar o Aluno!");
    })
  }  

  formatarData(): void{
    let data = new Date(this.aluno.dataCadastro);
    this.aluno.dataCadastro = 
    `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/entities/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit {
  aluno: Aluno = {
    nome: "",
    ativo: true,
    dataCadastro: new Date()
  }
  static Aluno: Aluno;

  constructor(private router: Router, 
    private servico: AlunoService,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.aluno.ra = this.route.snapshot.paramMap.get("ra")!;
    this.pesquisarRA();
  } 
  pesquisarRA(): void{
    this.servico.pesquisarRA(this.aluno.ra).subscribe((resposta) =>{
      this.aluno = resposta;
    })  }

  //Voltando a página inicial
  cancelar(): void{
    this.router.navigate([""]);
  }  

  atualizar(): void{
    this.formatarData();
    this.servico.atualizar(this.aluno).subscribe((resposta)=>{
      this.servico.message("Dados do Aluno atualizados com sucesso!!!");
      this.router.navigate(['']);
    }, err =>{
      this.servico.message("Erro ao alterar os dados do Aluno!");
    })
  }  

  formatarData(): void{
    let data = new Date(this.aluno.dataCadastro);
    this.aluno.dataCadastro = 
    `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
  }
}
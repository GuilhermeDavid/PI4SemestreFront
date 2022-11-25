import { AlunoService } from "./../../services/aluno.service";
import { Component, OnInit } from "@angular/core";
import { Aluno } from "src/app/entities/aluno";
import { Router } from "@angular/router";
@Component({
  selector: "app-read-all",
  templateUrl: "./read-all.component.html",
  styleUrls: ["./read-all.component.css"],
})
export class ReadAllComponent implements OnInit {
  inativos=0;//variável que irá contar os alunos inativos
  list: Aluno[] = []; //limpe os alunos inseridos
  ativos: Aluno[] = [];  
  constructor(private service: AlunoService,
    private router: Router) {} //criando um objeto do tipo AlunoService
  ngOnInit(): void {
    this.findAll();    
  } 
  findAll(): void {
    //nome do método(findAll) e tipo de retorno(void)
    this.service.findAll().subscribe((resposta) => {//criando um método semelhante ao lambda
      resposta.forEach(aluno => {
        if(!aluno.ativo){
          this.ativos.push(aluno); //atribuindo os ativos a lista a resposta da consulta.
          this.inativos++;
        }
        else {
          this.list.push(aluno); //atribuindo os ativos a lista a resposta da consulta.          
        }
      }); 
      
    });  }
    
apagar(id: any): void{
  this.service.apagar(id).subscribe((resposta)=>{
    if(resposta===null){
        this.service.message('Registro excluído com sucesso'); 
        this.list = this.list.filter(aluno => aluno.ra  != id);             
      }            
      else{
          this.service.message('Não foi possível excluir o Registro');             
      }        
  })
}
    verInativos(): void {
      this.router.navigate(['inativos']);
    }

    /*
    * O método inativar irá receber um aluno (item do html) 
    * e irá chamar o service para transformar ele em inativo.
    * Após a inativação daremos uma mensagem na tela que o 
    * aluno foi inativado e em seguida incrementamos a
    * variável inativos (inativos++)
    */
    inativar(item: Aluno): void{
      item.ativo = false;
      this.service.atualizar(item).subscribe(()=>{
        this.service.message('Aluno inativado com sucesso'); 
      this.list = this.list.filter(aluno => aluno.ra  != item.ra); 
      this.inativos++;
      })      
    }
      
    // contarAtivos(): void{
    //   for(let aluno of this.list){
    //     if(aluno.ativo)
    //       this.ativo++;
    //   }
    // }
  }

/*
*import { ThisReceiver } from "@angular/compiler";
*/
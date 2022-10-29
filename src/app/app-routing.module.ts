import { AtualizarComponent } from './components/atualizar/atualizar.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { InativosComponent } from './components/inativos/inativos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadAllComponent } from './components/read-all/read-all.component';


const routes: Routes = [
{
  path:'',
  component: ReadAllComponent
 },
 {
 path:'inativos',
 component: InativosComponent
},
 {
 path:'cadastro',
 component: CadastroComponent
},
{
path:'atualizar/:ra',
  component: AtualizarComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

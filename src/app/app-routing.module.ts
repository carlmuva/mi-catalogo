import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TableComponent } from './table/table.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';



const routes: Routes = [
{path:'', redirectTo:'/list', pathMatch:'full'},
{
    path: 'list',
    component: ListComponent
},
{
    path: 'table',
    component: TableComponent
},
{
  path:'**',
  component:PageNotFoundComponentComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

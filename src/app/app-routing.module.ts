import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './features/customers/customers-list/customers-list.component';
import { CustomerDetailComponent } from './features/customers/customer-detail/customer-detail.component';

const routes: Routes = [

  {path :'customers',component : CustomersListComponent},
  {path :'customers/:id',component : CustomerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

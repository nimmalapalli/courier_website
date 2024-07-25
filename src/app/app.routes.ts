import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { B2cOrdersComponent } from './b2c-orders/b2c-orders.component';
import { ForwardCreateComponent } from './forward-create/forward-create.component';
import { authGuard } from './guards/auth.guard';
import { ExceptionComponent } from './exception/exception.component';
import { WeightrecoComponent } from './weightreco/weightreco.component';
import { BillingComponent } from './billing/billing.component';





export const routes: Routes = [
  

    {path:'',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home',component:HomeComponent,canActivate:[authGuard]},
    {path:'b2c-orders',component:B2cOrdersComponent,canActivate:[authGuard]},
    {path:'forward-create',component:ForwardCreateComponent,canActivate:[authGuard]},
    {path:'exception',component:ExceptionComponent,canActivate:[authGuard]},
    {path:'weightreco',component:WeightrecoComponent,canActivate:[authGuard]},
    {path:'billing',component:BillingComponent,canActivate:[authGuard]},
];

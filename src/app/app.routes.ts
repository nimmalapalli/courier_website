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
import { B2bShipmentsComponent } from './b2b-shipments/b2b-shipments.component';
import { B2cShipmentsComponent } from './b2c-shipments/b2c-shipments.component';
import { B2bOrdersComponent } from './b2b-orders/b2b-orders.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { B2bCreateComponent } from './b2b-create/b2b-create.component';





export const routes: Routes = [
  

    {path:'',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    {path:'home',component:HomeComponent,canActivate:[authGuard]},
    {path:'b2c-orders',component:B2cOrdersComponent,canActivate:[authGuard]},
    {path:'forward-create',component:ForwardCreateComponent,canActivate:[authGuard]},
    {path:'exception',component:ExceptionComponent,canActivate:[authGuard]},
    {path:'weightreco',component:WeightrecoComponent,canActivate:[authGuard]},
    {path:'billing',component:BillingComponent,canActivate:[authGuard]},
    {path:'b2b-shipments',component:B2bShipmentsComponent,canActivate:[authGuard]},
    {path:'b2c-shipments',component:B2cShipmentsComponent,canActivate:[authGuard]},
    {path:'b2b-orders',component:B2bOrdersComponent,canActivate:[authGuard]},
    {path:'b2b-create',component:B2bCreateComponent,canActivate:[authGuard]},
];

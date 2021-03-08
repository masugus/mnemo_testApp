import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../authentication/pages/login/login.component';
import { AuthenticationGuard } from '../guards/authentication.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: { useHash: true, canActivate: AuthenticationGuard },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AuthRoutingModule {}

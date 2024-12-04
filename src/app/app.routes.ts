import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ItemsComponent } from './pages/items/items.component';
import { RentalsComponent } from './pages/rentals/rentals.component';

export const routes: Routes = [
    {
        path:'',
        component:DashboardComponent
    },
    {
        path:'customer',
        component: CustomersComponent
    },
    {
        path:'rentals',
        component:RentalsComponent
    },
    {
        path:'items',
        component: ItemsComponent
    }
];

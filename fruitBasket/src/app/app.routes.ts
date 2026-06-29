import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: "",
        loadComponent: () => import('./layouts/layout/layout.component').then(m => m.LayoutComponent),
        canActivate: [authGuard],

        children: [

            {
                path: "",
                redirectTo: "home",
                pathMatch: 'full'
            },

            {
                path: "home",
                loadComponent: () => import('./features/views/home/home.component').then(m => m.HomeComponent),
                pathMatch: 'full'
            },

            {
                path: "shop",
                loadComponent: () => import('./features/views/shop/shop.component').then(m => m.ShopComponent)
            },

            {
                path: "about-us",
                loadComponent: () => import('./features/views/about-us/about-us.component').then(m => m.AboutUsComponent)
            },

            {
                path: "contact-us",
                loadComponent: () => import('./features/views/contact-us/contact-us.component').then(m => m.ContactUsComponent)
            },

            {
                path: "dashboard",
                loadComponent: () => import('./features/views/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },

            {
                path: "user-cart",
                loadComponent: () => import('./features/views/cart/cart.component').then(m => m.CartComponent)
            },

            {
                path : "payment",
                loadComponent : () => import('./features/views/payment/payment.component').then(m => m.PaymentComponent)
            }

        ]
    },


    {
        path: "register",
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
    },

    {
        path: "login",
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    }


];

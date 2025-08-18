import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { AdminComponent } from './components/admin/admin';
import { BusinessComponent } from './components/business/business';
import { CategoryComponent } from './components/category/category';
import { BusinessCategoryComponent } from './components/business-category/business-category';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'business', component: BusinessComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'business-category', component: BusinessCategoryComponent },
      { path: '', redirectTo: 'business', pathMatch: 'full' },
    ],
  },
];

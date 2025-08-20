import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { About } from './components/about/about';
import { AdminComponent } from './components/admin/admin';
import { BusinessComponent } from './components/business/business';
import { CategoryComponent } from './components/category/category';
import { BusinessCategoryComparisonComponent } from './components/business-category-comparison/business-category-comparison';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'about', component: About },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'business', component: BusinessComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'business-category-comparison', component: BusinessCategoryComparisonComponent },
      { path: '', redirectTo: 'business', pathMatch: 'full' },
    ],
  },
];

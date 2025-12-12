import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsComponent } from '../charts/charts';
import { CategoryService } from '../../services/category.service';
import { CategoryDto } from '../../dtos/category.dto';
import { CategoryMonthlySummaryComponent } from '../category-monthly-summary/category-monthly-summary';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ReportingService } from '../../services/reporting.service';
import { CategoryMonthlyPieChartDto } from '../../dtos/category-monthly-pie-chart.dto';
import { CategoryPieChartComponent } from '../category-pie-chart/category-pie-chart';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TransactionDto } from '../../dtos/transaction.dto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ChartsComponent,
    CategoryMonthlySummaryComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CategoryPieChartComponent,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  categories: CategoryDto[] = [];
  selectedCategoryId: number | null = null;
  categoryControl = new FormControl<string | CategoryDto>('');
  filteredCategories!: Observable<CategoryDto[]>;

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  pieChartData: CategoryMonthlyPieChartDto[] = [];
  transactions: MatTableDataSource<TransactionDto> = new MatTableDataSource();
  selectedCategoryName: string | null = null;
  displayedColumns: string[] = ['issueDate', 'description', 'price'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService,
    private reportingService: ReportingService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.filteredCategories = this.categoryControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.categoryName;
          return name ? this._filter(name as string) : this.categories.slice();
        }),
      );
    });
  }

  private _filter(name: string): CategoryDto[] {
    const filterValue = name.toLowerCase();
    return this.categories.filter(option => option.categoryName.toLowerCase().includes(filterValue));
  }

  displayFn(category: CategoryDto): string {
    return category && category.categoryName ? category.categoryName : '';
  }

  loadSummary(): void {
    const selectedCategory = this.categoryControl.value as CategoryDto;
    if (selectedCategory && selectedCategory.categoryId) {
      this.selectedCategoryId = selectedCategory.categoryId;
    }
  }

  loadPieChart(): void {
    this.reportingService.getCategoryMonthlyPieChart(this.selectedYear, this.selectedMonth)
      .subscribe(data => {
        this.pieChartData = data;
      });
  }

  clearSelection(): void {
    this.categoryControl.setValue('');
    this.selectedCategoryId = null;
  }

  onCategoryClicked(categoryName: string): void {
    this.selectedCategoryName = categoryName;
    this.reportingService.getTransactionsForCategory(this.selectedYear, this.selectedMonth, categoryName)
      .subscribe(data => {
        this.transactions = new MatTableDataSource(data);
        this.transactions.sort = this.sort;
      });
  }
}

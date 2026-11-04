import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Category } from '../../pages/interfaces/category';
import { LocalStorageService } from './../../services/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  selectedLang: string = 'en';
  baseUrl: string = environment.baseURL;
  filter = {};
  loading:boolean=false
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _HttpClient: HttpClient,
    private _LocalStorageService: LocalStorageService
  ) {
    // console.log("seen ", this.getDaysInCurrentMonth())

    let x: string | null = _LocalStorageService.getItem('selectedLanguage');
    if (x !== null) {
      this.selectedLang = x;
      // console.log('selected ar', x);
    } else {
      this.selectedLang = 'en';
    }
  }
  loadingStatus(status: string) {
    status === 'start' ? (this.loading = true) : (this.loading = false);
  }
  setLanguage(): void {
    this.document.documentElement.lang = this.selectedLang;
    this.setDirection(this.selectedLang);
    this._LocalStorageService.setItem('selectedLanguage', this.selectedLang);
  }

  private setDirection(lang: string): void {
    const isRTL = ['ar', 'he', 'fa', 'ur'].includes(lang);
    this.document.documentElement.style.setProperty(
      '--dir',
      isRTL ? 'rtl' : 'ltr'
    );
    this.document.documentElement.style.setProperty(
      '--text-align-start',
      isRTL ? 'right' : 'left'
    );
    this.document.documentElement.style.setProperty(
      '--text-align-end',
      isRTL ? 'left' : 'right'
    );
    this.document.documentElement.style.setProperty(
      '--margin-start',
      isRTL ? '0 0 0 1rem' : '0 1rem 0 0'
    );
    this.document.documentElement.style.setProperty(
      '--margin-end',
      isRTL ? '0 1rem 0 0' : '0 0 0 1rem'
    );
    this.document.documentElement.style.fontFamily = isRTL? 'cairo' : 'sans-serif';
    // console.log(lang);
  }
  getAllCategories(): Observable<Category | any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/Category/GetAllCategories`,
      this.filter
    );
  }
  // getDaysInCurrentMonth(): number {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const month = date.getMonth();
  //   const nextMonth = new Date(year, month + 1, 1);
  //   const lastDayOfCurrentMonth = new Date(nextMonth);
  //   lastDayOfCurrentMonth.setDate(lastDayOfCurrentMonth.getDate() - 1);
  //   return lastDayOfCurrentMonth.getDate();
  // }
  isCurrentDateMoreThan7DaysAfter(specificDate: Date): boolean {
    const currentDate = new Date();
    const dateAfter7Days = new Date(specificDate);
    dateAfter7Days.setDate(dateAfter7Days.getDate() + 7);
    return currentDate > dateAfter7Days;
  }
}

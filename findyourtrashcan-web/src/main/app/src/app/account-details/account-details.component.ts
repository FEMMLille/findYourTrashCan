import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fytc-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})

/**
 * This class represents account details component
 */
export class AccountDetailsComponent implements OnInit {

  /**
   * Today date
   */
  today: Date = new Date();

  constructor() { }

  ngOnInit() {

  }

  /**
   * Filters all dates after today
   */
  birthdayFilter = (d: Date): boolean => {
    return d < this.today;
  }

}

import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../../i18n.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean;
  submitted = false;
  hide = true;
  constructor(private i18nService: I18nService) { }
  ngOnInit() {
    this.isLoading = true;
  }

  onSubmit() {
    this.submitted = true;
  }

  stopClickPropagate(event: any) {
    event.stopPropagation();
  }
}

import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../i18n.service';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hide = true;
  menuHidden = true;
  authenticated = false;

  user = {
    username: 'test'
  };
  constructor(private i18nService: I18nService) { }

  ngOnInit() { }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
}

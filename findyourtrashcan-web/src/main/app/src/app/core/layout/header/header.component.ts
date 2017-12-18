import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../providers/translation/i18n.service';
import { MaterialModule } from '../../../material.module';
import { AuthenticationService } from '../../providers/auth/authentification.service';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../../providers/user/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthenticationService, UserService]
})

export class HeaderComponent implements OnInit {
  hide = true;
  menuHidden = true;
  authenticated = false;
  private user: User;

  constructor(private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
    this.authenticationService.currentUserConnected().subscribe(user =>
      this.user = user
    );
    this.authenticationService.authenticated().subscribe(bool => {
      this.authenticated = bool;
    });
  }

  logout(): void {
    this.authenticationService.logout();
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get getUser(): User {
    return this.user;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
}

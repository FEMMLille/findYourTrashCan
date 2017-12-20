import { Component, OnInit } from '@angular/core';
import { I18nService } from '../core/providers/translation/i18n.service';
import { MaterialModule } from '../material.module';
import { AuthenticationService } from '../core/providers/auth/authentification.service';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../core/providers/user/user.service';
import { User } from '../core/model/user';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router) { }

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
    this.router.navigate(['/home'], { replaceUrl: true });
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

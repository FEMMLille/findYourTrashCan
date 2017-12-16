import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from './providers/translation/i18n.service';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './layout/header/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './providers/auth/authentification.service';
import { AuthentificationGuardService } from './providers/auth/authentification-guard.service';
import { UserService } from './providers/user/user.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    RouterModule,
    NgbModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent
  ],
  providers: [
    I18nService,
    AuthenticationService,
    UserService,
  ]
})

export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { LoginComponent } from './shell/header/login/login.component';
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { MaterialModule } from '../material.module';
import { AuthenticationService } from './shell/header/login/authentication.service';
import { AuthenticationGuard } from './shell/header/login/authentication.guard';
import { ReactiveFormsModule } from '@angular/forms';
export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    TranslateModule,
    NgbModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    HeaderComponent,
    ShellComponent
  ],
  providers: [
    I18nService,
    HttpCacheService,
    AuthenticationService,
    AuthenticationGuard,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }
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

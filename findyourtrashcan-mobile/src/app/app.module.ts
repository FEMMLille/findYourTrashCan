import { RewardInfoPageModule } from './../pages/reward-info/reward-info.module';
import { RewardsPageModule } from './../pages/rewards/rewards.module';
import { RewardLinkPage } from './../pages/reward-link/reward-link';
import { LocationService } from './../providers/location/location';
import { RewardsPage } from './../pages/rewards/rewards';
import { RewardsService } from './../providers/rewards/rewards';
import { Network } from '@ionic-native/network';
import { GarbageTypeService } from './../providers/trashcan/garbage-type';
import { TrashcanTypeService } from './../providers/trashcan/trashcan-type';
import { TrashcanService } from './../providers/trashcan/trashcan';
import { RangTypeService } from './../providers/rang/rang-types';
import { RangService } from './../providers/rang/rang';
import { AuthenticationService } from './../providers/providers';
import { AccountDetailsService } from './../providers/providers';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { DetailPopupService } from './../providers/detailpopup/detailpopup';
import { DatePipe } from '@angular/common';

import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { UserService } from '../providers/user/user';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { RewardInfoPage } from '../pages/reward-info/reward-info';
import { RewardLinkPageModule } from '../pages/reward-link/reward-link.module';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TabsPageModule,
    RewardsPageModule,
    RewardInfoPageModule,
    RewardLinkPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    Api,
    AccountDetailsService,
    Items,
    Camera,
    DatePipe,
    SplashScreen,
    AuthenticationService,
    RangService,
    Geolocation,
    DetailPopupService,
    LoadingController,
    RangTypeService,
    StatusBar,
    TrashcanService,
    TrashcanTypeService,
    GarbageTypeService,
    RewardsService,
    Network,
    UserService,
    LocationService,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

import { LocationService } from './location/location';
import { RewardsService } from './rewards/rewards';
import { TrashcanTypeService } from './trashcan/trashcan-type';
import { GarbageTypeService } from './trashcan/garbage-type';
import { RangTypeService } from './rang/rang-types';
import { RangService } from './rang/rang';
import { AccountDetailsService } from './user/account-details';
import { AuthenticationService } from './auth/authenticate';
import { Api } from './api/api';
import { Items } from '../mocks/providers/items';
import { Settings } from './settings/settings';
import { TrashcanService } from './trashcan/trashcan';
import { DetailPopupService } from './detailpopup/detailpopup';
import { GeolocationService } from './geo/geo';

export {
    Api,
    Items,
    Settings,
    AuthenticationService,
    AccountDetailsService,
    RangService,
    RangTypeService,
    GarbageTypeService,
    TrashcanTypeService,
    TrashcanService,
    DetailPopupService,
    GeolocationService,
    RewardsService,
    LocationService
};

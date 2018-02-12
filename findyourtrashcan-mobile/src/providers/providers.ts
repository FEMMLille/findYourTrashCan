import { TrashcanTypeService } from './trashcan/trashcan-type';
import { GarbageTypeService } from './trashcan/garbage-type';
import { RankTypeService } from './rank/rank-types';
import { RankService } from './rank/rank';
import { AccountDetailsService } from './user/account-details';
import { AuthenticationService } from './auth/authenticate';
import { Api } from './api/api';
import { Items } from '../mocks/providers/items';
import { Settings } from './settings/settings';
import { TrashcanService } from './trashcan/trashcan';
import { DetailPopupService } from './detailpopup/detailpopup';

export {
    Api,
    Items,
    Settings,
    AuthenticationService,
    AccountDetailsService,
    RankService,
    RankTypeService,
    GarbageTypeService,
    TrashcanTypeService,
    TrashcanService,
    DetailPopupService
};

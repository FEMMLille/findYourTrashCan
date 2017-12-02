import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../i18n.service';
import { MaterialModule } from '../../../material.module';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(private i18nService: I18nService) { }

    ngOnInit() { }
}

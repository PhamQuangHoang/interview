import { Component, Input } from '@angular/core';
import { Interviewee } from 'src/app/models/interviewee.model';


@Component({
    selector: 'app-list-ghost',
    templateUrl: './list-ghost.component.html',
    styleUrls: ['./list-ghost.component.scss']
})


export class ListGhostComponent {
    interviewees = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
}
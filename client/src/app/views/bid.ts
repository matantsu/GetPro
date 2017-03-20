import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Job, Bid } from './../model';
import { trace } from './../util';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'bid',
  template: `
    <div class="ui segments">
        <div class="ui huge segment" [ngClass]="{disabled: job.locked && job.chosen != bid.$key}">
            <span>
              <img class="ui avatar image" [src]="bid.owner.photoURL">
              <span>{{bid.owner.displayName}}</span>
              &nbsp;
              <i><b>bidded</b></i>
            </span>
            <span style="float: right" class="ui tag big teal label">$ {{bid.price}}</span>
            <br>
            <i><small>{{job.timestamp | timeAgo}}</small></i>
        </div>
        <div *ngIf="job.chosen == bid.$key" class="ui huge segment">
            <h3 class="ui green header">
              <i class="checkmark icon" [ngClass]="{checkmark: !job.locked, call: job.locked}"></i>
              <div class="content">
                Chosen 
                <span *ngIf="job.locked">
                    ,
                    <br>
                    Server got your details and will be calling you soon
                </span>
              </div>
            </h3>
        </div>
        <div *ngIf="!job.locked && job.chosen != bid.$key" class="ui huge segment">
            <div class="ui positive fluid huge button" (click)="choose.emit()">
                Choose
            </div>
        </div>
    </div>
    <br>
  `,
  styleUrls: [],
})
export class BidView {
    @Input() job: Job;
    @Input() bid: Bid;
    @Output() choose = new EventEmitter<void>();
}

import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Job, Bid } from './../model';
import { trace } from './../util';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'job',
  template: `
    <div class="ui segments">
        <div class="ui huge segment">
            <p>
                {{job.desc}}
            </p>
            <i><small>{{job.timestamp | timeAgo}}</small></i>
            <a class="ui bottom right attached label">{{job.type}}</a>
        </div>
        <div class="ui large segment" [ngClass]="{loading: !job.bids}">
            <span class="ui orange header" [ngClass]="{orange: job.bids?.length, grey: !job.bids?.length}" *ngIf="!job.locked">
                <i class="fire icon" [ngClass]="{fire: job.bids?.length, 'ellipsis horizontal': !job.bids?.length}"></i>
                <div class="content">
                    {{job.bids?.length ? job.bids?.length+' bids' : 'No bids'}}
                </div>
            </span>
            <span class="ui green header" *ngIf="job.locked">
                <i class="call icon"></i>
                <div class="content">
                    calling you...
                </div>
            </span>
            <button class="ui right labeled icon large teal right floated circular button" 
                    [routerLink]="'/job/' + job.$key">
              <i class="right arrow icon"></i>
              Details
            </button>
        </div>
    </div>
    <br>
  `,
  styleUrls: [],
})
export class JobView {
    @Input() job: Job;
}

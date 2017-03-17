import { StoreState } from './../store';
import { Job, Bid, State, STATE, JobStatus, jobStatus } from './../state';
import { Observable } from 'rxjs';
import { id, trace } from './../util';
import { jobs, user } from './../selectors';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { Actions } from './../actions';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'job', // <my-app></my-app>
  template: `
    <div class="ui loading huge segment" *ngIf="!job">
      loading job ...
    </div>
    <div class="ui huge segments" *ngIf="job" [ngSwitch]="jobStatus(job)">
      <div class="ui segment">
        <p>
          {{job.desc}}
        </p>
        <a class="ui bottom right attached label">{{job.type}}</a>
      </div>
      <div class="ui segment" *ngIf="job.chosen && (jobStatus(job) == JobStatus.OPEN || jobStatus(job) == JobStatus.BIDDED)">
        <h3 class="ui header">
          <i class="warning circle icon"></i>
          <div class="content">
            The client chose another bid
          </div>
        </h3>
      </div>
      <div class="ui segment" [ngClass]="{'center aligned': jobStatus(job) == JobStatus.BIDDED}">
        <div>
          <div *ngSwitchCase="JobStatus.OPEN" class="ui icon fluid input">
            <input #bidInput1 type="number" placeholder="Bid on this job !">
            <i class="inverted circular send link orange icon" 
              [ngClass]="{disabled: !bidInput1.value}" 
              (click)="bid.emit(+bidInput1.value)"></i>
          </div>
          <div *ngSwitchCase="JobStatus.BIDDED">
            <div class="ui mini statistic">
              <div class="value">
                {{job.bid.price}}$
              </div>
              <div class="label">
                Your bid
              </div>
            </div>
            <div *ngIf="!job.chosen">
              <h3 class="ui header">
                <div class="ui active inline loader"></div>
                <div class="content">
                  Waiting for client...
                </div>
              </h3>
            </div>
          </div>
          <div *ngSwitchCase="JobStatus.CHOSEN">
            <h3 class="ui green header">
              <i class="checkmark icon"></i>
              <div class="content">
                Your bid was chosen!
              </div>
            </h3>
            <button class="ui positive fluid huge button" (click)="pay.emit()">
              Get Customer's Details
            </button>
          </div>
          <div *ngSwitchCase="JobStatus.PAYED">
            <h3 class="ui green header">
              <i class="flag checkers icon"></i>
              <div class="content">
                Congratz! You won the job
              </div>
            </h3>
            <div *ngIf="!job.owner">
              <div class="ui active inline loader"></div>
              loading customer's details...
            </div>
            <div *ngIf="job.owner">
              <img class="ui avatar image" [src]="job.owner.photoURL">
              <span>{{job.owner.displayName}}</span>
              <a [href]="'tel:'+job.owner.phone" class="circular ui icon green right floated large button">
                <i class="icon call"></i>
                Call ({{job.owner.phone}})
              </a>
            </div>
          </div>
          <div *ngSwitchCase="JobStatus.LOCKED">
            <h3 class="ui grey header">
              <i class="lock icon"></i>
              <div class="content">
                Some one else won the job...
              </div>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <br>
  `,
  styles: [
      `
          :host{
              margin-bottom: 1em;
          }
      `
  ],
})
export class JobView {
    JobStatus = JobStatus;
    jobStatus = jobStatus;

    @Input() job: Job;
    @Output() bid = new EventEmitter<number>();
    @Output() pay = new EventEmitter<void>();
}

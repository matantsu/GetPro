import { Toast } from './../toast';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Job, Bid } from './../model';
import { trace } from './../util';
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'toast',
  template: `
    <div class="ui message">
        <i #close class="close icon"></i>
        <div class="header">
            {{toast.title}}
        </div>
        <p>
            {{toast.desc}}
        </p>
    </div>
    <br>
  `,
  styleUrls: [],
})
export class ToastView {
    @Input() toast: Toast;
    @ViewChild('close') close: ElementRef;
    ngAfterViewInit() {
        if (this.toast.dissmissable) {
            jQuery(this.close.nativeElement)
              .on('click', function() {
                jQuery(this)
                  .closest('.message')
                  .transition('fade');
              });
        }
    }
}

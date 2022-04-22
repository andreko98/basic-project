import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any;
  error: boolean;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success alert-dismissible fade show';
            this.error = false;
            break;
          case 'error':
            message.cssClass = 'alert alert-danger alert-dismissible fade show';
            this.error = true;
            break;
          case 'warning':
            message.cssClass = 'alert alert-warning alert-dismissible fade show';
            this.error = true;
            break;
        }
        this.message = message;
      });
  }

  onClose() {
    this.alertService.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

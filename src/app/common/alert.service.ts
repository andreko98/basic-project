import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router,
    private modalService: BsModalService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, httpCode?: number, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;

    message = this.createMessage(message, httpCode);

    this.subject.next({ type: 'error', text: message });
  }

  warning(message: string, httpCode?: number, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;

    message = this.createMessage(message, httpCode);

    this.subject.next({ type: 'warning', text: message });
  }

  clear() {
    this.subject.next(false);
  }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  public showAlertDanger(message: string, dismissTimeout?: number) {
    this.showAlert(message, AlertTypes.DANGER, dismissTimeout);
  }

  public showAlertSuccess(message: string, dismissTimeout?: number) {
    this.showAlert(message, AlertTypes.SUCCESS, dismissTimeout);
  }

  private createMessage(message: string, httpCode?: number): string {
    if (httpCode === 0 || httpCode === 101) {
      message = 'Falha ao obter registros. Tente novamente';
    } else if (httpCode === 302) {
      message = message;
    } else if (httpCode === 400) {
      message = message;
    } else if (httpCode === 401) {
      message = 'Usuário não autorizado';
    } else if (httpCode === 403) {
      message = 'Operação não permitida para o perfil';
    } else if (httpCode === 404) {
      message = 'Endpoint não encontrado';
    } else {
      message = httpCode.toString() + ' -> Erro não identificado'
    }

    return message;
  }
}

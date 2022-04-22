import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/common/alert.service';
import { constants } from 'src/environments/constants';
import { User } from 'src/app/models/user';
import { DatabaseService } from 'database/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.group({
    user: '',
    pass: ''
  });

  constructor(private router: Router,
  private formBuilder: FormBuilder,
  private alertService: AlertService,
  private databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let name = this.form.controls['user'].value;
    let pass = this.form.controls['pass'].value;

    if(name.length > 0 
    && pass.length > 0) {
      let user = this.databaseService.tryLogin(name, pass);
      if(user) {
        this.router.navigate(['/']);
      }
      else {
        this.alertService.showAlertDanger("Credenciais incorretas, tente novamente.", 2000);
      }
    }
    else {
      this.alertService.showAlertDanger("Preencha todos os campos.", 2000);
    }
  }
}
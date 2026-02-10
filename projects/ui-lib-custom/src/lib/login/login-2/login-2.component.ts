import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseLoginComponent } from '../base-login/base-login.component';
import { Container } from '../../layout/container';
import { Stack } from '../../layout/stack';
import { Inline } from '../../layout/inline';
import { Card } from '../../card/card';
import { Button } from '../../button/button';
import { UiLibInput } from '../../input/input';

@Component({
  selector: 'lib-login-2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Container, Stack, Inline, Card, Button, UiLibInput],
  templateUrl: './login-2.component.html',
  styleUrls: ['./login-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login2Component extends BaseLoginComponent {
  /**
   * Override loading property from base component
   */
  override loading = input<boolean>(false);

  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
  }
}

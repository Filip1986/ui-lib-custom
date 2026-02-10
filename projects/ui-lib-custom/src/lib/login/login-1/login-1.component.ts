import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseLoginComponent } from '../base-login/base-login.component';
import { Container } from '../../layout/container';
import { Stack } from '../../layout/stack';
import { Card } from '../../card/card';
import { Button } from '../../button/button';
import { UiLibInput } from '../../input/input';
import { Inline } from '../../layout/inline';

@Component({
  selector: 'lib-login-1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Container, Stack, Inline, Card, Button, UiLibInput],
  templateUrl: './login-1.component.html',
  styleUrls: ['./login-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login1Component extends BaseLoginComponent {
  /**
   * Override loading property from base component
   */
  override loading = input<boolean>(false);

  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
  }
}

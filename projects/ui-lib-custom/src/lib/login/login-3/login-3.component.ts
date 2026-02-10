import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseLoginComponent } from '../base-login/base-login.component';
import { Container } from '../../layout/container';
import { Stack } from '../../layout/stack';
import { Grid } from '../../layout/grid';
import { Inline } from '../../layout/inline';
import { Card } from '../../card/card';
import { Button } from '../../button/button';
import { UiLibInput } from '../../input/input';

@Component({
  selector: 'lib-login-3',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    Container,
    Stack,
    Grid,
    Inline,
    Card,
    Button,
    UiLibInput,
  ],
  templateUrl: './login-3.component.html',
  styleUrls: ['./login-3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login3Component extends BaseLoginComponent {
  /**
   * Override loading property from base component
   */
  override loading = input<boolean>(false);

  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
  }
}

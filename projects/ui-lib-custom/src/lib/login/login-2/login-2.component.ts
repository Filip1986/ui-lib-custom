import { Component, ChangeDetectionStrategy, input, ViewEncapsulation } from '@angular/core';
import type { InputSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  encapsulation: ViewEncapsulation.None,
})
export class Login2Component extends BaseLoginComponent {
  /**
   * Override loading property from base component
   */
  public override readonly loading: InputSignal<boolean> = input<boolean>(false);
}

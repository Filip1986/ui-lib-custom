import { Component, ChangeDetectionStrategy, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  encapsulation: ViewEncapsulation.None,
})
export class Login1Component extends BaseLoginComponent {
  /**
   * Override loading property from base component
   */
  public override readonly loading = input<boolean>(false);
}

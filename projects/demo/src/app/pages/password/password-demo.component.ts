import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordComponent } from 'ui-lib-custom/password';

/** Demo page for the Password component. */
@Component({
  selector: 'app-password-demo',
  standalone: true,
  imports: [PasswordComponent, ReactiveFormsModule],
  templateUrl: './password-demo.component.html',
  styleUrl: './password-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordDemoComponent {
  /** Reactive form control used in the forms-integration scenario. */
  public readonly passwordControl: FormControl<string | null> = new FormControl<string | null>(
    null,
    [Validators.required, Validators.minLength(8)]
  );
}

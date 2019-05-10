import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'materialApp';
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false; 
}

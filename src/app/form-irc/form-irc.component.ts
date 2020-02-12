import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-irc',
  templateUrl: './form-irc.component.html',
  styleUrls: ['./form-irc.component.css']
})
export class FormIrcComponent implements OnInit {

  fgIrc: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() { }

  private createForm() {
    this.fgIrc = this.fb.group({
      numLlaves: [ null, Validators.min(0) ],
      facturado: [ null ]
    });
  }
}

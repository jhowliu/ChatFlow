import { Component, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IntentService } from '../../services/intent.service';

import { ActivatedRoute } from '@angular/router';

interface Intent {
  id: String,
  name: String,
  sentences: String[]
}

interface Sentence {
  data: String
}

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.css']
})

export class IntentComponent implements OnInit {
  private intentId: Number;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.intentId = params['id'];
    });
  }
}

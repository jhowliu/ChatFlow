import { Component, OnInit } from '@angular/core';
import { IntentService } from '../../services/intent.service';

import { PlatformLocation } from '@angular/common';

interface Intent {
  id: String,
  name: String,
  sentences: String[]
}

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})

export class ConsoleComponent implements OnInit {
  intentId: String;
  private intents: Intent[];

  constructor(
    private intentService: IntentService,
    private location: PlatformLocation,
  ) { }

  ngOnInit() {
    this.intentService.getIntents().subscribe((data) => {
      if (data.success && data.data.length) {
        this.intents = data.data;
        this.intentId = data.data[0]._id;
      }
    })
    this.location.onPopState(() => {
      console.log("HII");
    })
  }

  onUpdate(e) {
    if (e) { this.updateIntents(); }
  }

  onIntentClick(id) {
    this.intentId = id;
  }

  onAddIntent() {
    let newIntent = {
      name: "請輸入意圖名稱",
      sentences: [],
    }
    this.intentService.addIntent(newIntent).subscribe(data => {
      if (data.success) {
        this.intents.push(data.data);
        this.intentId = data.data._id;
      }
    })
  }

  onDelIntent(id) {
    console.log(id);
    this.intentService.deleteIntent(id).subscribe((data) => {
        if (data.success) {
          console.log(data);
          this.updateIntents();
          this.intentId = undefined;
        }
    })
  }

  private updateIntents() {
    this.intentService.getIntents().subscribe((data) => {
      if (data.success && data.data.length) {
        this.intents = data.data;
      } else {
        this.intents = undefined;
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { IntentService } from '../../services/intent.service';
import { FormBuilder } from '@angular/forms';

import { PlatformLocation } from '@angular/common';

interface Intent {
  id: String,
  name: String,
  sentences: String[]
}
interface Sentence {
  data: String
}

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})

export class ConsoleComponent implements OnInit {
  private sentence: String;
  private sentences: Sentence[];
  private intent: Intent;
  private intents: Intent[];

  private saved: Boolean;

  constructor(
    private intentService: IntentService,
    private location: PlatformLocation,
  ) { }

  ngOnInit() {
    this.saved = true;
    this.intentService.getIntents().subscribe((res) => {
      if (res.success && res.data.length) {
        const data = res.data[0];
        this.intents = [data];
        console.log(this.intents);
        this.intent = {
          id: data._id,
          name: data.name,
          sentences: data.sentences,
        };
        this.buildSentences(data.sentences);
      } else {
        this.intent = undefined;
      }
    })

    this.location.onPopState(() => {
      console.log("HII");
    })
  }

  onChange() {
    this.saved = false;
  }

  addSentence() {
    if (this.sentence != null) {
      const data: Sentence = { data: this.sentence };
      this.sentences.push(data);
      this.sentence = null;
    }
  }

  deleteSentence(e) {
    const index = e.target.id;
    this.sentences.splice(index, 1);
    console.log(this.sentences);
  }

  onSaveClicked() {
    const intent = this.buildIntent();
    this.intentService.updateIntent(intent).subscribe((res) => {
      this.saved = true;
      console.log(res);
    });
  }

  private buildSentences(sentences) {
    let arr = []
    for (let sentence of sentences) {
      arr.push({data: sentence});
    }
    this.sentences = arr;
  }

  private buildIntent() {
    let arr = [];
    for (let sentence of this.sentences) {
      arr.push(sentence.data);
    }
    this.intent.sentences = arr;
    return this.intent;
  }
}

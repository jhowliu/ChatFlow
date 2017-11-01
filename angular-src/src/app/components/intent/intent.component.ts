import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IntentService } from '../../services/intent.service';

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

export class IntentComponent implements OnChanges {
  @Input() intentId: String; // pass id from console
  @Output() updated: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  private sentence: String;
  private sentences: Sentence[];
  private intent: Intent;

  private saved: Boolean;

  constructor(
    private intentService: IntentService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const id = changes['intentId'].currentValue;
    if (id) {
      this.saved = true;
      this.intentService.getIntentById(id).subscribe((data) => {
        const intent = data.data;
        if (data.data != undefined) {
          this.intent = {
            id: intent._id,
            name: intent.name,
            sentences: intent.sentences,
          }
          this.buildSentences(intent.sentences);
        }
      });
    } else {
      this.intent = undefined;
    }
  }

  onDataChanged() {
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
    this.intentService.updateIntent(intent).subscribe((data) => {
      this.saved = true;
      console.log(data);
      this.updated.emit(this.saved);
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

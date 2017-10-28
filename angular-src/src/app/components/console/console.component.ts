import { Component, OnInit } from '@angular/core';
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
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})

export class ConsoleComponent implements OnInit {
  private sentences: Sentence[];
  private sentence: String;
  private intent: Intent;

  private changed: Boolean;

  constructor(
    private intentService: IntentService,
  ) { }

  ngOnInit() {
    this.intentService.getIntents().subscribe((res) => {
      if (res.success && res.data.length) {
        const data = res.data[0];
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

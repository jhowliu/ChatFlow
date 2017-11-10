import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { EntityService } from '../../services/entity.service';

interface Entity {
  id: String,
  intentId: String,
  name: String,
  sentences: Sentence[],
}

interface Sentence {
  data: String,
}

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})

export class EntityComponent implements OnInit, OnChanges {
  @Input() intentId: String;

  private entities: Entity[];

  constructor(
    private entityService: EntityService,
  ) {}

  ngOnInit() {
    this.entities = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    const id = changes['intentId'].currentValue;
    if (id) {
      console.log('CHANGED: IntentId= ' + id);
      this.entityService.getEntitiesByIntentId(id).subscribe( (data) => {
        if (data.success) {
          data.data.map((entity) => {
            this.entities.push({
              id: entity._id,
              intentId: entity.intentId,
              name: entity.name,
              sentences: this.buildSentences(entity.sentences),
            });
          });
        }
      });
    }
  }

  addSentence(e) {
    const entityIndex = e.target.id;
    this.entities[entityIndex].sentences.push({data: e.target.value});
    e.target.value = '';
  }

  deleteSentence(e) {
    const sentenceIndex = e.target.value;
    const entityIndex = e.target.parentNode.id;
    this.entities[entityIndex].sentences.splice(sentenceIndex, 1);
  }

  onDataChanged() {
    console.log(this.entities);
  }

  private buildSentences(sentences) {
    let arr: Sentence[] = [];
    for (let sentence of sentences) {
      arr.push({data: sentence});
    }
    return arr;
  }
}

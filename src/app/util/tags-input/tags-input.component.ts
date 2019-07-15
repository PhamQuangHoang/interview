import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { find, pull } from 'lodash';
import { Interviewee } from '../../models/interviewee.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
})
export class TagsInputComponent implements OnInit {

  @ViewChild('tagInput') tagInputRef: ElementRef;
  @Output() tagChange = new EventEmitter();
  @Input() technique;
  tags: string[] = [];
  form: FormGroup;
  userID: any;
  interviewees: Interviewee;
  constructor(private router: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      tag: [],
    });
  }
  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.form.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.form.controls.tag.setValue('');
        this.showTag();
      }
    }
  }
  addTag(tag: string): void {
    console.log(tag)
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);
    }
    this.tagChange.emit(this.showTag());
  }

  showTag(): string {
    return this.tags.join(",");
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
    this.tagChange.emit(this.showTag());
  }
}

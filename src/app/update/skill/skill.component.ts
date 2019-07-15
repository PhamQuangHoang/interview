import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { TagsInputComponent } from 'src/app/util/tags-input/tags-input.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['../hr-update-interviewee/hr-update-interviewee.component.scss','./skill.component.scss']
})
export class SkillComponent implements OnInit {
  @ViewChild(TagsInputComponent) tagsInputComponent: TagsInputComponent;
  @Output() TNEChange = new EventEmitter<any>();
  hiddenForm: FormGroup;
  techniques: string = '';
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.hiddenForm = this.fb.group({
      interviewerNote: ['', ],
      englishSkill: ['']
    });
  }
  setDefaultData(note: string, englishSkill: string, techniques: any) {
    console.log('retrive data from update' + techniques);

    this.hiddenForm = this.fb.group({
      interviewerNote: [note, Validators.maxLength(200)],
      englishSkill: [englishSkill]
    });

    this.tagsInputComponent.tags = techniques ? techniques.split(',') : [];


    this.techniques = techniques;

    // if change data in form => send value object to Parent component 
    this.hiddenForm.valueChanges.subscribe((data) => {
      this.TNEChange.emit(this.formData());
    });

    //send back data to parent 
    this.TNEChange.emit(this.formData());
  }

  formData(): any {
    const data = this.hiddenForm.value;
    data.technique = this.techniques;  
    return data;
  }

  skill_message_validation={
    interviewerNote: [
      { type: 'maxlength', message: 'Note need length smaller than 200' }
    ]
  }
  retriveTag(event: any) {
    this.techniques = event;
    this.TNEChange.emit(this.formData());
  }

  get englishSkill() {
    return this.hiddenForm.controls['englishSkill'];
  }
  get note() {
    return this.hiddenForm.controls['note'];
  }

}

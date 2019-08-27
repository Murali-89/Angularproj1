import { Component, OnInit, Input } from '@angular/core';
import { Reminder } from '../reminder';
import { NotesService } from '../services/notes.service';
import { CategoryComponent } from '../category/category.component';
import { ReminderComponent } from '../reminder/reminder.component';

@Component({
  selector: 'app-reminderdetails',
  templateUrl: './reminderdetails.component.html',
  styleUrls: ['./reminderdetails.component.css']
})
export class ReminderdetailsComponent implements OnInit {
  @Input() 
  reminder: Reminder;
  panelOpenState: boolean = false;
  constructor(private noteService:NotesService,private reminderComponent: ReminderComponent){ 
  }

  ngOnInit() {
  }

  // updateCategory() {
  //   console.log(this.reminder.reminderId);
  //   console.log("VALUES.."+this.reminder.reminderId+" "+this.reminder.reminderName+" "+this.reminder.reminderDescription+" "+this.reminder.reminderCreatedBy)
  //   this.noteService.updateCategory(+this.reminder.reminderId,
  //     { reminderId: this.reminder.reminderId,
  //       reminderName: this.reminder.reminderName, 
  //       reminderDescription: this.reminder.reminderDescription,
  //       reminderCreatedBy: this.reminder.reminderCreatedBy
  //      })
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.reminder = data as Reminder;
  //         this.categoryComponent.reloadData();
  //       },
  //       error => console.log(error));
  // }


  // deleteCategory() {
  //   this.noteService.deleteCategory(this.reminder)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.categoryComponent.reloadData();
  //       },
  //       error => console.log(error));
  // }

}

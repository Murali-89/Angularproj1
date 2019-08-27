import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { Reminder } from '../reminder';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {


userId: string;
reminders: Array<Reminder>;

  public submitMessage: string;
  
  name = new FormControl('', [ Validators.required ]);
  description = new FormControl('', [ Validators.required ]);
  constructor(public routerService: RouterService,public noteService: NotesService,
    private route: ActivatedRoute) {
      this.userId = this.route.snapshot.paramMap.get('userId');   
      this.reminders=[];
     
     }

  ngOnInit() {
    this.reloadData();
   
  }

  goToNotes(){
    this.routerService.routeToDashboard(this.userId);
  }


  saveReminder() {
    
    if (this.name.valid && this.description.valid) {
      this.noteService.saveReminder({
        reminderName: this.name.value,
        reminderDescription: this.description.value,
        reminderCreatedBy:this.userId
      }).subscribe(
      res => 
      {
        console.log("Y it is not coming to reload the data......")
        this.reloadData();
      },
      err => {
          if (err.status === 403) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }
        }
      );
      }
    }

    getErrorMessage() {
      return this.name.hasError('required') ? 'You must enter a value' :
            this.description.hasError('required') ? 'You must enter a value ' :
              '';
    }
    reloadData()
    {
      console.log("called...................");
      this.noteService.fetchReminderFromServer(this.userId);
      this.noteService.getReminders().subscribe(
        res => this.reminders = res,
        err => {}
      );
      
    }
 
reset(){
  this.routerService.routeToReminder(this.userId);
}


}

import { Component, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { ReminderComponent } from '../reminder/reminder.component';
import {Reminder} from '../reminder'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
 reminder: Reminder;
  states: Array<string> = ["started", "Not started", "completed"];
  errMessage: string;
  userId: string;
  constructor(public dialog: MatDialog, private matDialogRef: MatDialogRef<EditNoteViewComponent>, 
    private routeService: RouterService,
    private notesService: NotesService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data: any) { 
    }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.note);
    this.states=this.notesService.getStates();
    console.log(this.states);
  }

  ngOnDestroy() {
    this.routeService.routeBack();
  }

  onSave() {
    this.notesService.editNote(this.note).subscribe((editedNote) => {
      this.matDialogRef.close();
    },
      (err: any) => {
      this.errMessage = err.message;
    });
  }

  
  onDeleteReminder() {

    this.note.reminder.reminderName='';
    this.note.reminder.reminderDescription='';
    this.note.reminder.reminderType='';


    this.notesService.editNote(this.note).subscribe((editedNote) => {
    },
      (err: any) => {
      this.errMessage = err.message;
    });
  }

  onDelete() {
      
    this.notesService.deleteNote(this.note).subscribe((editedNote) => {
      this.matDialogRef.close();
    },
      (err: any) => {
      this.errMessage = err.message;
    });
  }

  

  openDialog(): void {
    this.note = this.notesService.getNoteById(this.data.note);
  
  console.log("VAlue of NOTTTT..."+this.note.reminder.reminderName);
    const dialogRef = this.dialog.open(ReminderComponent, {
      width: '250px',
      data: {
        reminderName : this.note.reminder.reminderName,
        reminderDescription: this.note.reminder.reminderDescription,
        reminderType: this.note.reminder.reminderType

       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reminder=result;
      this.note.reminder.reminderName=this.reminder.reminderName;
      this.note.reminder.reminderDescription=this.reminder.reminderDescription;
      this.note.reminder.reminderType=this.reminder.reminderType;
      console.log(this.note.reminder);
      this.notesService.editNote(this.note).subscribe((editedNote) => {
      
      },
        (err: any) => {
        this.errMessage = err.message;
      });

    });
  }
  
}

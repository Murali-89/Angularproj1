import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  note: Note;
  userId:string;
  errMessage: string;

  constructor(private notesService: NotesService,private routeService: RouterService,private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('userId');  
    this.note = new Note();
  }

  ngOnInit() {
  }

  takeNotes() {
    if (this.note.noteTitle !== '' && this.note.noteStatus !== '') {
      console.log("notetaker"+  this.userId);
      this.note.noteCreatedBy=this.userId;
      console.log("Value of title is...."+this.note.noteTitle);
      this.notesService.addNote(this.note).subscribe(
        data => {},
        err => {
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
  navCategory()
  {
    console.log("88888888888888888888888")
    this.routeService.routeToCategory(this.userId);
   //this.routeService.routeToDashboard(this.userId);
  }


  navReminder()
  {
    this.routeService.routeToReminder(this.userId);
  }

}

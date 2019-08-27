import { Component, Input } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  note: Note;
  constructor(private routerService: RouterService) { 
  }

  openEditView() {
    console.log("999999999999999999999999")
    this.routerService.routeToEditNoteView(this.note.noteId,this.note.noteCreatedBy);
  }
}

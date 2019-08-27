import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private notesService: NotesService) {
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
  }

  getNotesBasedonStates(notes: Array<Note>) {
    this.notStartedNotes = notes.filter((note) => note.category.categoryName === 'not-started');
    this.startedNotes = notes.filter((note) => note.category.categoryName === 'started');
    this.completedNotes = notes.filter((note) => note.category.categoryName === 'completed');
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      res => this.getNotesBasedonStates(res),
      err => {}
    );
  }

}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {
  constructor(private dialog: MatDialog,
    private route: ActivatedRoute) {
    const noteId = this.route.snapshot.paramMap.get('noteId');
    console.log("noteId88888888888888888888......"+noteId)
    const editDialog = this.dialog.open(EditNoteViewComponent, {
      data: {
        note: noteId

      }
    });
   }
}

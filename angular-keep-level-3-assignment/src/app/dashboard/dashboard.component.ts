import { Component } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
userId:string;
  constructor(private notesService: NotesService,private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log("^^^^^^^^"+this.userId);
    this.notesService.fetchNotesFromServer(this.userId);
  }

}

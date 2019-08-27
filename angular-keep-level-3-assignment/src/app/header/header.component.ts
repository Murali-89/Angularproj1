import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  userId:string;
  constructor(private routerService: RouterService,private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  switch() {
    if (this.isNoteView) {
      this.routerService.routeToListView(this.userId);
      this.isNoteView = false;
    } else {
      this.routerService.routeToNoteView(this.userId);
      this.isNoteView = true;
    }
  }
  onlogOut()
  {
    this.routerService.routeToLogin();
  }

}
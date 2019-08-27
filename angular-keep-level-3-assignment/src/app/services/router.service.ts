import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

  constructor(public router: Router, private location: Location) { }

  routeToDashboard(userId) {
    this.router.navigate(['dashboard',userId]);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeToEditNoteView(noteId,userId) {
    this.router.navigate(['dashboard',userId, {
      outlets: {
        noteEditOutlet: ['note', noteId, 'edit'],
      }
    }]);
  }
  
  routeToEditCategoryView(categoryId,userId) {
    this.router.navigate(['dashboard',userId, {
      outlets: {
        categoryEditOutlet: ['category', categoryId, 'edit'],
      }
    }]);
  }


  routeBack() {
    this.location.back();
  }

  routeToNoteView(userId) {
    this.router.navigate([`dashboard/${userId}/view/noteview`]);
  }

  routeToListView(userId) {
    this.router.navigate([`dashboard/${userId}/view/listview`]);
  }

  routeToRegister() {
    this.router.navigate(['register']);
  }

  routeToCategory(userId) {
    this.router.navigate(['category',userId]);
  }

  routeToReminder(userId) {
    this.router.navigate(['reminder',userId]);
  }
}

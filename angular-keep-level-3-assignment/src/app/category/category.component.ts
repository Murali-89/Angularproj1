import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { Category } from '../category';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


userId: string;
categories: Array<Category>;

  public submitMessage: string;
  
  name = new FormControl('', [ Validators.required ]);
  description = new FormControl('', [ Validators.required ]);
  constructor(public routerService: RouterService,public noteService: NotesService,
    private route: ActivatedRoute) {
      this.userId = this.route.snapshot.paramMap.get('userId');   
      this.categories=[];
     
     }

  ngOnInit() {
    this.reloadData();
   
  }

  goToNotes(){
    this.routerService.routeToDashboard(this.userId);
  }


  saveCategory() {
    
    if (this.name.valid && this.description.valid) {
      this.noteService.saveCategory({
        categoryName: this.name.value,
        categoryDescription: this.description.value,
        categoryCreatedBy:this.userId
      }).subscribe(
      res => {
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
      console.log("called  reloadData()............................");
      this.noteService.fetchCategoryFromServer(this.userId);
      this.noteService.getCategories().subscribe(
        res => this.categories = res,
        err => {}
      );
      
    }
 
reset(){
  this.routerService.routeToCategory(this.userId);
}


}

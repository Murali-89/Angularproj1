import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category';
import { NotesService } from '../services/notes.service';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent implements OnInit {
  @Input() 
  category: Category;
  panelOpenState: boolean = false;
  constructor(private noteService:NotesService,private categoryComponent: CategoryComponent){ 
  }

  ngOnInit() {
  }

  updateCategory() {
    console.log(this.category.categoryId);
    console.log("VALUES.."+this.category.categoryId+" "+this.category.categoryName+" "+this.category.categoryDescription+" "+this.category.categoryCreatedBy)
    this.noteService.updateCategory(+this.category.categoryId,
      { categoryId: this.category.categoryId,
        categoryName: this.category.categoryName, 
        categoryDescription: this.category.categoryDescription,
        categoryCreateBy: this.category.categoryCreatedBy
       })
      .subscribe(
        data => {
          console.log(data);
          this.category = data as Category;
          this.categoryComponent.reloadData();
        },
        error => console.log(error));
  }


  deleteCategory() {
    this.noteService.deleteCategory(this.category)
      .subscribe(
        data => {
          console.log(data);
          this.categoryComponent.reloadData();
        },
        error => console.log(error));
  }

}

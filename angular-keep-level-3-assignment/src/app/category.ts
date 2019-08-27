export class Category {
    categoryId: Number;
    categoryCreationDate: Date;
    categoryCreatedBy: string;
    categoryDescription: string;
    categoryName :string;
   
  
    constructor() {
      this.categoryId = 0;
      this.categoryCreationDate = new Date();
      this.categoryCreatedBy = '';
      this.categoryDescription= '';
      this.categoryName='';
      
    }
  }
  
  
  
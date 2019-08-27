export class User {
  userId: Number;
    firstName: string;
    lastName: string;
    userPassword: string;
    userName: string;
    userAddedDate: Date;
  
     constructor() {
       this.firstName = '';
       this.lastName = '';
      this.userPassword = '';
     this.userName = '';
     this.userAddedDate = new Date();
   }
  }
  



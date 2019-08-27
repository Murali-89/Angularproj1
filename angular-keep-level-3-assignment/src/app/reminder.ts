export class Reminder {
    reminderId: Number;
    reminderName: string;
    reminderDescription: string;
    reminderType: string;
    reminderCreatedBy: string;
    reminderCreationDate :Date;
   
  
    constructor() {
      this.reminderId = 0;
      this.reminderName ='';
      this.reminderDescription = '';
      this.reminderType= '';
      this.reminderCreatedBy='';
      this.reminderCreationDate=new Date();
      
    }
  }
  

  
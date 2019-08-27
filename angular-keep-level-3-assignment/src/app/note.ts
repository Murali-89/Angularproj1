import { Category } from "./category";
import { Reminder } from "./reminder";


export class Note {
  noteId: Number;
  noteTitle: string;
  noteStatus: string;
  noteCreationDate: string;
  noteCreatedBy: string;
  category:Category;
  reminder:Reminder;

  constructor() {
    this.noteTitle = '';
    this.noteStatus = '';
    this.noteCreatedBy='admin';
  }
  
  
  }

    
  


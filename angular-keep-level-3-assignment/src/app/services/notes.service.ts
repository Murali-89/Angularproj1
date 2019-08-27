import { Injectable, OnInit, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import { Category } from '../category';
import { Reminder } from '../reminder';
import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class NotesService {

  
  notes: Array<Note>;
categories: Array<Category>;
reminders: Array<Reminder>;
  categoryNames: Array<string>;
  notesSubject: BehaviorSubject<Array<Note>>;
 categorySubject: BehaviorSubject<Array<Category>>;
 reminderSubject: BehaviorSubject<Array<Reminder>>;

  notesURL: string = 'http://localhost:8081/api/v1/note';
  categoryURL: string = 'http://localhost:8080/api/v1/category';
  userURL: string = 'http://localhost:8089/api/v1/auth/register';
  reminderURL: string = 'http://localhost:8082/api/v1/reminder';
  token: string = `Bearer ${this._authService.getBearerToken()}`;

  constructor(private http: HttpClient, private _authService: AuthenticationService) {
    this.notes = [];
    this.categories = [];
    this.categoryNames = [];
    this.notesSubject = new BehaviorSubject([]);
    this.categorySubject = new BehaviorSubject([]);
    this.reminderSubject = new BehaviorSubject([]);
  }

  fetchNotesFromServer(userId: string)
   {
     console.log("Came inside fetchNotesFromServer()...")
    return this.http.get<Array<Note>>(`${this.notesURL}/${userId}`, {
    }).subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    }, (err: any) => {
      this.notesSubject.error(err);
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    // let authHeader = new HttpHeaders({
    //   'Authorization':
    //   `Bearer ${this._authService.getBearerToken()}`,
    //   'Content-Type': 'application/json; charset=utf-8'
    // });
    //console.log("console ***value"+JSON.stringify(authHeader));
    
    return this.http.post<Note>(`${this.notesURL}`, note, {
      headers : new HttpHeaders().set('Authorization', this.token)
    }).do(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    });
  }

  editNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.notesURL}/${note.noteCreatedBy}/${note.noteId}`, note, {
      headers: new HttpHeaders().set('Authorization', this.token)
    }).do(editedNote => {
      const existingNote = this.notes.find(noteValue => noteValue.noteId === editedNote.noteId);
      Object.assign(existingNote, editedNote);
      this.notesSubject.next(this.notes);
    });
  }

  deleteNote(note: Note):  Observable<any> {
    const userId=note.noteCreatedBy;
    return this.http.delete(`${this.notesURL}/${note.noteCreatedBy}/${note.noteId}`, { responseType: 'text' }).do(note=>{
      this.fetchCategoryFromServer(userId); 
    });
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(noteValue => noteValue.noteId === +noteId);
    return Object.assign({}, note);
  }
  

  fetchCategoryFromServer(userId: string) {
    return this.http.get<Array<Category>>(`${this.categoryURL}/${userId}`, {
    }).subscribe(categories => {
      this.categories = categories;
      console.log(categories);
      this.categorySubject.next(this.categories);
    }, (err: any) => {
      this.categorySubject.error(err);
    });
  }


  fetchReminderFromServer(userId: string)
   {
     console.log("Came inside fetchReminderFromServer() method.........");
    return this.http.get<Array<Reminder>>(`${this.reminderURL}/${userId}`, {
    }).subscribe(reminders => {
      this.reminders = reminders;
      console.log(reminders);
      this.reminderSubject.next(this.reminders);
    }, (err: any) => {
      this.reminderSubject.error(err);
    });
  }


  getCategoryById(categoryId): Category 
  {
    console.log("came inside getCategoryById()......")
    const category = this.categories.find(category => category.categoryId === categoryId);
    return Object.assign({}, category);
  }
  getCategories(): BehaviorSubject<Array<Category>> 
  {
    console.log("CAme inside getCategories()...... ");
    return this.categorySubject;
  }

  getReminders(): BehaviorSubject<Array<Reminder>>
  {
    console.log("CAme inside getReminders()...... ")
    return this.reminderSubject;
  }


  getReminderById(noteId): Reminder {
   const note=this.getNoteById(noteId);
   return note.reminder;
  }

  registerUser(data) {
    return this.http.post(`${this.userURL}`, data);
  }
  
  saveCategory(data)
  {
    console.log("Came inside savecategory url....");
    return this.http.post(`${this.categoryURL}`, data);
  }

  saveReminder(data)
  {
    console.log("Came inside reminder url....");
    return this.http.post(`${this.reminderURL}`, data);
  }


  deleteCategory(category:Category): Observable<any>
  {
    return this.http.delete(`${this.categoryURL}/delete/${category.categoryId}`, { responseType: 'text' });
  }
 

  updateCategory(categoryId: number, value: any): Observable<Object>
  {
    console.log("id inside updateCategory iss.."+ categoryId);
    return this.http.put(`${this.categoryURL}/update/${categoryId}`, value);
  }
  
  getStates()
  {
    this.categories.forEach(category=>{
      this.categoryNames.push(category.categoryName);
    })
    return this.categoryNames;
  }
}


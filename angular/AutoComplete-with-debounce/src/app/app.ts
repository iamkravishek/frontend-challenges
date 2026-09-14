import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, of, map, Subject, takeUntil } from 'rxjs';

interface OpenStreetMapPlace {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy{
  protected title = 'AutoComplete-with-debounce';

  userSearchPreview= signal<string>(''); 
  apiResultPreview = signal<{display_name : string}[]>([]);
  private BASE_URL :string = 'https://nominatim.openstreetmap.org/search';
  private destroy$ = new Subject<void>();

  userForm = new FormGroup({
    userSearch : new FormControl(
      null, [
        Validators.required, 
        Validators.minLength(1), 
        Validators.maxLength(40)
      ])
  });


  userForms = new FormGroup({
    userText : new FormControl(
      null, [
        Validators.required, 
        Validators.minLength(1), 
        Validators.maxLength(40)
      ])
  });
  
  searchResults$ = this.userFormsResult();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.userFormResult();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  userFormResult(){
    this.userForm.get('userSearch')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter( q => (q ?? '').length > 1),

      // switchMap( value => this.getResults(value ?? '')),
      switchMap(query =>
        this.getResults(query ?? '').pipe(
          catchError(() => of([])),
          map(results =>({
            query,
            results
          }))
        )
      ),
      takeUntil(this.destroy$)
    )
    .subscribe(({ query, results }) => {
    this.userSearchPreview.set(query || '');
    this.apiResultPreview.set(
      results.map((item: OpenStreetMapPlace) => ({
        display_name: item.display_name
      }))
    );
  });
  }

  //2nd Form
  userFormsResult(){
    return this.userForms.get('userText')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter( q => (q ?? '').length > 1),
      switchMap(query =>
        this.getResults(query ?? '').pipe(
          catchError(() => of([] as OpenStreetMapPlace[])),
          map(results =>({
            query,
            results
          }))
        )
      )
    )
  }

  onSubmit(){
    if(this.userForm.valid){
      console.log("Form Submitted!", this.userForm.value);
      this.userFormResult();
    }
  }

  getResults(value: string){
    const params : HttpParams = new HttpParams()
    .set('q', value)
    .set('format', 'jsonv2')
    .set('limit', 5)

    return this.http.get<[]>(this.BASE_URL,{params})
  }
}

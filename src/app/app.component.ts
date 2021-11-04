import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basic-angular-http-request-exercises';
  posts: {title: string, genre: string}[] = [];
  isLoading = false;

  constructor (private http: HttpClient){

  }

  onCreateMovie(form: NgForm) {
    const {title, genre} = form.value
    this.isLoading = true;
    this.http.post(
      'https://movies-project-833c7-default-rtdb.firebaseio.com/movies.json',
      {title, genre})
      .subscribe(responseData =>{
        console.log(responseData)
      })

    console.log(title, genre);
    this.isLoading = false;

  }

  onRetrieveMovie() {
    this.http.get(
      'https://movies-project-833c7-default-rtdb.firebaseio.com/movies.json',
      )
      .pipe(map((responseData: any) => {
        const PostsArray = [];
        for (const key in responseData) {
          PostsArray.push(responseData[key])
        }
        return PostsArray;
      }))
      .subscribe(posts => {
        console.log(posts);
        this.posts = posts
      })
  }

  onClearMovies() {
    this.http.delete(
      'https://movies-project-833c7-default-rtdb.firebaseio.com/movies.json',
      )
  }
}

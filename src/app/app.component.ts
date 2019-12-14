import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsonplaceholderRepository } from './core/repositories/jsonplaceholder-repository.service';
import { Post } from './core/model/post';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app';

  private subscriptions$: Subscription[] = [];
  public posts: Post[];
  public post1: Post;
  public post2: Post;
  public post3: Post;
  public post4: Post;
  public post5: Post;

  constructor(private repository: JsonplaceholderRepository) { }

  ngOnInit() {
    this.subscriptions$.push(this.repository.getResourceList().subscribe((posts:Post[]) => {
      this.posts = posts;
    }));

    // vérifier que les appels répondent dans l'ordre voulu via le débuggeur du navigateur (throtle + reseau + debug)
    this.chainedCalls();
    this.parallelCalls();
  }

  chainedCalls() {
    this.subscriptions$.push(this.repository.getResource('1').pipe(
    mergeMap(res => {
      this.post1 = new Post(res);
      return  this.repository.getResource('2');
    }),
    mergeMap(res => {
      this.post2 = res;
      return this.repository.getResource('3');
    }))
    .subscribe(res => this.post3 = res));
  }

  parallelCalls() {
    this.subscriptions$.push(forkJoin([
      this.repository.getResource('4'),
      this.repository.getResource('5')
    ]).subscribe(([post4, post5]) => {
      this.post4 = post4;
      this.post5 = post5;
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.map(sub => sub.unsubscribe);
  }
}

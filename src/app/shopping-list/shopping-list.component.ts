import { Ingredient } from './../shared/Ingredient.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducers';
import {trigger , state , style, transition, animate, keyframes, group} from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *',
       animate(500, keyframes([
         style({
           transform: 'translateX(-100px)',
           opacity: 0,
           offset: 0
         }),
         style({
          transform: 'translateX(-50px)',
          opacity: 0.5,
          offset: 0.3
        }),
        style({
          transform: 'translateX(-20px)',
          opacity: 1,
          offset: 0.8
        }),
        style({
          transform: 'translateX(0px)',
          opacity: 1,
          offset: 1
        })
       ]))),
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
           })),
          animate(500, style({
            transform: 'translateX(100px)',
            opacity: 0
          })),
        ])
      ]
      ),
    ]),
  ]
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<fromShoppingList.State>;

  constructor(private store: Store<fromShoppingList.ShoppingListState>  ) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem (index: number ) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}

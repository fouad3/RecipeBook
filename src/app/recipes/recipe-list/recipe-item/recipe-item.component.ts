import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {trigger , state , style, transition, animate, keyframes, group} from '@angular/animations';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
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
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: Recipe;
  @Input() index: number;
  ngOnInit() {
  }

}

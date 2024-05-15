import { Component, effect, inject, viewChild } from '@angular/core';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
// ??? Course shows the actual components imported but I got errors if I didn't import the modules
// https://www.youtube.com/watch?v=HqxY0JPlh54


@Component({
  standalone: true,
  selector: 'todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],  
  imports: [MatIconModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatInputModule, 
    CommonModule,       
  ]
})
export class TodosListComponent {

  store = inject(TodosStore)

  filter = viewChild.required(MatButtonToggleGroup);  //signal based equivilant of the angular decorator

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    })
  }
  async onAddToDo(title: string){
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id:string, event: MouseEvent){
    event.stopPropagation();
    this.store.deleteTodo(id);
  }

  async onTodoToggled(id:string, completed:boolean) {
    await this.store.updateTodo(id, completed);
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;

    this.store.updateFilter(filter);
  }
}

import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { TodosStore } from './store/todos.store';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports:[RouterOutlet,
           JsonPipe,
           TodosListComponent,            
           MatProgressSpinnerModule,
           MatSpinner,
          ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  store = inject(TodosStore);

  ngOnInit() {
    this.loadTodos().then(() => 
      console.log("Todos Loaded!")
    );
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}


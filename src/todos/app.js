import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const elementsIDs = {
    TodoList: '.todo-list'
}


/**
 * 
 * @param { String } elementId 
 */

export const App = ( elementId ) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( elementsIDs.TodoList, todos );
    }

    // cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML =  html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();
}
import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderPending, renderTodos } from './use-cases';

const elementsIDs = {
    clearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'
}


/**
 * 
 * @param { String } elementId 
 */

export const App = ( elementId ) => {

    const updatePendingCount = () => {
        renderPending(elementsIDs.PendingCountLabel);
    }
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( elementsIDs.TodoList, todos );
        updatePendingCount();
    }

    // cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML =  html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();

    // Referencias HTML

    const newDescriptionInput = document.querySelector( elementsIDs.NewTodoInput );
    const todoListUL = document.querySelector( elementsIDs.TodoList );
    const clearCompletedButton = document.querySelector( elementsIDs.clearCompletedButton )
    const filtersUL = document.querySelectorAll( elementsIDs.TodoFilters );
    // Listeners
    newDescriptionInput.addEventListener( 'keyup', (event) => {
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if(  !element || !isDestroyElement ) return; 
        todoStore.deleteTodo( element.getAttribute('data-id '));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach( element =>  {

        element.addEventListener('click', ( element ) => {
            filtersUL.forEach( el => el.classList.remove('selected'))
            element.target.classList.add('selected');

            switch ( element.target.text ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All)
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                    break;
            }
            displayTodos();

        })
    })
}
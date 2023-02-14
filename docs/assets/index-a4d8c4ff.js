(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();let y;const v=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(v)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function C(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:E};function P(e,t,s){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const i=e.random||(e.rng||S)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){s=s||0;for(let o=0;o<16;++o)t[s+o]=i[o];return t}return C(i)}class T{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},d={todos:[new T("Piedra del alma"),new T("Piedra del infinito"),new T("Piedra del tiempo")],filter:a.All},A=()=>{L(),console.log("InitStore")},L=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));d.todos=e,d.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(d))},k=(e=a.All)=>{switch(e){case a.All:return[...d.todos];case a.Completed:return d.todos.filter(t=>t.done);case a.Pending:return d.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},U=e=>{if(!e)throw new Error("Not implemented");d.todos.push(new T(e)),g()},I=e=>{d.todos=d.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},x=e=>{d.todos=d.todos.filter(t=>t.id!==e),g()},D=()=>{d.todos=d.todos.filter(e=>!e.done),g()},F=(e=a.All)=>{d.filter=e,g()},q=()=>d.filter,c={initStore:A,loadStore:L,addTodo:U,toggleTodo:I,deleteTodo:x,deleteCompleted:D,setFilter:F,getCurrentFilter:q,getTodos:k},M=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!--  -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let w;const N=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error(`Element ${e} not found`);w.innerHTML=c.getTodos(a.Pending).length},O=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:s,id:i}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${t?"checked":""}>
            <label>${s}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",i),t&&n.classList.add("completed"),n};let h;const H=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(s=>{h.append(O(s))})},m={clearCompletedButton:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{N(m.PendingCountLabel)},s=()=>{const l=c.getTodos(c.getCurrentFilter());H(m.TodoList,l),t()};(()=>{const l=document.createElement("div");l.innerHTML=M,document.querySelector(e).append(l),s()})();const i=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.clearCompletedButton),u=document.querySelectorAll(m.TodoFilters);i.addEventListener("keyup",l=>{l.keyCode===13&&l.target.value.trim().length!==0&&(c.addTodo(l.target.value),s(),l.target.value="")}),o.addEventListener("click",l=>{const p=l.target.closest("[data-id]");c.toggleTodo(p.getAttribute("data-id")),s()}),o.addEventListener("click",l=>{const p=l.target.className==="destroy",f=l.target.closest("[data-id]");!f||!p||(c.deleteTodo(f.getAttribute("data-id ")),s())}),n.addEventListener("click",()=>{c.deleteCompleted(),s()}),u.forEach(l=>{l.addEventListener("click",p=>{switch(u.forEach(f=>f.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break}s()})})};c.initStore();R("#app");

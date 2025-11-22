const todoInput = document.getElementById('result');
const addBtn = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', function() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
       const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = todoText;
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', function() {
            todoList.removeChild(li);
        });

        const doneBtn = document.createElement('button');
        doneBtn.textContent = 'Hoàn thành';
        doneBtn.style.marginLeft = '10px';
        doneBtn.addEventListener('click', function() {
            span.style.textDecoration = 'line-through';
        });

        li.appendChild(deleteBtn);
        li.appendChild(doneBtn);

        todoList.appendChild(li);

        todoInput.value = '';


    }
}
);


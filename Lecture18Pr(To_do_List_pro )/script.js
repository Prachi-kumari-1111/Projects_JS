const root = document.documentElement;
const nav = document.getElementById('nav');

// Theme toggle
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') { root.classList.add('light'); nav.classList.add('light'); }
document.getElementById('theme').addEventListener('click', () => {
    root.classList.toggle('light');
    nav.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Storage helpers
const load = () => JSON.parse(localStorage.getItem('tasks') || '[]');
const save = (data) => localStorage.setItem('tasks', JSON.stringify(data));

// Elements
const listEl = document.getElementById('list');
const newTask = document.getElementById('newTask');
const addBtn = document.getElementById('add');
const countEl = document.getElementById('count');
const search = document.getElementById('search');
const pills = [...document.querySelectorAll('.pill')];

// State
let tasks = load();   // [{id, title, done}]
let filter = 'all';
let query = '';

function uid() { return Math.random().toString(36).slice(2, 9) }

function render() {
    listEl.innerHTML = '';
    const filtered = tasks
        .filter(t => filter === 'all' ? true : filter === 'done' ? t.done : !t.done)
        .filter(t => t.title.toLowerCase().includes(query));
    filtered.forEach(t => listEl.appendChild(row(t)));
    countEl.textContent = `${filtered.length} item${filtered.length !== 1 ? 's' : ''}`;
}

function row(task) {
    const item = document.createElement('div');
    item.className = 'item' + (task.done ? ' done' : '');
    item.dataset.id = task.id;

    const check = document.createElement('div');
    check.className = 'check';
    check.innerHTML = task.done ? '<i class="fa-solid fa-check"></i>' : '';
    check.addEventListener('click', () => toggle(task.id));

    const title = document.createElement('div');
    title.className = 'title';
    const input = document.createElement('input');
    input.value = task.title;
    input.addEventListener('change', (e) => edit(task.id, e.target.value));
    title.appendChild(input);

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = task.done ? 'Done' : 'Task';

    const del = document.createElement('button');
    del.className = 'ghost-btn';
    del.innerHTML = '<i class="fa-solid fa-trash"></i>';
    del.addEventListener('click', () => remove(task.id));

    item.append(check, title, tag, del);
    return item;
}

// CRUD
function add(title) {
    if (!title.trim()) return;
    tasks.push({ id: uid(), title: title.trim(), done: false });
    save(tasks); newTask.value = ''; render();
}
function toggle(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    save(tasks); render();
}
function edit(id, title) {
    tasks = tasks.map(t => t.id === id ? { ...t, title: title.trim() || t.title } : t);
    save(tasks); render();
}
function remove(id) {
    tasks = tasks.filter(t => t.id !== id);
    save(tasks); render();
}
function clearAll() {
    tasks = []; save(tasks); render();
}

// Events
addBtn.addEventListener('click', () => add(newTask.value));
newTask.addEventListener('keydown', (e) => { if (e.key === 'Enter') add(newTask.value) });
document.getElementById('clearAll').addEventListener('click', clearAll);

pills.forEach(p => {
    p.addEventListener('click', () => {
        pills.forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        filter = p.dataset.filter;
        render();
    });
});

search.addEventListener('input', (e) => {
    query = e.target.value.toLowerCase();
    render();
});

// Quick search shortcut
window.addEventListener('keydown', (e) => {
    if (e.key === '/') { e.preventDefault(); search.focus(); }
});

// Initial
render();
const novaTarefaInput = document.getElementById('novaTarefa');
const adicionarTarefaButton = document.getElementById('adicionarTarefa');
const filtrarTarefasInput = document.getElementById('filtrarTarefas');
const escolherTemaButton = document.getElementById('escolherTema');
const toDoList = document.getElementById('toDoList');
const doingList = document.getElementById('doingList');
const doneList = document.getElementById('doneList');
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let temaEscuro = localStorage.getItem('temaEscuro') === 'true';

document.addEventListener('DOMContentLoaded', () => {
    // Carregar tema
    if (temaEscuro) document.body.setAttribute('data-theme', 'dark');
    escolherTemaButton.innerText = temaEscuro ? '☀️ Tema Claro' : '🌙 Tema Escuro';
    listarTarefas();
});

// Função para listar tarefas
function listarTarefas() {
    toDoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${tarefa.name}</span>
            <div>
                ${tarefa.status === 'toDo' ? '<button class="moverParaDoing" aria-label="Mover para Doing">➡️</button>' : ''}
                ${tarefa.status !== 'done' ? '<button class="moverParaDone" aria-label="Mover para Done">✅</button>' : ''}
                <button class="removerTarefa" aria-label="Remover tarefa">🗑️</button>
            </div>
        `;

        // Adicionar eventos de mover tarefa e remover
        if (tarefa.status === 'toDo') {
            li.querySelector('.moverParaDoing').addEventListener('click', () => moverParaDoing(index));
        }
        if (tarefa.status !== 'done') {
            li.querySelector('.moverParaDone').addEventListener('click', () => moverParaDone(index));
        }
        li.querySelector('.removerTarefa').addEventListener('click', () => removerTarefa(index));

        if (tarefa.status === 'toDo') {
            toDoList.appendChild(li);
        } else if (tarefa.status === 'doing') {
            doingList.appendChild(li);
        } else if (tarefa.status === 'done') {
            li.classList.add('tarefaCompleta');
            doneList.appendChild(li);
        }
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Adicionar nova tarefa
adicionarTarefaButton.addEventListener('click', () => {
    const tarefaNome = novaTarefaInput.value.trim();
    if (tarefaNome !== '') {
        tarefas.push({ name: tarefaNome, status: 'toDo' });
        novaTarefaInput.value = '';
        listarTarefas();
    }
});

// Remover tarefa
function removerTarefa(index) {
    tarefas.splice(index, 1);
    listarTarefas();
}

// Mover para Doing
function moverParaDoing(index) {
    tarefas[index].status = 'doing';
    listarTarefas();
}

// Mover para Done
function moverParaDone(index) {
    tarefas[index].status = 'done';
    listarTarefas();
}

// Alterar tema
escolherTemaButton.addEventListener('click', () => {
    temaEscuro = !temaEscuro;
    document.body.setAttribute('data-theme', temaEscuro ? 'dark' : 'light');
    localStorage.setItem('temaEscuro', temaEscuro);
    escolherTemaButton.innerText = temaEscuro ? '☀️ Tema Claro' : '🌙 Tema Escuro';
});

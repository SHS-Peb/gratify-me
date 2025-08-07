const home = document.getElementById('home');
const rewardsView = document.getElementById('rewards');
const todosView = document.getElementById('todos');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');

function show(view) {
  [home, rewardsView, todosView].forEach(v => v.classList.add('hidden'));
  view.classList.remove('hidden');
}

// Navigation
document.getElementById('go-rewards').onclick = () => show(rewardsView);
document.getElementById('go-todo').onclick = () => show(todosView);
document.querySelectorAll('.back').forEach(btn => btn.onclick = () => show(home));
document.getElementById('close-modal').onclick = () => modal.classList.add('hidden');
document.getElementById('minimize-btn').addEventListener('click', () => { window.api.minimize(); });
document.getElementById('close-btn').addEventListener('click', () => { window.api.close(); });

// Render data
async function render() {
  const { rewards, todos } = await window.api.getData();

  const rewardsList = document.getElementById('rewards-list');
  rewardsList.innerHTML = '';
  rewards.forEach((r, i) => {
    const li = document.createElement('li');
    li.textContent = r;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'icon-btn';
    deleteBtn.innerHTML = `<img class="delete-btn" src="icons/deleteBtn.PNG" alt="Delete">`;
    deleteBtn.onclick = async () => {
      await window.api.deleteReward(i);
      render();
    };

    li.appendChild(deleteBtn);
    rewardsList.appendChild(li);
  });

  const todosList = document.getElementById('todos-list');
  todosList.innerHTML = '';
  todos.forEach((t, i) => {
    const li = document.createElement('li');

    const star = document.createElement('span');
    star.textContent = t.done ? '★' : '☆';
    star.className = t.done ? 'star done' : 'star';
    star.onclick = async () => {
      const result = await window.api.toggleTodo(i);
      if (result.reward) {
        modalText.textContent = `Congratulations! Your reward bestie: ${result.reward}`;
        modal.classList.remove('hidden');
      }
      render();
    };

    const taskText = document.createElement('span');
    taskText.textContent = `${t.text} (${t.date})`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'icon-btn';
    deleteBtn.innerHTML = `<img class="delete-btn" src="icons/deleteBtn.PNG" alt="Delete">`;
    deleteBtn.onclick = async () => {
      await window.api.deleteTodo(i);
      render();
    };

    li.appendChild(star);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    todosList.appendChild(li);
  });
}

// Add actions
document.getElementById('add-reward').onclick = async () => {
  const input = document.getElementById('reward-input');
  if (input.value.trim()) {
    await window.api.addReward(input.value);
    input.value = '';
    render();
  }
};

document.getElementById('add-todo').onclick = async () => {
  const text = document.getElementById('todo-text').value.trim();
  const date = document.getElementById('todo-date').value;
  if (text && date) {
    await window.api.addTodo({ text, date, done: false });
    document.getElementById('todo-text').value = '';
    render();
  }
};

render();

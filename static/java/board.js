const button = document.getElementById('show-hide');
const content = document.getElementById('comments');
const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const list = document.getElementById('list');

function btn() {
  content.classList.toggle('hide');
    if (content.classList.contains('hidden')) {
        toggleButton.textContent = 'Show Content';
    } else {
        toggleButton.textContent = 'Hide Content';
    }
}

function addComment(event) {
  event.preventDefault(); // prevent page refresh

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  const li = document.createElement('li');
  li.innerHTML = `<p><strong>${name}</strong></p><p>${comment}</p>`;

  list.appendChild(li);

  form.reset(); // clear input fields
}

button.addEventListener('click', btn);
form.addEventListener('submit', addComment);

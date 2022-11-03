const body = document.querySelector('.container');
window.history.pushState({}, document.title, '/');
const items = [];

fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
  .then((res) => res.json())
  .then((res) => {
    for (let item of res) {
      items.push(item);
      body.insertAdjacentHTML(
        'beforeend',
        `<div class='item' id='${item.id}'>
            <span class='item-title'>${item.title}</span>
            <p class='item-body'>${item.body}</p>
            <input type='checkbox' name='${item.id}' onchange="handleChange(event)"/>
            </div>`
      );
    }
  });

const handleChange = (e) => {
  const card = document.querySelector(`[id='${e.target.name}']`);
  if (card.style.backgroundColor === 'gray') {
    card.style.backgroundColor = '#ffffff';
    card.style.color = '#000000';
  } else {
    card.style.backgroundColor = 'gray';
    card.style.color = '#ffffff';
  }
};

const handleInput = (e) => {
  const input = document.querySelector('.filter-input');
  console.log(input.value);
  if (input.value) {
    window.history.replaceState({}, document.title, `?search=${input.value}`);
  } else {
    window.history.pushState({}, document.title, '/');
  }

  const filteredItem = items.filter((item) => item.title.includes(input.value));
  filteredItem.length && (body.innerHTML = '');
  for (let item of filteredItem.length ? filteredItem : items) {
    body.insertAdjacentHTML(
      'beforeend',
      `<div class='item' id='${item.id}'>
        <span class='item-title'>${item.title}</span>
        <p class='item-body'>${item.body}</p>
        <input type='checkbox' id='checkbox-input' name='${item.id}' onchange="handleChange(event)"/>
        </div>`
    );
  }
};

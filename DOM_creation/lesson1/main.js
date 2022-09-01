// Get list-item id element
const listItem = document.getElementById("list-item");

//create <li> elment
const li = document.createElement('li');

// create a text
const text = document.createTextNode('これです');

// append text to li elment
li.appendChild(text);

// append li elment to id:list-item elment
listItem.appendChild(li);

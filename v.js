const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Hamza Imran",
  "Jeff Bezos",
  "Elon Musk",
  "Bernard Arnault",
  "Bill Gates",
  "Mark Zuckerberg",
  "Warren Buffett",
  "Larry Ellison",
  "Sergey Brin",
  "Mukesh Ambani",
];

const listItems = [];
let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {

      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);
      listItem.setAttribute("draggable", true);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable">
          <p class="person-name">${person}</p>
          <i class="fa-solid fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  dragStartIndex = +this.getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {

  const itemOne = listItems[fromIndex];
  const itemTwo = listItems[toIndex];

  const parent = draggable_list;

  parent.insertBefore(itemOne, itemTwo);
}

function checkOrder() {

  const items = document.querySelectorAll("#draggable-list li");

  items.forEach((item, index) => {

    const personName = item.querySelector(".person-name").textContent.trim();

    if (personName === richestPeople[index]) {
      item.classList.add("right");
      item.classList.remove("wrong");
    } else {
      item.classList.add("wrong");
      item.classList.remove("right");
    }

  });
}

function addEventListener() {

  const dragListItems = document.querySelectorAll(".draggable-list li");

  dragListItems.forEach(item => {

    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);

  });

  check.addEventListener("click", checkOrder);
}
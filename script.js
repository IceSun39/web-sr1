class Faculty {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
}

const faculties = [];

const requestURL = "https://api.jsonbin.io/v3/qs/6ad7352eac6210605a41b86c";

async function fetchData() {
  const button = document.querySelector("#fetchButton");
  const status = document.querySelector("#status");

  button.disabled = true;
  status.textContent = "Завантаження даних...";

  try {
    const response = await fetch(requestURL);

    if (!response.ok) {
      throw new Error(`HTTP-помилка: ${response.status}`);
    }

    const data = await response.json();

    const records = data.record ?? data;

    if (!Array.isArray(records)) {
      throw new Error("Отримані дані мають неправильний формат.");
    }

    faculties.length = 0;

    for (const item of records) {
      newFaculty(item);
    }

    showContent();
    status.textContent = `Завантажено факультетів: ${faculties.length}.`;
  } catch (error) {
    status.textContent = `Не вдалося завантажити дані: ${error.message}`;
    console.error(error);
  } finally {
    button.disabled = false;
  }
}

function newFaculty(obj) {
  for (const nameFaculty of obj.names) {
    const faculty = new Faculty(obj.type, nameFaculty);
    faculties.push(faculty);
  }
}

function showContent() {
  const main = document.querySelector("#facultyList");

  main.replaceChildren();

  const categories = [
    { type: "Технічні", title: "Технічні факультети" },
    { type: "Загальні", title: "Загальні факультети" },
    { type: "Гуманітарні", title: "Гуманітарні факультети" },
  ];

  for (const category of categories) {
    const section = document.createElement("section");
    section.classList.add("faculty-category");

    const heading = document.createElement("h3");
    heading.textContent = category.title;

    const list = document.createElement("ul");

    for (const faculty of faculties) {
      if (faculty.type === category.type) {
        const listItem = document.createElement("li");
        listItem.textContent = faculty.name;
        list.appendChild(listItem);
      }
    }

    section.append(heading, list);
    main.appendChild(section);
  }
}

document.querySelector("#fetchButton").addEventListener("click", fetchData);

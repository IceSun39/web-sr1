class Faculty {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
}

Faculties = new Array();

async function fetchData() {
  const requestURL = " https://api.jsonbin.io/v3/qs/6ad7352eac6210605a41b86c";
  const request = new Request(requestURL);
  const response = await fetch(request);

  if (response.ok) {
    const faclt = await response.json();
  }
}

function newFaculty(obj) {
  for (const nameFaculty of obj.names) {
    const newFaclt = new Faculty(obj.type, nameFaculty);
    Faculties.push(newFaclt);
  }
}

function showContent() {
  const main = document.querySelector("article");

  const techFaculty = document.createElement("div");
  const commonFaculty = document.createElement("div");
  const humanityFaculty = document.createElement("div");

  const techH3 = "Технічні факультети";
  const commonH3 = "Загальні факультети";
  const humanityH3 = "Гуманітарні факультети";

  const techList = document.createElement("ul");
  const commonList = document.createElement("ul");
  const humanityList = document.createElement("ul");

  for (const f of Faculties) {
    const listItem = document.createElement("li");
    listItem.textContent = f.name;
    if (f.type === "Технічні") {
      techList.appendChild(listItem);
    } else if (f.type === "Загальні") {
      commonList.appendChild("listItem");
    } else {
      humanityList.appendChild("listItem");
    }
  }

  techFaculty.appendChild(techH3);
  techFaculty.appendChild(techList);

  commonFaculty.appendChild(commonH3);
  commonFaculty.appendChild(commonList);

  humanityFaculty.appendChild(humanityH3);
  humanityFaculty.appendChild(humanityList);

  main.appendChild(techFaculty);
  main.appendChild(commonFaculty);
  main.appendChild(humanityFaculty);
}

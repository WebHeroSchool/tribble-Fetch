let body = document.body;
let preloader = document.querySelector('.loadingio-spinner-bean-eater');
let url = window.location.toString();
let currentDate = new Date();
let requestInfo, requestDate;

let getName = (url) => {
  let urlDetach = url.split('=');
  let userName = urlDetach[1];
  if (userName == undefined) {
    userName = 'ananastya77';
  }
  return userName;
};

let name = getName(url);

let getCurrentDate = new Promise((resolve, reject) => {
  setTimeout(() => currentDate ? resolve(currentDate) : reject ('Время не определенно'), 2000)
});

function dataRequest() {
  let info = fetch(`https://api.github.com/users/${getName(url)}`);
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve(info);
    reject('error');
    }, 3000)
    })
  return promise;
}

Promise.all([dataRequest(), getCurrentDate])
  .then(([request, date]) => {
    requestInfo = request;
    requestDate = date;
  })
  .then(result => requestInfo.json())
  .then(json => {
    if (json.message === "Not Found") {
          alert('Информация о пользователе не доступна');
        }
    let login = json.login;
    let photo = json.avatar_url;
    let description = json.bio;
    let link = json.html_url;

    let addLogin = () => {
      let showLogin = document.createElement('h1');
      showLogin.innerHTML = login;
      body.appendChild(showLogin);
      }

    let addInfo = () => {
      let showInfo = document.createElement('p');
      showInfo.innerHTML = description;
      body.appendChild(showInfo);
      }

    let addPhoto = () => {
      let showPhoto = document.createElement('img');
      let newString = document.createElement('br');
      showPhoto.src = photo
      body.appendChild(newString);
      body.appendChild(showPhoto);
      }

    let addUserUrl = () => {
      let showUrl = document.createElement('a');
      let text = document.createTextNode('Profile Link');
      let newString = document.createElement('br');
      showUrl.href = link;
      showUrl.appendChild(text);
      body.appendChild(newString);
      body.appendChild(showUrl);
      }

    let addCurrentDate = () => {
      let showDate = document.createElement('p');
      showDate.innerHTML = requestDate;
      body.appendChild(showDate);
      }

    preloader.style.display = 'none';
    addLogin();
    addInfo();
    addPhoto();
    addUserUrl();
    addCurrentDate();
  })
  .catch(error => alert(error));
  
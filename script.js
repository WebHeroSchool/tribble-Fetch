let body = document.body;
let url = window.location.toString();

let getName = (url) => {
  let urlDetach = url.split('=');
  let userName = urlDetach[1];
  if (userName == undefined) {
    userName = 'ananastya77';
  }
  return userName;
};

let name = getName(url);

fetch('https://api.github.com/users/' + name)
 .then(res => res.json())
 .then(showUserInfo => {
  if (json.message === "Not Found") {
          alert('Информация о пользователе не доступна');
        }
  let login = showUserInfo.login;
  let photo = showUserInfo.avatar_url;
  let description = showUserInfo.bio;
  let link = showUserInfo.html_url;

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

  addLogin();
  addInfo();
  addPhoto();
  addUserUrl();
})
.catch(error => alert('Информация о пользователе не доступна'));

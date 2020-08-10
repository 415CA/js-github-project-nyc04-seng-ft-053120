const form = document.getElementById('github-form');
const container = document.getElementById('github-container');
const users = document.getElementById('user-list');
const repoList = document.getElementById('repos-list');

const baseURL = 'https://api.github.com/search/';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const search = event.target.search.value;

  fetch(`${baseURL}users?q=${search}`)
    .then((response) => response.json())
    .then((userArray) => {
      console.log(userArray);
      userArray.items.forEach((item) => displayUser(item));
      userArray.items.forEach((item) => getRepos(item));
    });
});

const displayUser = (item) => {
  const userLi = document.createElement('li');
  userLi.classList.add('user-li');

  const userH2 = document.createElement('h2');
  userH2.innerText = item.login;
  userH2.classList.add('login-name');

  const userAvatar = document.createElement('img');
  userAvatar.src = item.avatar_url;
  userAvatar.height = 300;
  userAvatar.width = 300;
  userAvatar.classList.add('user-avatar');

  const profileLink = document.createElement('a');
  profileLink.href = item.html_url;
  profileLink.innerHTML = 'Profile';

  userLi.append(userH2, userAvatar, profileLink);

  users.append(userLi);
};

const getRepos = (item) => {
  fetch(`${item.repos_url}`)
    .then((response) => response.json())
    .then((repoArray) => {
      repoArray.forEach((repo) => {
        displayRepo(repo);
      });
    });
};

const displayRepo = (repo) => {
  const repoUl = document.createElement('ul');
  repoUl.classList.add('repo-ul');

  const repoLi = document.createElement('li');
  repoLi.classList.add('repo-li');

  const repoLink = document.createElement('a');
  repoLink.href = `https://github.com/${repo.full_name}`;
  repoLink.innerHTML = `${repo.name}`;

  repoLi.append(repoLink);
  repoUl.append(repoLi);
  repoList.append(repoUl);
};

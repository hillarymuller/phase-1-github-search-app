document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('github-form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    getUsers(e.target[0].value)
    form.reset()
    const userList = document.getElementById('user-list')
    userList.textContent = ''
  })  
})

function getUsers(username) {
    fetch(`https://api.github.com/search/users?q=${username}`, {
    method: 'GET',
    headers: {
        Accept: 'application/vnd.github.v3+json'
    }
})
    .then(res => res.json())
    .then(res => res.items.forEach(item => displayUser(item)))
}

function displayUser(user) {
    const userList = document.getElementById('user-list')
    const li = document.createElement('li')
    const image = document.createElement('img')
    image.src = user.avatar_url
    image.alt = user.login
    image.id = user.login
    image.addEventListener('click', getRepositories)
    const h3 = document.createElement('h3')
    h3.textContent = user.login
    li.append(image, h3)
    userList.append(li) 
}

function getRepositories(event) {
    const repoList = document.getElementById('repos-list')
    repoList.textContent = ''
    fetch(`https://api.github.com/users/${event.target.id}/repos`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(res => res.json())
    .then(res => res.forEach(r => displayRepository(r)))
}

function displayRepository(repo) {
    const repoList = document.getElementById('repos-list')
    const li = document.createElement('li')
    li.textContent = repo.name
    repoList.append(li)
}
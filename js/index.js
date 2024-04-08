document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchValue = document.getElementById('search').value;
        searchUsers(searchValue);
    });

    function searchUsers(searchValue) {
       
        fetch(`https://api.github.com/search/users?q=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            
            userList.innerHTML = '';
            
            data.items.forEach(user => {
                const userItem = document.createElement('li');
                userItem.innerHTML = `
                    <img src='${user.avatar_url}' alt='${user.login}' />
                    <a href='${user.html_url}' target='_blank'>${user.login}</a>
                `;
                userList.appendChild(userItem);
             
                userItem.addEventListener('click', function() {
                    fetchUserRepositories(user.login);
                });
            });
        });
    }

    function fetchUserRepositories(username) {
        
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            
            reposList.innerHTML = '';
            
            data.forEach(repo => {
                const repoItem = document.createElement('li');
                repoItem.textContent = repo.name;
                reposList.appendChild(repoItem);
            });
        });
    }
});

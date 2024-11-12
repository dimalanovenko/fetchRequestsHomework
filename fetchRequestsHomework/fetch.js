// Level 1

// Используя ресурс jsonplaceholder получите всех юзеров и отправьте в консоль только

// 1) username отсортированный по алфавиту

// 2) Количество постов каждого изюзеров в параметре: post_count
// https://jsonplaceholder.typicode.com/users
// https://jsonplaceholder.typicode.com/posts

// Level 2
// Выведите всю информацию в виде таблицы на экран и предоставьте
// функции сортировки по каждой из двух
// колонок:
// а) username (default sort by alphabetical)
// b) post_count


const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

async function getUsersAndPosts() {
    try {
        const [users, posts] = await Promise.all([
            fetchJson(usersUrl),
            fetchJson(postsUrl)
        ]);

        const userPostCounts = users.map(user => {
            const postCount = posts.filter(post => post.userId === user.id).length;
            return {
                ...user,
                post_count: postCount
            };
        });

        userPostCounts.sort((a, b) => a.username.localeCompare(b.username));
        renderTable(userPostCounts);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(data) {
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';

    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.username}</td><td>${user.post_count}</td>`;
        tbody.appendChild(row);
    });
}

getUsersAndPosts();


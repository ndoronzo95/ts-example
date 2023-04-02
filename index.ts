import './style.css';

type Email = string;
type ID = number;
type PhoneNumber = string;
type Website = string;

interface Post {
    userId: ID,
    id: number,
    title: string,
    body: string
}

interface Comment {
    postId: ID,
    id: ID,
    name: string,
    email: Email,
    body: string
}

interface Coordinates {
    lat: number,
    lng: number
}

interface Address {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: Coordinates
}

interface Company {
    name: string,
    catchPhrase: string,
    bs: string
  }

interface User {
    id: ID,
    name: string,
    username: string,
    email: Email,
    address: Address,
    phone: PhoneNumber,
    website: Website,
    company: Company
  }

const baseUrl = 'https://jsonplaceholder.typicode.com'

const getUsers = async (): Promise<User[]> => {
    const url = `${baseUrl}/users`;
    const v = await fetch(url);
    return v.json();
}

const getUserPosts = async (user: User): Promise<Post[]> => {
    const url = `${baseUrl}/posts?userId=${user.id}`;
    const res =  await fetch(url);
    return res.json()
}

const getPostComments = async (p: Post): Promise<Comment[]> => {
    const url = `${baseUrl}/comments?postId=${p.id}`;
    const res =  await fetch(url);
    return res.json()
}

const createListItem = (text: string) => {
    const li = document.createElement('li');
    li.textContent = text;
    return li
}

const createPost = (post: Post) => {
    const postItem = createListItem(post.title);
    postItem.addEventListener('click', () => {
        getPostComments(post).then(comments => {
            const commentsList = document.createElement('ul');
            comments.forEach(comment => {
                const comm = createListItem(comment.name);
                commentsList.append(comm)
                
            })
            postItem.append(commentsList)

        })
    }, { once: true })
    return postItem;
}


const createUser = (user: User) => {
    const userItem = createListItem(user.username)
    userItem.addEventListener('click', () => {
        getUserPosts(user).then((posts) => {
            const postList = document.createElement('ul');
            posts.forEach((post) => {
                const postItem = createPost(post);
                postList.append(postItem);
            })
            userItem.append(postList)
        })
    }, { once: true })
    userList.append(userItem)
}

const userList = document.createElement('ul');
document.body.append(userList);

getUsers().then((users) => users.forEach((user) => createUser(user)))


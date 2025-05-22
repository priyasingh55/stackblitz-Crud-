console.log('Hello!');
let form = document.getElementById('form');
let contentInput = document.getElementById('contentInput');
let msg = document.getElementById('msg');
let posts = document.getElementById('posts');
let headingInput = document.getElementById('headingInput');

form.addEventListener('submit', (e) => {
  //to prevent from refreshing page every time when we submit use this e.preventDefault()
  e.preventDefault();
  console.log('button clicked');
  formValidation();
});

let formValidation = () => {
  if (contentInput.value === '' || headingInput.value === '') {
    msg.innerHTML = 'Both heading and content cannot be blank';
    console.log('failure');
  } else {
    console.log('success');
    msg.innerHTML = '';
    acceptData();
  }
};

//accept and store data
let data = {};

//read operation
let acceptData = () => {
  data = { heading: headingInput.value, content: contentInput.value };
  console.log('Data pushed..', data);
  createPost();
};
//upload data on screen //CREATE operation
let createPost = () => {
  posts.innerHTML += `
  <div>
  <p>
  <strong>${data.heading}</strong>
  <br />
  <span>${data.content}</span>
</p>
  <span class="options">
    <i onClick="editPost(this)" class="fa-solid fa-pen-to-square"></i>
    
    <i  onClick="deletePost(this)" class="fa-solid fa-trash"></i>
  </span>
</div> 
  `;
  //after writting clear the input
  headingInput.value = '';
  contentInput.value = '';
};

//delete operation
//window. is used to make function global
window.deletePost = (e) => {
  //delete entire things
  e.parentElement.parentElement.remove();
};

//update operation

window.editPost = (e) => {
  const postElement = e.parentElement.parentElement;
  const heading = postElement.querySelector('strong').textContent;
  const content = postElement.querySelector('span').textContent;

  headingInput.value = heading;
  contentInput.value = content;
  postElement.remove();
};

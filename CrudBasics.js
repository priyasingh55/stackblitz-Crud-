console.log('Hello!');
let form = document.getElementById('form');
let contentInput = document.getElementById('contentInput');
let msg = document.getElementById('msg');
let posts = document.getElementById('posts');
let headingInput = document.getElementById('headingInput');
let deleteSelectedBtn = document.getElementById('deleteSelectedBtn');


form.addEventListener('submit', (e) => {
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

let data = {};

let acceptData = () => {
  data = { heading: headingInput.value, content: contentInput.value };
  console.log('Data pushed..', data);
  createPost();
};


let createPost = () => {
  posts.innerHTML += `
  <div>
    <input type="checkbox" class="post-checkbox">
    <p>
      <strong>${data.heading}</strong>
      <br />
      <span>${data.content}</span>
    </p>
    <span class="options">
      <i onclick="editPost(this)" class="fa-solid fa-pen-to-square"></i>
      <i onclick="postdelete(this)" class="fa-solid fa-trash"></i>
    </span>
  </div> 
  `;
  headingInput.value = '';
  contentInput.value = '';
};


window.editPost = (e) => {
  const postElement = e.parentElement.parentElement;
  const heading = postElement.querySelector('strong').textContent;
  const content = postElement.querySelector('span').textContent;
  
  headingInput.value = heading;
  contentInput.value = content;
  postElement.remove();
};

window.postdelete = (e) => {
  e.parentElement.parentElement.remove();
};


deleteSelectedBtn.addEventListener('click', deleteSelectedPosts);
const checkboxes = document.querySelectorAll('.post-checkbox');
function deleteSelectedPosts() {
  
  checkboxes.forEach(checkbox => {
    checkbox.parentElement.remove();
  });
  
  
}
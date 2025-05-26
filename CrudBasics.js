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



window.editPost = (e) => {
  const postElement = e.parentElement.parentElement;
  const heading = postElement.querySelector('strong').textContent;
  const content = postElement.querySelector('span').textContent;
  
  headingInput.value = heading;
  contentInput.value = content;
  
 
  currentlyEditingSingle = postElement;
  currentlyEditingMultiple = null;
};


window.multiEdit = () => {
  const selectedCheckboxes = document.querySelectorAll('.post-checkbox:checked');
  
  if (selectedCheckboxes.length === 0) {
    msg.innerHTML = 'Please select at least one post to edit';
    return;
  }
  

  currentlyEditingSingle = null;
  currentlyEditingMultiple = Array.from(selectedCheckboxes).map(checkbox => checkbox.parentElement);
  
 
  const firstPost = currentlyEditingMultiple[0];
  headingInput.value = firstPost.querySelector('strong').textContent;
  contentInput.value = firstPost.querySelector('span').textContent;
  
  msg.innerHTML = `Editing ${currentlyEditingMultiple.length} posts`;


};


let acceptData = () => {
  data = { heading: headingInput.value, content: contentInput.value };
  console.log('Data pushed..', data);
  
  if (currentlyEditingSingle) {
   
    updatePost(currentlyEditingSingle);
    currentlyEditingSingle = null;
  } else if (currentlyEditingMultiple) {
   
    currentlyEditingMultiple.forEach(post => updatePost(post));
    currentlyEditingMultiple = null;
    msg.innerHTML = `Updated ${currentlyEditingMultiple.length} posts`;
  } else {
   
    createPost();
  }
  

  headingInput.value = '';
  contentInput.value = '';
};


function updatePost(postElement) {
  postElement.querySelector('strong').textContent = data.heading;
  postElement.querySelector('span').textContent = data.content;
}


let currentlyEditingSingle = null;
let currentlyEditingMultiple = null;




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


document.getElementById('multiEditBtn').addEventListener('click', multiEdit);


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
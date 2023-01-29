console.log("hello");

const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const formElement = document.querySelector('#comments-form form');

async function loadComments() {
  console.log("loadComments");
  const orderListElement = document.createElement("ol");
  const postId = loadCommentsBtnElement.dataset.postid;

  try {
    const respons = await fetch(`/posts/${postId}/comments`);
    if (!respons.ok) {
      return alert("We have some problems to load data please try later.");
    } else {
      const commentsData = await respons.json();
      console.log(commentsData);
      if (commentsData && commentsData.length > 0) {
        for (const comment of commentsData) {
          const listItemElement = document.createElement("li");
          listItemElement.innerHTML = `
                        <article class="comment-item">
                            <h2>${comment.title}</h2>
                            <p>${comment.text}></p>
                        </article>`;
          orderListElement.appendChild(listItemElement);
        }
        commentsSectionElement.innerHTML = "";
        commentsSectionElement.appendChild(orderListElement);
      } else {
        commentsSectionElement.firstElementChild.textContent =
          "We could not find any comments. Please add one.";
      }
    }
  } catch (error) {
    return alert("We have some problems to load data please try later.");
  }
}

async function saveComment(event) {
    event.preventDefault();
    console.log('saveComments');

    const form = new FormData(event.target);
    const postId = formElement.dataset.postid;

    const inputData = {
        title: form.get('title'),
        text: form.get('text')
    }

    console.log(inputData);

    try {
        const result = await fetch(`/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify(inputData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (result.ok) {
            loadComments();
            formElement.reset();
        } else {
            return alert("We have some problems to load data please try later.");
        }
    } catch {
        return alert("We have some problems to load data please try later.");
    }
}

loadCommentsBtnElement.addEventListener("click", loadComments);

formElement.addEventListener('submit', saveComment);

export function createElementPost(post) {
  const { title, description, price, location, willDeliver, isAuthor } = post;
  return $(`<div class="post-tab"><h2>${title}</h2>
    <p><b>Description:</b> ${description}</p>
    <p><b>Price:</b> ${price}</p>
    <p><b>Location:</b> ${location}</p>
    <p><b>Will deliver:</b> ${willDeliver ? "YES, YOU GOT IT" : "NO, SORRY"}</p>
    ${
      isAuthor
        ? "<button class='edit-post'>EDIT</button>    <button class='delete-post'>DELETE</button>"
        : localStorage.getItem("userToken")
        ? "<button class='send-message'>MESSAGE</button>"
        // <form id='messageForm' class='messageFormHidden'><textarea type='text' id='messageBody'/><button type='submit' class='messageButton'>SEND</button></form>
        : ""
    }</div>`).data("post", post);
}

export function updateScreen(posts) {
  $(".post-container").empty();
  posts.forEach((post) => {
    $(".post-container").prepend(createElementPost(post));
  });
}

// export function createElementMessage(message) {
//   const { title, description, price, location, willDeliver, isAuthor } = post;
//   return $(`<div class="post-tab"><h2>${title}</h2>
//     <p><b>Description:</b> ${description}</p>
//     <p><b>Price:</b> ${price}</p>
//     <p><b>Location:</b> ${location}</p>
//     <p><b>Will deliver:</b> ${willDeliver ? "YES, YOU GOT IT" : "NO, SORRY"}</p>
//     ${
//       isAuthor
//         ? "<button class='edit-post'>EDIT</button>    <button class='delete-post'>DELETE</button>"
//         : localStorage.getItem("userToken")
//         ? "<button class='send-message'>MESSAGE</button><form id='messageForm' class='messageFormHidden'><textarea type='text' id='messageBody'/><button type='submit' class='messageButton'>SEND</button></form>"
//         : ""
//     }</div>`).data("post", post);
// }

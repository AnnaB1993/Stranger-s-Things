export function createNewPostFromForm() {
  let title = $("#post-title").val();
  let description = $("#post-body").val();
  let price = $("#post-price").val();
  let location = $("#post-location").val();
  let willDeliver = $("#willDeliver").val();
  let newPost = {
    title: title,
    description: description,
    price: price,
    location: location,
    willDeliver: willDeliver,
  };
  console.log(newPost);
  return newPost;
}

export function createElementPost({
  title,
  description,
  price,
  location,
  willDeliver,
}) {
  return (newEl = $(`<div><h2>${title}</h2>
    <p>${description}</p>
    <p>${price}</p>
    <p>${location}</p>
    <p>${willDeliver ? "YES, YOU GOT IT" : "NO, SORRY"}</p>
    </div>`));
}

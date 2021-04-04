// 2101-vpi-web-pt
// 2101-VPI-RM-WEB-PT
import {
  createNewUser,
  loginUser,
  getUser,
  getPosts,
  newPost,
  editPost,
  deletePost,
  messageUser,
} from "./auth.js";

import { createElementPost, updateScreen } from "./create.js";

const state = {
  token: isLoggedIn() ? localStorage.getItem("userToken") : "",
  user: null,
  posts: [],
  searchTerm: "",
};

const searchForm = $("#search-bar");
const searchField = $("#post-search");

if (state.token) {
  getUser(state.token)
    .then((user) => {
      state.user = user;
    })
    .then(loginUI);
}

console.log(state);

function registerUserHandler() {
  $(".modal").addClass("open");
}
function loginHandler() {
  $(".modalLogin").addClass("open");
}
function loginUI() {
  $("main").removeClass("full-width").addClass("two-third-width");
  $("#login-user").trigger("reset");
  $(".modalLogin").removeClass("open");
  $(".login").removeClass("visible");
  $(".register").addClass("invisible");
  $(".logout").addClass("in");
  $("aside").addClass("pop-up");
  $(".myMessages").addClass("in");
}
function logoutHandler() {
  $(".login").addClass("visible");
  $(".register").removeClass("invisible");
  $(".logout").removeClass("in");
  $("aside").removeClass("pop-up");
  $("main").removeClass("two-third-width").addClass("full-width");
  $(".message-container").removeClass("messageUp");
  $(".myMessages").removeClass("in");
  deleteToken();
  state.token = "";
}

function storeToken(token) {
  localStorage.setItem("userToken", token);
}

function deleteToken() {
  localStorage.removeItem("userToken");
}

function isLoggedIn() {
  if (localStorage.getItem("userToken")) {
    return true;
  } else {
    return false;
  }
}
function messagesOpen() {
  if ($("main").hasClass("two-third-width")) {
    $("main").removeClass("two-third-width").addClass("postMiddle");
    $(".message-container").addClass("messageUp");
  } else if ($("main").hasClass("postMiddle")) {
    $("main").removeClass("postMiddle").addClass("two-third-width");
    $(".message-container").removeClass("messageUp");
  }
}

//CLICKS

$(".register").click(registerUserHandler);
$(".login").click(loginHandler);
$(".logout").click(logoutHandler);
$(".myMessages").click(messagesOpen);

$(".action.cancel-create-user").click(function () {
  $("#register-user").trigger("reset");
  $(".modal").removeClass("open");
});

$(".action.cancel-login").click(function () {
  $("#login-user").trigger("reset");
  $(".modalLogin").removeClass("open");
});

$("#login-user").on("submit", async function (event) {
  event.preventDefault();

  const userObj = {
    username: $("#login-name").val(),
    password: $("#login-password").val(),
  };

  console.log(userObj);
  try {
    const token = await loginUser(userObj);
    storeToken(token);
    state.token = token;

    const user = await getUser(token);
    state.user = user;
    console.log(state.user);

    const posts = await getPosts(token);
    state.posts = posts;
    console.log(state.posts);
    updateScreen(posts);
    loginUI();
  } catch (error) {
    $(".modalLogin").append($(`<p>${error.message}</p>`));
  }
});

$("#register-user").on("submit", async function (event) {
  event.preventDefault();

  const userObj = {
    username: $("#user-name").val(),
    password: $("#user-password").val(),
  };

  console.log(userObj);

  const token = await createNewUser(userObj);
  storeToken(token);
  console.log(token);

  $(".modal").removeClass("open");
});

$("#user-password-confirm, #user-password, #user-name").on(
  "input",
  function (event) {
    let password1 = $("#user-password").val();
    let password2 = $("#user-password-confirm").val();
    let username = $("#user-name").val();
    console.log(password1, password2, username);
    if (
      password1 !== "" &&
      password2 !== "" &&
      username !== "" &&
      password1 === password2
    ) {
      $(".action.create-user.when-valid").removeAttr("disabled");
    } else {
      $(".action.create-user.when-valid").attr("disabled", true);
    }
  }
);

$(".post-form").on("submit", async function (event) {
  event.preventDefault();
  const { post, postEl } = $(this).data();
  const postData = {
    title: $("#post-title").val(),
    description: $("#post-body").val(),
    price: $("#post-price").val(),
    location: $("#post-location").val()
      ? $("#post-location").val()
      : "[On Request]",
    willDeliver: Boolean($("#willDeliver").val()),
  };

  if (post) {
    try {
      const result = await editPost(post._id, postData);
      state.posts = state.posts.map((_post) => {
        if (_post._id === post._id) {
          return result.data.post;
        } else {
          return _post;
        }
      });
      updateScreen(state.posts);

      $(".post-form").trigger("reset");
    } catch (error) {}
    //editing
  } else {
    try {
      const newPostObj = await newPost(postData);

      const posts = await getPosts(localStorage.getItem("userToken"));
      state.posts = posts;
      $(".post-container").prepend(createElementPost(newPostObj));
      updateScreen(posts);

      $(".post-form").trigger("reset");
    } catch (error) {
      console.log(error);
    }
  }
});

$(".post-container").on("click", ".delete-post", async function () {
  const postEl = $(this).closest(".post-tab");
  const post = postEl.data("post");

  try {
    const result = await deletePost(post._id);
    state.posts = state.posts.filter((_post) => _post._id !== post._id);
    updateScreen(state.posts);
  } catch (error) {
    console.error(error);
  }
});

$(".post-container").on("click", ".send-message", async function (event) {
  event.preventDefault();
  const postEl = $(this).closest(".post-tab");
  const post = postEl.data("post");
  const inputMessage = $("<form id='messageForm' class='messageFormHidden'><textarea type='text' id='messageBody'/><button type='submit' class='messageButton'>SEND</button></form>");
  postEl.append(inputMessage);

  //how to hide the form if clicked again?
  //how to combine 2 clicks under the same function? the one right under
  //multiple event listeners on the same element?


})


$(".post-container").on("click", ".messageButton", async function (event) {
  event.preventDefault();
  const postEl = $(this).closest(".post-tab");
  const post = postEl.data("post");
  const message = {
    content: $("#messageBody").val(),
  };
  console.log(message);
  try {
    const result = await messageUser(post._id, message);
    console.log(result);
    $("#messageForm").trigger("reset");
  } catch (error) {
    console.log(error);
  }
});

$(".post-container").on("click", ".edit-post", async function () {
  const postEl = $(this).closest(".post-tab");
  const post = postEl.data("post");

  $(".post-form").data({ post, postEl });
  $("#post-title").val(post.title);
  $("#post-body").val(post.description);
  $("#post-price").val(post.price);
  $("#post-location").val(post.location);
  $("#post-willDeliver").val(post.willDeliver);
});

searchForm.on("submit", (event) => {
  event.preventDefault();

  const searchValue = searchField.val();

  if (!searchValue) {
    updateScreen(state.posts);
    return;
  }
  const searchTerms = searchValue.toLowerCase().split(" ");

  const matches = state.posts.filter((postObj) => {
    const titleWords = postObj.title.toLowerCase().split(" ");
    const descriptionWords = postObj.description.toLowerCase().split(" ");
    const locationWords = postObj.location.toLowerCase().split(", ");

    const isTitleMatch = titleWords.some((word) => {
      return searchTerms.some((searchTerm) => searchTerm === word);
    });
    const isDescriptionMatch = descriptionWords.some((word) => {
      return searchTerms.some((searchTerm) => searchTerm === word);
    });
    const isLocationMatch = locationWords.some((word) => {
      return searchTerms.some((searchTerm) => searchTerm === word);
    });
    console.log(isTitleMatch);
    return isTitleMatch || isDescriptionMatch || isLocationMatch;
  });
  updateScreen(matches);
  searchForm.trigger("reset");
});

function loadApp() {
  getPosts(state.token)
    .then((posts) => {
      state.posts = posts;
      updateScreen(state.posts);
    })
    .catch(console.error);
}

loadApp();


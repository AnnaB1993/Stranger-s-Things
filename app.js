// 2101-vpi-web-pt
//HELPER FUNCTIONS
import { createNewUser, loginUser, getUser, getPosts } from "./auth.js";
import { createNewPostFromForm } from "./create.js";

function registerUserHandler() {
  $(".modal").addClass("open");
}
function loginHandler() {
  $(".modalLogin").addClass("open");
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

//CLICKS
$(".register").click(registerUserHandler);
$(".login").click(loginHandler);
$(".action.cancel-create-user").click(function () {
  $("#register-user").trigger("reset");
  $(".modal").removeClass("open");
});
$(".action.cancel-login").click(function () {
  $("#login-user").trigger("reset");
  $(".modalLogin").removeClass("open");
});
$("#post-form").on("submit", function(event){
  event.preventDefault();
  createNewPostFromForm();
})
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
    getUser(token);
    getPosts();
    console.log(token);
    $(".modalLogin").removeClass("open");
    $(".login").removeClass("visible");
    $(".logout").addClass("in");
    $("aside").addClass("pop-up");
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

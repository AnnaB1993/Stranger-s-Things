export async function createNewUser(userObj) {
  try {
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userObj }),
      }
    );
    console.log(response);
    const parsedJson = await response.json();
    console.log(parsedJson);
    return parsedJson.data.token;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(userObj) {
  try {
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userObj }),
      }
    );
    console.log(response);
    const parsedJson = await response.json();
    console.log(parsedJson);
    if (parsedJson.error) {
      throw new Error(parsedJson.error.message);
    }
    return parsedJson.data.token;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getUser(token) {
  try {
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    const parsedJson = await response.json();
    console.log(parsedJson.data.username);
    return parsedJson.data.username;
  } catch (error) {
    console.error;
  }
}

export async function getPosts(token) {
  try {
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts",
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    );

    const parsedJson = await response.json();
    console.log(parsedJson);
    return parsedJson.data.posts;
  } catch (error) {
    console.error(error);
  }
}

export async function newPost(postObj) {
  try {
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ post: postObj }),
      }
    );
    console.log("response", response);
    const parsedPost = await response.json();
    console.log(parsedPost);
    return parsedPost.data;
  } catch (error) {
    console.error(error);
  }
}
export async function deletePost(postId) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    console.log("response", response);
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    return parsedResponse;
  } catch (error) {
    console.error(error);
  }
}

export async function editPost(postId, updatedPostObj) {
  try {
    const response = await fetch(
      `http://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ post: updatedPostObj }),
      }
    );
    const result = await response.json();
    console.log("UPDATED", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function messageUser(postId, messageBody) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts/${postId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          message: messageBody,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

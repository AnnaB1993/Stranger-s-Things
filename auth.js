export async function createNewUser(userObj) {
  try {
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2101-vpi-web-pt/users/register",
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
      "https://strangers-things.herokuapp.com/api/2101-vpi-web-pt/users/login",
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
      "https://strangers-things.herokuapp.com/api/2101-vpi-web-pt/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    const parsedJson = await response.json();
    console.log(parsedJson);
  } catch (error) {
    console.error;
  }
}

export async function getPosts(){
  try{
    const response = await fetch('https://strangers-things.herokuapp.com/api/2101-vpi-web-pt/posts')
    const parsedJson = response.json();
    console.log(parsedJson)
  }
  catch (error){
    console.error}}

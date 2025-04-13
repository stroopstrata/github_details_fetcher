import "./styles.css";
//accessing searchButton, userInput and div ele userCard to display card details
const searchButton = document.getElementById("searchButton");
const userInput = document.getElementById("userInput");
const userCard = document.getElementById("userCard");

//using Set() which allows only unique ele to store
const storedUsers = new Set();

//when searchButton is clicked
//adding eventlistener
searchButton.addEventListener("click", async function () {
  //async makes function asynchronous to use await()->waits till the api response comes
  //without waiting for response it causes problem in response.json() convertion
  const nameValue = userInput.value; //getting text-value from userInput field

  if (storedUsers.has(nameValue)) {
    // to check if nameValue already in storedUser Set()
    return;
  }
  //fetching response using fetch API form github based on nameValue
  const response = await fetch(`https://api.github.com/users/${nameValue}`);
  if (!response.ok) {
    //checking if response is invalid
    alert("Account not found!");
    return;
  }
  // storing API response into userdetails using .json() method
  //which converts the former into easily manipulatable object
  const fetchedUserDetails = await response.json();
  createUserCard(fetchedUserDetails);
  storedUsers.add(nameValue); //updation the storedUsers Set()
});
//creating userCard function
window.createUserCard = function (fetchedUserDetails) {
  const card = document.createElement("div");
  card.className = "card";
  const top = document.createElement("div");
  top.className = "top";
  const title = document.createElement("div");
  title.className = "title";
  title.innerHTML = `<h3>${fetchedUserDetails.name || "No name available"}</h3>
  <p>@${fetchedUserDetails.login}</p>
  `;
  top.innerHTML = `
    <img src="${fetchedUserDetails.avatar_url}" alt="${fetchedUserDetails.login}">
    
  `;
  top.appendChild(title);
  const middle = document.createElement("div");
  middle.className = "middle";
  const middleDiv1 = document.createElement("div");
  middleDiv1.className = "middleDiv";
  middleDiv1.innerHTML = `<h3>${fetchedUserDetails.public_repos}</h3
    <p>REPOS</p>
  `;
  const middleDiv2 = document.createElement("div");
  middleDiv2.className = "middleDiv";
  middleDiv2.setAttribute("id", "middleDiv2");
  middleDiv2.innerHTML = `<h3>${fetchedUserDetails.public_gists}</h3
    <p>GISTS</p>
  `;
  const middleDiv3 = document.createElement("div");
  middleDiv3.className = "middleDiv";
  middleDiv3.setAttribute("id", "middleDiv3");
  middleDiv3.innerHTML = `<h3>${fetchedUserDetails.followers}</h3
    <p>FOLLOWERS</p>
  `;
  middle.appendChild(middleDiv1);
  middle.appendChild(middleDiv2);
  middle.appendChild(middleDiv3);
  const bottom = document.createElement("div");
  bottom.className = "bottom";
  bottom.innerHTML = `
  <p class="info">${fetchedUserDetails.bio || "No bio available"}</p>
  `;
  card.appendChild(top);
  card.appendChild(middle);
  card.appendChild(bottom);

  userCard.appendChild(card);
};
async function fetchDefaultUser() {
  const defaultResponse = await fetch(
    `https://api.github.com/users/${"jordwalke"}`
  );
  const defaultUser = await defaultResponse.json();
  createUserCard(defaultUser);
}
fetchDefaultUser();

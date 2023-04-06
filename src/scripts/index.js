// Definining and creating the principal HTML elements
const body = document.querySelector("body")
const main = document.createElement("main")
const aside = document.createElement("aside")

const header = document.createElement("header")
const h1 = document.createElement("h1")
const button = document.createElement("button")
h1.innerHTML="TechPosters"
button.innerHTML="Sair"
body.append(header)
header.append(h1, button)


// Creating function that render the cards
function render(array, name, section, functionName) {
    const h1 = document.createElement("h1")
    h1.innerHTML=name
    const list = document.createElement("ul")
  
    list.innerHTML = ''
  
    for(let i = 0; i < array.length; i++) {
      const post = array[i]
  
      const card = functionName(post)
  
      list.appendChild(card)
    }
    body.append(section)
    main.append(h1, list)
}

// Creating function that render the posts
function createCard(posts){
    // Creating elements
    const li = document.createElement("li")
    const postOwner = document.createElement("div")
    const userImg = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    const name = document.createElement("p")
    const description = document.createElement("p")

    const postDescription = document.createElement("div")
    const h2 = document.createElement("h2")
    const postText = document.createElement("p")

    const postLikes = document.createElement("div")
    const button = document.createElement("button")
    const heartImage = document.createElement("img")
    const numberOfLikes = document.createElement("p")

    // Assigining values to the elements
    userImg.src=posts.img 
    name.innerHTML=posts.user 
    description.innerHTML=posts.stack 

    h2.innerHTML=posts.title 
    postText.innerHTML=posts.text 

    button.innerHTML="Abrir post" 
    heartImage.src="./src/assets/img/greyHeart.svg" 
    numberOfLikes.innerHTML=posts.likes 


    // Establishing the hierarchy between elements
    li.append(postOwner, postDescription, postLikes)
    postOwner.append(userImg, figcaption)
    figcaption.append(name, description)
    postDescription.append(h2, postText)
    postLikes.append(button, heartImage, numberOfLikes)

    return li
}

// Creating function that render the friends sugestions cards
function createCardSugestion(users){
  // Creating elements
  const li = document.createElement("li")
  const userImg = document.createElement("img")
  const figcaption = document.createElement("figcaption")
  const name = document.createElement("p")
  const description = document.createElement("p")
  const button = document.createElement("button")

  // Assigining values to the elements
  userImg.src=users.img 
  name.innerHTML=users.user 
  description.innerHTML=users.stack 
  button.innerHTML="Seguir"

  // Establishing the hierarchy between elements
  li.append(userImg, figcaption, button)
  figcaption.append(name, description)

  return li
}


render(posts, "Posts", main, createCard)
render(suggestUsers, "Sugestões para você seguir", aside, createCardSugestion)

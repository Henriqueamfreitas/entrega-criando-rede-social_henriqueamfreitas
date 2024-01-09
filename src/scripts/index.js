const body = document.querySelector('body')
const main = document.createElement('main')
const aside = document.createElement('aside')
const div = document.createElement('div')

const header = document.createElement('header')
const h1 = document.createElement('h1')
const button = document.createElement('button')
h1.innerHTML='TechPosters'
button.innerHTML='Sair'
button.classList='text-2'
body.append(header)
header.append(h1, button)
body.append(createNewPost(users))

function render(array, name, section, sectionString, functionName) {
    const h1 = document.createElement('h1')
    h1.innerHTML=name
    h1.classList= `${sectionString}__h1 title-1`
    const list = document.createElement('ul')
    list.classList= `${sectionString}__ul`

  
    list.innerHTML = ''
  
    for(let i = 0; i < array.length; i++) {
      const post = array[i]
  
      const card = functionName(post, sectionString)
  
      list.appendChild(card)
    }
    body.append(section)
    section.append(h1, list)
}

function createNewPost(users){
  const newPostSection = document.createElement('section') 
  const figure = document.createElement('figure')
  const userImg = document.createElement('img')
  const figcaption = document.createElement('figcaption')
  const name = document.createElement('p')
  const description = document.createElement('p')

  const form = document.createElement('form')
  const newPostTitle = document.createElement('input')
  const newPostDescription = document.createElement('input')
  const div = document.createElement('div')
  const button = document.createElement('button')

  newPostSection.classList=`newPostSection`
  figure.classList=`newPostSection__figure`
  userImg.classList=`profile__img`
  figcaption.classList=`profile__figcaption`
  name.classList=`profile-figcaption__name title-2`
  description.classList=`profile-figcaption__description text-2`

  form.classList=`newPost__form`
  newPostTitle.classList=`newPostSection__postTitle`
  newPostDescription.classList=`newPostSection__postDescription`
  div.classList='newPost__buttonPart'
  button.classList=`newPostSection__button text-4`

  const user=users[0]
  userImg.src=user.img 
  name.innerHTML=user.user 
  description.innerHTML=user.stack 

  newPostTitle.placeholder='Digitar título do post'
  newPostDescription.placeholder='Digitar descrição do post'
  newPostTitle.required=true
  newPostDescription.required=true
  button.innerHTML='Postar' 
  button.type='submit'

  
  newPostSection.append(figure, newPostTitle, newPostDescription, form)
  form.append(newPostTitle, newPostDescription, div)
  div.append(button)
  figure.append(userImg, figcaption)
  figcaption.append(name, description)
  

  form.addEventListener('keyup', ()=>{
    if((newPostTitle.value !== '') && (newPostDescription.value !== '')){
      button.style.backgroundColor='#4263EB'
      button.style.color='#FFFFFF'
    } else{
      button.style.backgroundColor='#DEE2E6'
      button.style.color='#868E96'
    }
  })

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    if (newPostTitle.value && newPostDescription.value) {
        const newPost = {
        id: posts.length + 1,
        title: newPostTitle.value,
        text: newPostDescription.value.substring(0,199),
        fullText: newPostDescription.value,
        user: user.user, 
        stack: user.stack, 
        img: user.img, 
        likes: 0
    }
  
      posts.push(newPost);

      newPostTitle.value = '';
      newPostDescription.value = '';
  
      const mainSection = document.querySelector('main');
      mainSection.innerHTML = ''; 
      render(posts, 'Posts', mainSection, 'main', createCard);
      showPostModal(posts);
    }
  })
  
  return newPostSection
}

function createCard(posts, sectionString){
    const li = document.createElement('li')
    const figure = document.createElement('figure')
    const userImg = document.createElement('img')
    const figcaption = document.createElement('figcaption')
    const name = document.createElement('p')
    const description = document.createElement('p')

    const postDescription = document.createElement('div')
    const h2 = document.createElement('h2')
    const postText = document.createElement('p')

    const postLikes = document.createElement('div')
    const button = document.createElement('button')
    const likeButton = document.createElement('button')
    const likesInformation = document.createElement('div')
    const heartImage = document.createElement('img')
    const numberOfLikes = document.createElement('p')

    li.classList=`${sectionString}__li`
    figure.classList=`${sectionString}__figure`
    userImg.classList=`figure__img`
    figcaption.classList=`figure__figcaption`
    name.classList=`${sectionString}-figcaption__name title-2`
    description.classList=`${sectionString}-figcaption__description text-2`

    postDescription.classList=`${sectionString}__postDescription`
    h2.classList=`postDescription__h2 title-1`
    postText.classList=`postDescription__postText text-1`

    postLikes.classList=`${sectionString}__postLikes`
    button.classList=`postLikes__button text-4`
    likeButton.classList=`likeButton`
    likesInformation.classList=`likesInformation`
    heartImage.classList=`postLikes__heartImage`
    numberOfLikes.classList=`postLikes__numberOfLikes text-2`

    button.dataset.postsId=posts.id

    userImg.src=posts.img 
    name.innerHTML=posts.user 
    description.innerHTML=posts.stack 

    h2.innerHTML=posts.title 
    postText.innerHTML=posts.text 

    button.innerHTML='Abrir post' 
    heartImage.src='./src/assets/img/greyHeart.svg' 
    numberOfLikes.innerHTML=posts.likes 

    li.append(figure, postDescription, postLikes)
    figure.append(userImg, figcaption)
    figcaption.append(name, description)
    postDescription.append(h2, postText)
    postLikes.append(button, likesInformation)
    likesInformation.append(likeButton, numberOfLikes)
    likeButton.append(heartImage)

    let clicked=false
    likeButton.addEventListener('click', ()=>{
      clicked = !clicked
      if (clicked) {
        let updatedNumberOfLikes=0
        updatedNumberOfLikes += posts.likes+1
        numberOfLikes.innerHTML = updatedNumberOfLikes
        heartImage.src='./src/assets/img/redHeart.svg' 
      } else {
        numberOfLikes.innerHTML = posts.likes
        heartImage.src='./src/assets/img/greyHeart.svg' 
      }
    })

    return li
}

function createModalCard(posts, sectionString){
  const closeButton = document.createElement('button')

  const li = document.createElement('li')
  const figure = document.createElement('figure')
  const userImg = document.createElement('img')
  const figcaption = document.createElement('figcaption')
  const name = document.createElement('p')
  const description = document.createElement('p')

  const postDescription = document.createElement('div')
  const h2 = document.createElement('h2')
  const postText = document.createElement('p')

  closeButton.classList=`modal__closeButton`
  
  li.classList=`modal__li`
  figure.classList=`modal__figure`
  userImg.classList=`modal-figure__img`
  figcaption.classList=`modal-figure__figcaption`
  name.classList=`modal-figcaption__name title-2`
  description.classList=`modal-figcaption__description text-2`

  postDescription.classList=`modal__postDescription`
  h2.classList=`modal-postDescription__h2 title-1`
  postText.classList=`modal-postDescription__postText text-1`

  closeButton.innerHTML='X'

  userImg.src=posts.img 
  name.innerHTML=posts.user 
  description.innerHTML=posts.stack 

  h2.innerHTML=posts.title 
  postText.innerHTML=posts.fullText 

  li.append(closeButton, figure, postDescription)
  figure.append(userImg, figcaption)
  figcaption.append(name, description)
  postDescription.append(h2, postText)

  return li
}

function createCardSugestion(users, sectionString){
  const li = document.createElement('li')
  const figure = document.createElement('figure')
  const userImg = document.createElement('img')
  const figcaption = document.createElement('figcaption')
  const name = document.createElement('p')
  const description = document.createElement('p')
  const button = document.createElement('button')
  
  li.classList=`${sectionString}__li`
  figure.classList=`${sectionString}__figure`
  userImg.classList=`figure__img`
  figcaption.classList=`figure__figcaption`
  name.classList=`figcaption__name title-2`
  description.classList=`figcaption__description text-2`
  button.classList='text-4'

  userImg.src=users.img 
  name.innerHTML=users.user 
  description.innerHTML=users.stack 
  button.innerHTML='Seguir'

  let clicked=false
  button.addEventListener('click', ()=>{
    clicked=!clicked
    if(clicked){
      button.innerHTML='Seguindo'
      button.style.backgroundColor='#212529'
      button.style.color='#FFFFFF'
      button.style.borderColor='#FFFFFF'
    }else{
      button.innerHTML='Seguir'
      button.style.backgroundColor='#FFFFFF'
      button.style.color='#212529'
      button.style.borderColor='#212529'
    }  
  })

  li.append(figure, button)
  figure.append(userImg, figcaption)
  figcaption.append(name, description)

  return li
}

function closeModal(){
  const button = document.querySelector('.modal__closeButton')
  const modalController = document.querySelector('.modal-item__controller')
  
  button.addEventListener('click', ()=>{
    modalController.close()
  })
}

function showPostModal(array){
  const modalController = document.querySelector('.modal-item__controller')
  const buttons = document.querySelectorAll('.main__ul > .main__li > .main__postLikes > .postLikes__button')

  for (let i=0; i<buttons.length; i++){
    const button = buttons[i]

    button.addEventListener('click', (event)=>{
      modalController.innerHTML=''
      let id = event.target.dataset.postsId
      let post = findPost(array, id)
      const modalCard = createModalCard(post)
      const modalList = document.createElement('ul')
      modalList.append(modalCard)
      modalController.append(modalList) 

      modalController.showModal()
      closeModal()
    })
  }
}

function findPost(array, id){
  let post = {}

  for(let i = 0; i < array.length; i++) {
    if(array[i].id == id) {
      post = array[i]

      return post
    }
  }
}

createNewPost(users)
render(suggestUsers, 'Sugestões para você seguir', aside, 'aside', createCardSugestion)
render(posts, 'Posts', main, 'main', createCard)
showPostModal(posts)
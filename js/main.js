document.querySelector('button').addEventListener('click', getFetch)

document.querySelector('#totalBks').innerText = localStorage.getItem('books')

if( !localStorage.getItem('botScore')){
 console.log("no books read")
} else {
  document.querySelector('#totalPgs').innerText = 'Wow! That is a total of ' + localStorage.getItem('botScore') + ' pages!'
}


function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
    .then(response => {
     if (response.ok) {
      return response.json()  //parse response as JSON
     } else if(response.status === 404) {
        console.log("try again")
        document.querySelector('#error').innerText = "Please enter valid ISBN#"
      } else {
      return Promise.reject('some other error: ' + response.status)
    }
  })
      
      .then(data => {
        console.log(data.title)
        console.log(data.number_of_pages)
        if(!localStorage.getItem('books') && !localStorage.getItem('botScore')){
          localStorage.setItem('books', data.title)
          localStorage.setItem('botScore', Number(data.number_of_pages))
          document.location.reload(true)
        
        } 
        else{
            //put title into localStorage
         let books = localStorage.getItem('books') + " ; " + data.title 
         document.querySelector('#success').innerText = `You Just Added ${data.title}!`
         localStorage.setItem('books', books)
         document.querySelector('#totalBks').innerText = localStorage.getItem('books') 

          //put page number into localstorage 
         let botScore = Number(localStorage.getItem('botScore'))
         botScore = botScore + Number(data.number_of_pages)
         localStorage.setItem('botScore', botScore)

         document.querySelector('#totalPgs').innerText = 'Wow! That is a total of ' + localStorage.getItem('botScore') + ' pages!'

         //adds cactus for acurate count
         document.querySelector('#cat').src = "img/favicon-32x32.png"
         //clears input
         document.querySelector('input').value = '';
         
        }
                
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function WordCount(str) { 
  if(!localStorage.getItem('books')) {
 console.log("no books read!")
}
  else {
      str = localStorage.getItem('books')
  cactusCount = str.split(";").length;
  console.log(cactusCount)
  
 for (i=0 ; i < cactusCount; i++ ){
  //create an img
  var img = document.createElement('img')
  img.setAttribute("src", "img/favicon-32x32.png")
  document.querySelector('#cactusGarden').appendChild(img)
 }
  }

}
WordCount()









// //Example fetch using pokemonapi.co
// document.querySelector('button').addEventListener('click', getFetch)

// document.querySelector('ul').innerText = localStorage.getItem('book')

// function getFetch(){
//   const isbn = document.querySelector('input').value
//   console.log(isbn)
//   const url = `https://openlibrary.org/isbn/${isbn}.json`

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data.title)
//         console.log(data.number_of_pages)
//         // let numberOfBooks = Number(localStorage.getItem('book'))
//         // addABook = numberOfBooks + 1
//         let books =  localStorage.getItem('book') + ' ; ' + data.title
//         localStorage.setItem('book', books)
//         document.querySelector('h2').innerText = localStorage.getItem('book')
//         //add to localstorage 
//         // document.querySelector('ul').innerText = localStorage.setItem('book', data.title)

//         document.querySelector('h3').innerText = `You Just Added ${data.title}!`
//         // const li = document.createElement('li')
//         // li.textContent = localStorage.getItem('book') + ' ; ' + data.title
//         // document.querySelector('ul').appendChild(books)
       
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }


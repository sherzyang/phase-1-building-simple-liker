// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Actions taken after the DOM has loaded 
function doThings(){

  // Hide error message by default 
  let errorModal = document.getElementById("modal");
  errorModal.classList.add('hidden')

  // Add event listener for heart clicks 
  let likes = document.getElementsByClassName("like-glyph");  
  for (i=0; i< likes.length; i++) {
    let item = likes[i]
    item.addEventListener("click", serverCall)
  }
  
  // A function for updating the DOM based on heart clicks 
  function updateHeart(action){
    console.log(`inside update heart: ${action.innerText}`)

    let heart = action.innerText;

    if (heart === EMPTY_HEART){
      action.classList.add("activated-heart")
      action.innerText = FULL_HEART;
    }
    else if (heart === FULL_HEART){
      action.classList.remove("activated-heart")
      action.innerText = EMPTY_HEART;
    } 

  }

  // A function that calls the 'server' when a heart is clicked
  function serverCall(event){
    let action = event.target;
    mimicServerCall()
    .then(()=>updateHeart(action))
    .catch((error)=>{
      errorModal.querySelector("h2").innerText = error;
      errorModal.classList.remove('hidden');
      setTimeout(()=>{errorModal.classList.add('hidden')},3000)
    })
    // Show alert [missing]
  }

}

// Listening for the DOM to load
document.addEventListener("DOMContentLoaded", doThings);

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

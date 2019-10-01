let data = {};
let bookList = {};
let filteredBookList = {};

window.onload = fetchData();

const input = document.getElementById("search-input");

input.addEventListener("keyup", () => {
    searchInput();
})

// fetch data from API
function fetchData () {
    const url = "https://api.myjson.com/bins/zyv02";

    fetch(url)
    .then(res => res.json())
    .catch(err => { throw err })
    .then(jsonResponse => {
        data = jsonResponse;
        bookList = data.books;
        renderFlipBoxes(bookList);
    })    
}


// creates flip boxes following this template:
{/* 
<div class="flip-box">
    <div class="flip-box-inner">
        <div class="flip-box-front">
            <img src="" />        
        </div>
        <div class="flip-box-back">
            <h3>Headline</h3>
            <p>Description</p>
            <button type="button"><a data-fancybox="gallery" href="">More information</a></button>
        </div>
    </div>
</div> 
*/}
function renderFlipBoxes(dataObject) {
    const flipBoxContainer = document.getElementById("flip-box-container");
    let flipBox = "";
    let flipBoxInner = "";
    let flipBoxFront = "";
    let flipBoxBack = "";
    let flipImage = "";
    let flipHeading = "";
    let flipHeadingText = "";
    let flipDescription = "";
    let flipDescriptionText = "";
    let flipButton = "";
    let flipLink = "";
    let flipLinkTextNode = "";
    const flipLinkText = "More Information";

    // removes content from flip box container; for filtering
    flipBoxContainer.innerHTML = "";

    // iterate through book list and create flip box for each
    dataObject.forEach(book => {
        flipBox = document.createElement("div");
        flipBox.classList.add("flip-box");
        flipBox.classList.add("m-1");

        flipBoxInner = document.createElement("div");
        flipBoxInner.classList.add("flip-box-inner");

        flipBoxFront = document.createElement("div");
        flipBoxFront.classList.add("flip-box-front");

        flipImage = document.createElement("img");
        flipImage.setAttribute("src", book.cover);
        flipBoxFront.appendChild(flipImage);

        flipBoxBack = document.createElement("div");
        flipBoxBack.classList.add("flip-box-back");

        flipHeading = document.createElement("h3");
        flipHeadingText = document.createTextNode(book.title);
        flipHeading.appendChild(flipHeadingText);
        flipBoxBack.appendChild(flipHeading);

        flipDescription = document.createElement("p");
        flipDescription.classList.add("m-1");
        flipDescriptionText = document.createTextNode(book.description);
        flipDescription.appendChild(flipDescriptionText);
        flipBoxBack.appendChild(flipDescription);

        flipButton = document.createElement("button");
        flipButton.setAttribute("type", "button");
        flipLink = document.createElement("a");
        flipLink.setAttribute("data-fancybox", "gallery");
        flipLink.setAttribute("href", book.detail);
        flipLinkTextNode = document.createTextNode(flipLinkText);
        flipLink.appendChild(flipLinkTextNode);
        flipButton.appendChild(flipLink);
        flipBoxBack.appendChild(flipButton);
    

        // add flip box front to flip box inner
        flipBoxInner.appendChild(flipBoxFront);

        // add flip box back to flip box inner
        flipBoxInner.appendChild(flipBoxBack);

        // add flip box inner to flip box
        flipBox.appendChild(flipBoxInner);

        // add flip box to flip box container
        flipBoxContainer.appendChild(flipBox);
    });
}


// filter by user input
function searchInput() {
    filteredBookList =  [];
    let query = input.value;

    // filter book list by user input
    bookList.forEach(book =>{
        for (prop in book) {
            if (Object.prototype.hasOwnProperty.call(book, prop)) {
                if (book[prop].toLowerCase().includes(query.toLowerCase())) {
                    filteredBookList.push(book);
                    break;
                }
            }
        }
    })  

    // re-render flip boxes with filtered book list as input
    renderFlipBoxes(filteredBookList);
}
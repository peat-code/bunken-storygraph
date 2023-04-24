console.log("storygraph check from script.js")

const API = 'https://api.bunken.tk/'


 let ebookElement = document.createElement('div')
 let ebookResultsElement;
 


//storygraph
let divWithInfo = document.querySelector(".book-title-author-and-series")
let bookTitle = divWithInfo.children[0].childNodes[0].textContent.trim()
let authorName = divWithInfo.querySelectorAll("a[href*='/authors/']")[0].innerText
let ISBNCode =  document.querySelectorAll(".edition-info")[0].children[0].childNodes[1].textContent.trim()



function insert( newNode) {
    document.getElementsByClassName("action-menu")[1].parentElement.appendChild(newNode)
    //referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function ebookElementInflator(results) {
    ebookResultsElement.innerHTML = ''
    results.forEach(book => {
        let resultElement = document.createElement('div')
        resultElement.className = 'elementList'
        let bookElement = document.createElement('div')
        let bookLinkElement = document.createElement('a')
        bookLinkElement.href = book.link
        bookLinkElement.textContent = book.title
        bookLinkElement.className = 'actionLinkLite bookPageGenreLink'
        bookLinkElement.target = "_blank"
        bookElement.appendChild(bookLinkElement)
        resultElement.appendChild(bookElement)

        function hoverOverLink (){
            this.style.color='#30A5A2'}
        function hoverOutLink(){
            this.style.color='white'
        }
        if (book.downloads != null) {
            book.downloads.forEach(download => {
                let downloadElement = document.createElement('div')
                let downloadLinkElement = document.createElement('a')
                downloadLinkElement.href = download.link
                downloadLinkElement.textContent = download.format
                downloadLinkElement.style.color = 'white'
                downloadLinkElement.onmouseover = hoverOverLink 
                downloadLinkElement.onmouseout = hoverOutLink 
                downloadElement.appendChild(downloadLinkElement)
                resultElement.appendChild(downloadElement)
            })
        }

        let authorElement = document.createElement('div')
        authorElement.textContent = book.author
        resultElement.appendChild(authorElement)

        let clearElement = document.createElement('div')
        clearElement.className = 'clear'
        resultElement.appendChild(clearElement)

        ebookResultsElement.appendChild(resultElement)
    })
}

function sourceSelect() {
    let e = document.getElementById("source");
    let value = e.options[e.selectedIndex].value;
    search(value)
}

function setupUI() {
    let template = `<div class="h2Container gradientHeaderContainer">
                        <h2 class="brownBackground">E-Books</h2>
                    </div>
                    <select id="source" onchange="sourceSelect()" style="background-color:#333333">
                    <option value="libgen/fiction">Source: LibGen Fiction</option>
                    <option value="libgen">Source: LibGen</option>
                    <option value="motw">Source: Memory Of The World</option>
                    <option value="audiobookbay">Source: AudioBookBay</option>
                    <option value="openlibrary">Source: OpenLibrary</option>
                    </select> 
                    <div id="ebookResults" class="bigBoxContent containerWithHeaderContent" style="overflow-y: auto;" id="resultsDiv">Searching...</div>`
    ebookElement.innerHTML = template
    ebookElement.className = 'bigBox'
    ebookElement.style.paddingTop="4rem"
    insert( ebookElement)
    ebookResultsElement = document.getElementById('ebookResults')
}

function search(source) {
    ebookResultsElement.innerHTML = 'Searching...'
    fetch(`${API}${source}?title=${encodeURIComponent(bookTitle)}&isbn=${encodeURIComponent(ISBNCode)}&author=${encodeURIComponent(authorName)}`).then(response => {
        response.json().then(res => {
            ebookElementInflator(res)
        })
    })
}

setupUI();
search('libgen/fiction')
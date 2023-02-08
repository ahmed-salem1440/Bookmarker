var bookName = document.getElementById("bookmarkerName")
var bookURL = document.getElementById("bookmarkerURL")

var bookmarks = []
if(localStorage.getItem("bookmarks") != null){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    displayBookmarks()
}
function addBm(){
    var bookmark = {
        name : bookName.value , 
        url : bookURL.value
    }
    nameValidation()
    isExist()
    if(isExist() && nameValidation()){
        bookmarks.push(bookmark)
        document.getElementById("nameWarning").innerHTML = ""
        document.getElementById("urlWarning").innerHTML = ""
        clearInputs()
    }
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks))
    displayBookmarks()
    
}
function nameValidation(){
    var name = true
    var url = true
    document.getElementById("nameWarning").classList.replace("d-block","d-none")
    document.getElementById("urlWarning").classList.replace("d-block","d-none")

    if (bookName.value == ""){
        document.getElementById("nameWarning").innerHTML = "<h5>Name is required</h5>"
        document.getElementById("nameWarning").classList.replace("d-none","d-block")
        name = false
    }
    if (bookURL.value == ""){
        document.getElementById("urlWarning").innerHTML = "<h5>URL is required</h5>"
        document.getElementById("urlWarning").classList.replace("d-none","d-block")

        url = false
    }
    return (name && url)
}
function isExist(){
    var isTrue = true
    for (var i = 0 ; i<bookmarks.length ; i++){
        if (bookName.value == bookmarks[i].name){
            document.getElementById("nameWarning").innerHTML = `<h5>Name ${bookmarks[i].name} is already exist</h5>`
            document.getElementById("nameWarning").classList.replace("d-none","d-block")
            isTrue =  false
            break;
        }
    }
    return isTrue
}


function displayBookmarks(){
    var tcontent = ``
    for(var i=0 ; i<bookmarks.length;i++){
        tcontent+= `<tr>
        <td>${bookmarks[i].name}</td>
        <td>
        <a href="${bookmarks[i].url}" target="_blank" class="btn btn-primary">Visit</a>
        </td>
        <td>
        <button onclick='deleteBm(${i})' class="btn btn-danger">Delete</button>
        </td>
    </tr>
        `
    }
    if (tcontent != ``){
        document.getElementById("tHead").innerHTML = `
        <td>Bookmark</td>
        <td>Visit</td>
        <td>Delete</td>`
    }else{
        document.getElementById("tHead").innerHTML = ``
    }
    document.getElementById("tcontent").innerHTML = tcontent
}

function clearInputs(){
document.getElementById("bookmarkerName").value = ""
document.getElementById("bookmarkerURL").value = ""
}

function deleteBm(index){
    bookmarks.splice(index,1)
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    displayBookmarks()
}


document.getElementById("bookmarkerURL").addEventListener("keydown" , function (e){
    if(e.code == "Enter"){
        addBm()
    }
})

document.getElementById("bookmarkerName").addEventListener("keydown" , function (e){
    if(e.code == "Enter"){
        addBm()
    }
})
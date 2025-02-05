document.getElementById("show-comments").addEventListener("click", function() {
    let commentSection = document.getElementById("comment-section");
    if (commentSection.style.display === "none") {
        commentSection.style.display = "block";
        console.log("showing comments");
    } else {    
        commentSection.style.display = "none";
        console.log("hiding comments");
    }
})

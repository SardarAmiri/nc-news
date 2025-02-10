
  
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded");
    // document
    //   .getElementById("sortSelect")
    //   .addEventListener("change", function () {
    //     // console.log("Sort select not changed");
    //     // const selectedValue = this.value;
    //     // console.log("Selected value:", selectedValue);

    //     // Get base URL from data attribute
    //     const baseUrl = this.dataset.baseUrl;
    //     const urlParams = new URLSearchParams(window.location.search);
    //     // Update parameters
    //     urlParams.set("sort", this.value);
    //     urlParams.delete("page"); // Reset to first page

    //     // Redirect with new parameters
    //     window.location.href = `${baseUrl}?${urlParams.toString()}`;
    //   });
    const sortSelect = document.getElementById("sortSelect");
    const articlesContainer = document.getElementById("articlesContainer");

    if (!sortSelect || !articlesContainer) return;

    // Main fetch function
    const fetchArticles = async (url) => {
      try {
        // Show loading state
        articlesContainer.innerHTML = `
          <div class="d-flex justify-content-center align-items-center" style="height: 579px;">
            <div class="spinner-border text-danger" role="status" style="width: 3rem; height: 3rem;">
              <span class="visually-hidden">Loading...</span>
            </div>
         </div>
          `;

        // Make AJAX request
        const response = await fetch(url, {
          headers: {
            "X-Requested-With": "XMLHttpRequest", // Identify as AJAX request
          },
        });

        if (!response.ok) throw new Error("Network response was not ok");

        // Parse JSON response
        const data = await response.json();

        // Update articles container
        articlesContainer.innerHTML = data.html;

        // Update browser URL without reload
        window.history.pushState(null, "", url);

        // Re-attach pagination handlers
        attachPaginationHandlers();
      } catch (error) {
        console.error("Fetch error:", error);
        articlesContainer.innerHTML =
          '<div class="alert alert-danger">Error loading articles</div>';
      }
    };

    // Handle sorting changes
    const handleSortChange = () => {
      const baseUrl = sortSelect.dataset.baseUrl;
      const url = new URL(baseUrl, window.location.origin);

      // Set query parameters
      url.searchParams.set("sort", sortSelect.value);
      url.searchParams.delete("page"); // Reset to first page

      fetchArticles(url.toString());
    };

    // Handle pagination clicks
    const handlePaginationClick = (event) => {
      event.preventDefault();
      const url = event.target.href;
      fetchArticles(url);
    };

    // Attach pagination event listeners
    const attachPaginationHandlers = () => {
      document.querySelectorAll(".pagination a").forEach((link) => {
        link.addEventListener("click", handlePaginationClick);
      });
    };

    // Initial setup
    sortSelect.addEventListener("change", handleSortChange);
    attachPaginationHandlers();
  });
  
  document
    .getElementById("show-comments")
    .addEventListener("click", function () {
      let commentSection = document.getElementById("comment-section");
      if (commentSection.style.display === "none") {
        commentSection.style.display = "block";
        console.log("showing comments");
      } else {
        commentSection.style.display = "none";
        console.log("hiding comments");
      }
    });

  document
    .getElementById("comment-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      console.log("Form data:", formData);
      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
            .value,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.success) {
            // Clear the form
            document.getElementById("comment-body").value = "";

            //   create new comment element and Prepend new comment to comment section
            const commentDiv = document.createElement("div");
            commentDiv.className = "bg-body-tertiary rounded-3 px-3 py-1 mb-2";
            commentDiv.setAttribute("data-comment-id", data.id);
            commentDiv.innerHTML = `
                <p class="text-dark mb-0">
                    <strong>${data.username}</strong>
                    <span class="text-muted small ms-2">${
                      data.created_at
                    }</span>
                </p>
                <p class="text-muted d-block">
                    <small>${data.body}</small>
                </p>
                <div class="d-flex align-items-center">
                    <button class="btn-vote btn btn-link btn-sm p-0" data-vote-type="up" data-id="${
                      data.id
                    }">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <span class="mx-1" id="comment-votes-${data.id}">0</span>
                    <button class="btn-vote btn btn-link btn-sm p-0" data-vote-type="down" data-id="${
                      data.id
                    }">
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                    ${
                      data.is_author
                        ? `<button class="btn-delete-comment btn btn-sm text-danger p-0 ms-2" data-id="${data.id}">Delete</button>`
                        : ""
                    }
                </div>
            `;
            document.getElementById("comment-section").prepend(commentDiv);
          } else {
            alert("Failed to add comment.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while adding the comment.");
        });
    });

  document.addEventListener("click", function (event) {
    console.log("Click event detected"); // Debugging statement
    if (event.target.classList.contains("btn-delete-comment")) {
      console.log("Deleting...");
      const commentId = event.target.getAttribute("data-id");
      fetch(`/comments/${commentId}/delete/`, {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
            .value,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const commentElement = document.querySelector(
              `[data-comment-id="${data.id}"]`
            );
            commentElement.remove();
          } else {
            alert("Failed to delete comment.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    if (event.target.classList.contains("btn-vote") || event.target.closest(".btn-vote")) {
      console.log("Vote button clicked");
      let target = event.target;
      if (!target.classList.contains("btn-vote")) {
        target = target.closest(".btn-vote");
      }
    
      const commentId = target.getAttribute("data-id");
      const voteType = target.getAttribute("data-vote-type");
      console.log("Vote commentId:", commentId);
      console.log("Vote voteType:", voteType);

      
      if(commentId && voteType){
        fetch(`/comments/${commentId}/vote/`, {
          method: "POST",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
              .value,
          },
          body: new URLSearchParams({
            vote_type: voteType,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              const votesElement = document.getElementById(
                `comment-votes-${data.id}`
              );
              votesElement.textContent = data.votes;
            } else {
              alert("Failed to vote.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  });


  


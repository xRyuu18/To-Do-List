const inputBox = document.getElementById ('input-box');
const List = document.getElementById ('list');

document.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
      Addbtn();
    }
  });

function Addbtn() {
    if (inputBox.value === '') {
        swal.fire({
            text: 'You must enter something before adding to the list!',
            icon: 'error',
        })
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        List.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

List.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function clearItems() {
    if (List.children.length === 0) {
        Swal.fire({
          icon: "info",
          title: "List is already empty!",
          text: "There are no items to delete.",
        });
        return;
      }
        const checkedItems = document.querySelectorAll("#list li.checked");
        
        if (checkedItems.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No checked items!",
            text: "Please check at least one item before clearing.",
          });
          return;
        }
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your checked list has been clear.",
            icon: "success"
          });
          const checkedItems = document.querySelectorAll("#list li.checked");
          checkedItems.forEach((item) => item.remove());
          saveData();
        }
      });
}

function clearAll() {
    if (List.children.length === 0) {
        Swal.fire({
          icon: "info",
          title: "List is already empty!",
          text: "There are no items to delete.",
        });
        return;
      }

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "All your list has been clear.",
            icon: "success"
          }); 
          List.innerHTML = '';
          saveData();
        }
      });
}

function saveData() {
  localStorage.setItem("todoList", List.innerHTML);
}

function showData() {
  List.innerHTML = localStorage.getItem("todoList");
}
showData();
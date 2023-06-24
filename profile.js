function openPage(page) {
    let i;
    const x = document.getElementsByClassName("page");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(page).style.display = "block";  
  }
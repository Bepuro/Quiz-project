const cards = document.querySelectorAll('.card');

[...cards].forEach((card)=>{
    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped'); // можно this
    }); 
}); 

const dir = {0:['мама','папа'],1:['тетя','дядя'],2:['сестра','брат']};
let i = 0;

document.getElementById("one").addEventListener(() => {
    
})
document.getElementById("one").onclick = function() { // addEventListener
    if (Object.keys(dir).length === i) {

        document.getElementById("f").innerHTML = "Я";
        document.getElementById("b").innerHTML = "Семья";
        i =0;
    }
    else {
        document.getElementById("f").innerHTML = dir[i][0];
        document.getElementById("b").innerHTML = dir[i][1];
        i++;
    }
}

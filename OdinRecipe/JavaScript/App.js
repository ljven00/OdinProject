const styled_button = document.querySelector(".styled");
const css_style = document.querySelector("link");

styled_button.addEventListener("click",
(e) =>{
    if(css_style.getAttribute("href") === null){
        if(e.target.classList[1] === "index")
            css_style.setAttribute("href", "Styles/Style.css");
        else
            css_style.setAttribute("href", "../Styles/Style.css");
        styled_button.textContent = "Unstyle";
    }
    else{
        css_style.removeAttribute("href");
        styled_button.textContent = "Apply Style";
    }
});
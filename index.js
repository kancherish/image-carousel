export default function imageCarousel(src, target, height = "100%", width = "100%", autoSlide = true) {

const hover_class = '.sha256qdnejhnfqwjedbwe:hover{cursor:pointer;}'

const selected_class = 'sha256jnfdwjkebjkedfbwjfcbwjmfnwklf';

let common_style;

let Imgsrc;

let current_index = 0;

let style = document.querySelector("style");

let is_style = style ? true : false

if (!is_style) {
    style = document.createElement("style");
}

style.innerHTML += hover_class;

if (!is_style) {
    document.querySelector("head").appendChild(style)
}

const right_btn = document.createElement("div");
right_btn.innerText = ">";
right_btn.classList.add("sha256qdnejhnfqwjedbwe");
right_btn.onclick = forward
right_btn.style.cssText = `
    position:absolute;
    font-weight:900;
    height:20%;
    width:10%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: rgba(255,255,255,0.5);
    color:aliceblue;
    font-size:3em;
    top:40%;
    left:90%;
`;

const left_btn = document.createElement("div");
left_btn.innerText = "<";
left_btn.classList.add("sha256qdnejhnfqwjedbwe");
left_btn.onclick = backward
left_btn.style.cssText = `
    position:absolute;
    font-weight:900;
    height:20%;
    width:10%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: rgba(255,255,255,0.5);
    color:aliceblue;
    font-size:3em;
    top:40%;
`;


    common_style = `
        height: ${height};
        width: ${width};
    `;

    Imgsrc = src;

    let img = get_image(Imgsrc[0], common_style);

    let container = document.createElement("div");
    container.classList.add("sha256hebcdyhyhsujiedjufh");
    container.style.cssText = common_style + ` position:relative`;

    container.appendChild(img);

    if(src.length===1)
    {
        document.querySelector(target).append(container);
        return;
    }

    container.appendChild(get_indexes(src.length));
    container.appendChild(right_btn);
    container.appendChild(left_btn);

    document.querySelector(target).append(container);

    auto_slide(autoSlide)



function get_indexes(len) {

    const bar = document.createElement("div");
    bar.classList.add("sha256bfjwefhnkwjfdaksfkneknfe")
    bar.style.cssText = `
    position:absolute;
    height:10%;
    top:86%;
    right:10%;
    display:flex;
    justify-content:center;
    width:60%;
    `

    for (let i = 0; i < len; i++) {
       const index = get_index_div(i,i===0)
        bar.appendChild(index)
    }
    return bar;


}

function get_image(src) {
    let img = document.createElement("img");
    img.setAttribute("src", src);
    img.style.cssText = common_style;
    return img;
}

function get_index_div(i,selected){
    const index = document.createElement("div");
    index.classList.add("sha256qdnejhnfqwjedbwe");
    let color = "aliceblue";
    if (selected) {
        index.classList.add(selected_class);
        color="#7BD8FA";
    }
    index.innerHTML = ".";
    index.onclick = () => {
        current_index=i;
        change_img(current_index)
        change_selected(current_index)
    }
    index.style.cssText = `
    font-size:2.3em;
    font-weight:bold;
    max-height:100%;
    color:${color};
    `;
    return index;
}

function forward() {
    current_index = (current_index + 1) % Imgsrc.length;
    change_img(current_index);
    change_selected(current_index);
}

function backward() {
    current_index = (current_index - 1) < 0 ? Imgsrc.length - 1 : current_index - 1;
    change_img(current_index);
    change_selected(current_index);
}


function change_img(ind) {
    let cont = document.querySelector(".sha256hebcdyhyhsujiedjufh");
    cont.replaceChild(get_image(Imgsrc[ind]), cont.firstChild);
}

function change_selected(i) {
    let current_selection = document.querySelector("."+selected_class);
    if(current_selection)
    {
        current_selection.style.color = "aliceblue";
        current_selection.classList.remove(selected_class);
        let curr = document.querySelector(`.sha256bfjwefhnkwjfdaksfkneknfe`).childNodes[i];
        curr.classList.add(selected_class);
        curr.style.color = "#7BD8FA"

    }

}

function auto_slide(autoSlide) {
    let interValId;
    if (autoSlide) {
        interValId = setInterval(forward, 5000)
    }
    else {
        clearInterval(interValId)
    }
}

}

let nixon = {
    name: "Richard Nixon",
    picture: `./nixon.jpg`,
    party: "Republican",
    cursor: `url(./nixon.png), auto`,
    click(){
        let thankYouMessage = document.createElement("h1");
        thankYouMessage.innerHTML = "Thank you for voting!";
        main.appendChild(thankYouMessage);
        document.getElementById("McGovernBox").style.display = "none";
        reset(document.getElementById("McGovern"));
        document.getElementById("Nixon").removeEventListener("click", nixon.click);
    }
}
let mcGovern = {
    name: "George McGovern",
    picture: "./mcgovern.jpg",
    party: "Democrat",
    cursor: `wait`,
    imageCredit: "https://listen.sdpb.org/politics/2014-07-26/george-mcgovern-favorite-son-of-south-dakota",
    position: "right",
    click(){
    }
}
let runners = [nixon, mcGovern];
let stickyButton = false;
let backgroundColor = `rgb(${Math.floor(Math.random() * 128) + 128}, ${Math.floor(Math.random() * 128) + 128}, ${Math.floor(Math.random() * 128) + 128}`;
let functions = {
    darkenBox(e) {
        console.log("dark/light");
        reset(this);
        this.addEventListener("click", clicks[Math.floor(Math.random() * 3)]);
        this.style.backgroundColor = "black";
        this.parentNode.style.backgroundColor = "black";
        this.style.transition = "all 1s";
        this.parentNode.style.transition = "all 1s";
        this.parentNode.firstChild.nextSibling.style.opacity = 0;
        this.parentNode.firstChild.nextSibling.transition = "all 1s";
        this.parentNode.addEventListener("mouseover", darkTheBox);
        this.parentNode.addEventListener("mouseout", lightTheBox);
    },
    stickButton(e) {
        console.log("stick");
		reset(this);
        document.getElementById("Nixon").style.visibility = "hidden";
        let newButton = document.createElement("button");
        newButton.innerHTML = `Vote Nixon!`
        newButton.id = "newNixon";
        newButton.style.position = "fixed";
        newButton.style.top = e.clientY + "px";
        newButton.style.left = e.clientX + "px";
        newButton.style.transition = "all 1s";
		newButton.addEventListener("click", nixon.click);
		stickyButton = true;
        main.appendChild(newButton);
        main.addEventListener("mousemove", keepSticking);
        this.addEventListener("click", clicks[Math.floor(Math.random() * 3)]);
    },
    swapSquares(e) {
        console.log("swap");
		reset(this);
        switch(mcGovern.position){
            case "left":
                document.getElementById("main").style.flexDirection = "row";
                mcGovern.position = "right";
                break;
            case "right":
                document.getElementById("main").style.flexDirection = "row-reverse";
                mcGovern.position = "left";
                break;
        }
        this.addEventListener("click", clicks[Math.floor(Math.random() * 3)]);
    }
}
function darkTheBox(e) {
    console.log('darken');
    this.style.backgroundColor = "black";
    this.style.transition = "all 1s";
    this.firstChild.nextSibling.style.opacity = 0;
    this.firstChild.nextSibling.transition = "all 1s";
    this.lastChild.style.backgroundColor = "black";
    this.lastChild.style.transition = "all 1s";
}
function lightTheBox(e) {
    console.log('lighten');
    this.style.backgroundColor = backgroundColor;
    this.style.transition = "all 1s";
    this.firstChild.nextSibling.style.opacity = 1;
    this.firstChild.nextSibling.transition = "all 1s";
    this.lastChild.style.backgroundColor = "white";
    this.lastChild.style.transition = "all 1s"; 
}
function reset(button) {
    console.log('reset');
    document.getElementById("McGovernBox").style.backgroundColor = backgroundColor;
    document.getElementById("McGovernBox").style.transition = "all 1s";
    document.getElementById("McGovernBox").firstChild.nextSibling.style.opacity = 1;
    document.getElementById("McGovernBox").firstChild.nextSibling.transition = "all 1s";
    document.getElementById("McGovernBox").lastChild.style.backgroundColor = "white";
    document.getElementById("McGovernBox").lastChild.style.transition = "all 1s";  
    main.removeEventListener("mousemove", keepSticking);
    button.parentNode.removeEventListener("mouseover", darkTheBox);
    button.parentNode.removeEventListener("mouseout", lightTheBox);
    button.removeEventListener("click", functions.darkenBox);
    button.removeEventListener("click", functions.swapSquares);
    button.removeEventListener("click", functions.stickButton);
	if(stickyButton) {
		main.removeChild(document.getElementById("newNixon"));
		stickyButton = false;
	}
    document.getElementById("Nixon").style.visibility = "visible";
}
function keepSticking(e) {
    console.log("sticky sticky");
    document.getElementById("newNixon").style.top = e.clientY + "px";
    document.getElementById("newNixon").style.left = e.clientX + "px";
}
function displayWords(e) {
    console.log("context menu show");
    e.preventDefault();
    document.getElementById("Richard").setAttribute("src", "./contextmenuimage.jpg");
    document.getElementById("George").setAttribute("src", "./contextmenuimage.jpg");
    main.addEventListener("mousemove", hideWords);
}
function hideWords() {
    console.log("context menu hide");
    document.getElementById("Richard").setAttribute("src", "./nixon.jpg");
    document.getElementById("George").setAttribute("src", "./mcgovern.jpg");
    main.removeEventListener("mousemove", hideWords);   
}
function setColor() {
    document.body.style.backgroundColor = backgroundColor;
}
let clicks = [functions.darkenBox, functions.stickButton, functions.swapSquares];
mcGovern.click = clicks[Math.floor(Math.random() * 3)];
let welcomeMessage = document.createElement("h1")
welcomeMessage.innerHTML = "Welcome to the Voting Machine!";
welcomeMessage.style.textAlign = "center";
document.body.appendChild(welcomeMessage);
let mainDiv = document.createElement("div");
mainDiv.id = "main";
document.body.appendChild(mainDiv);
for(let item of runners) {
    let square = document.createElement("div");
    let name = document.createElement("h1");
    let picture = document.createElement("img");
    let party = document.createElement("h3");
    let click = document.createElement("button");
    square.id = item.name.split(" ")[1] + "Box";
    square.style.cursor = item.cursor;
    square.style.maxWidth = "50%";
    square.style.textAlign = "center";
    name.innerHTML = item.name;
    picture.setAttribute("src", item.picture);
    picture.style.maxWidth = "50%";
    picture.style.margin = "5px";
    picture.id = item.name.split(" ")[0];
    party.innerHTML = item.party;
    click.addEventListener("click", item.click);
    click.innerHTML = `Vote ${item.name.split(" ")[1]}!`;
    click.id = item.name.split(" ")[1];
	click.style.margin = "5px";
    window.addEventListener("load", setColor);
    window.addEventListener("contextmenu", displayWords);
    main.appendChild(square);
    square.appendChild(name);
    square.appendChild(picture);
    square.appendChild(party);
    square.appendChild(click);
}
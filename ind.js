let deckId=""
document.getElementById("butt").addEventListener("click",deck)
function deck(){
    console.log("clk");
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res=>res.json())
    .then(data=>{
        deckId=data.deck_id;
        console.log(deckId)
        document.getElementById("cRem").textContent=`Cards Remaing: ${data.remaining}`
        document.getElementById("newc").disabled=false;
    })
}
document.getElementById("newc").addEventListener("click",newCard);
function newCard(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data.cards);
        document.getElementById("c1").innerHTML=`<img src=${data.cards[0].images.svg} class="card">`
        document.getElementById("c2").innerHTML=`<img src=${data.cards[1].images.svg} class="card">`

        let out=winner(data.cards[0],data.cards[1]);
        document.getElementById("out").textContent=out;
        document.getElementById("cRem").textContent=`Cards Remaing: ${data.remaining}`
        if(data.remaining==0){
            document.getElementById("newc").disabled=true;
            if(y>c)document.getElementById("out").textContent="You win the game!!";
            else if(c>y)document.getElementById("out").textContent="Computer won the game!!"
            else document.getElementById("out").textContent=" It's a tie"
        }
    })

}
let c=0;
let y=0;
const arr=["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]
function winner(card1,card2){
    let v1=arr.indexOf(card1.value);
    let v2=arr.indexOf(card2.value);
     
    if(v1>v2){
        c+=1
        document.getElementById("scr").children[0].textContent=`Computer score: ${c}`;
        return "Computer wins"
    }
    else if(v1<v2){
        y+=1
        document.getElementById("scr").children[1].textContent=`Your score: ${y}`;
        return "You win"
    }
    else return "War!"

}
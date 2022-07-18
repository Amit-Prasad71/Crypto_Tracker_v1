const dropDownMenu = document.querySelector(".dropdown ul");
const dropDownItem = document.querySelector(".dropdown ul li");
const dropDownBtnText = document.querySelector(".dropdown button span");
const cardCurr = document.querySelectorAll(".card-text .currency");
const dropDownBtn = document.querySelector(".dropdown button");
const dropDown = document.querySelector(".dropdown");
const cryptoCurr = ["BTC","ETH","USDT","BNB"];
let dropDownVisible = false;


async function dropDownSelect(currency){
    dropDownBtnText.innerHTML = currency;
    cardCurr.forEach((cardText) => {
        cardText.innerHTML = currency;
    });
    dropDownMenu.classList.add("collapse");
    dropDownVisible = false;
    await apiReq(currency);
}
async function apiReq(inputCurrency){

    let url  = `http://rest.coinapi.io/v1/exchangerate/${inputCurrency}/`;
    const params = {
        filter_asset_id:"BTC;ETH;USDT;BNB"
    };
    url += '?' + (new URLSearchParams(params)).toString();
    let options = {
        method : "GET",
        headers: {
            'Content-Type': 'application/json',
            'X-CoinAPI-Key': '5F95F33D-2F3F-426B-8067-A159CA2E0C29'
        }
    }

    await fetch(url,options).then(response => response.json()).then((response) => {
        var unitRates = response.rates;
        var rates = [];
        for(var i=0;i<4;i++){
            var price = 1/(unitRates[i].rate);
            if(unitRates[i].asset_id_quote === "BTC"){
                rates[0] = price.toFixed(3);
            }
            else if(unitRates[i].asset_id_quote === "ETH"){
                rates[1] = price.toFixed(3);
            }
            else if(unitRates[i].asset_id_quote === "USDT"){
                rates[2] = price.toFixed(3);
            }
            else if(unitRates[i].asset_id_quote === "BNB"){
                rates[3] = price.toFixed(3);
            }
        }
        for(var i=0;i<cryptoCurr.length;i++){
            let ithValue = document.querySelector(".value" + i.toString());
            ithValue.innerHTML = rates[i];
        }
    });

}

//dropdown
window.onclick = function(event){

    if(event.target.matches(".dropdown button") || event.target.matches(".dropdown button span")  || event.target.matches(".dropdown button i")){
        if(dropDownVisible){
            dropDownMenu.classList.add("collapse");
            dropDownVisible = false;
        }
        else{
            dropDownMenu.classList.remove("collapse");
            dropDownVisible = true;
        }
    }
    else{
        dropDownMenu.classList.add("collapse");
        dropDownVisible = false;
    }
};

dropDownSelect('USD');
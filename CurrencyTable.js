var Curency;
var KeyArray=new Array("CAD","HKD","ISK","PHP","DKK","HUF","CZK","GBP","RON","SEK","IDR","INR","BRL","RUB","HRK","JPY","THB","CHF","EUR","MYR","BGN","TRY","CNY","NOK","NZD","ZAR","USD","MXN","SGD","AUD","ILS","KRW","PLN");
var CurencyName ={"CAD":"Kanadyjski dolar","HKD":"Dolar hongkoński","ISK":"Korona islandzka","PHP":"Peso filipińskie","DKK":"Korona duńska","HUF":"Forint węgierski","CZK":"Korona czeska","GBP":"Brytyjski funt szterling",
"RON":"Lej rumuński","SEK":"Korona szwedzka","IDR":"Rupia indonezyjska","INR":"Rupia indyjska","BRL":"Real brazylijski","RUB":"Rubel rosyjski","HRK":"Kuna chorwacka","JPY":"Jen japoński","THB":"Baht tajski",
"CHF":"Frank szwajcarski","EUR":"Euro","MYR":"Ringgit malezyjski","BGN":"Lew bułgarski","TRY":"Lira turecka","CNY":"Juan","NOK":"Korona norweska","NZD":"Dolar nowozelandzki","ZAR":"Rand południowoafrykański",
"USD":"Dolar amerykański","MXN":"Peso meksykańskie","SGD":"Dolar singapurski","AUD":"Dolar australijski","ILS":"Nowy szekel izraelski","KRW":"Won południowokoreański","PLN":"Złoty"};
var SelectCurency=document.getElementById("base");
AddOption();
GetData("PLN");
var table = document.getElementById("CurrencyTable");
var Delete=false;
SelectCurency.addEventListener("change", function(){
  Delete=true;
  GetData(SelectCurency.value);
});
//funkcja pobierająca dane z api 
function GetData(base){
fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
.then(response => response.json())
.then(data => {
 Curency=data.rates;
date=data.date;
GetTable();
document.getElementById("Date").innerHTML="Ostatnia aktualizacja: "+date;
})
.catch(error => console.error(error))
}

//wypełnianie tabeli 
function GetTable(){ 

  for(var i in KeyArray){
    
    if(Delete==true)
    {
      table = document.getElementById("CurrencyTable");
      table.deleteRow(Number(i)+1);
    }
    var index=KeyArray[i].toString();
    AddToTable(CurencyName[index],index,Curency[index]);
  }
  
}
//dodanie dostępnych opcji
function AddOption(){
  for(var i = KeyArray.length - 1; i >= 0; i--){
    var Select = document.getElementById("base");
    var Option = document.createElement("option");
      Option.text = KeyArray[i];
      Select.add(Option);
  }
 
}

//dodanie pojedyńczego wiersza 
function AddToTable(name,code, value) {
  table = document.getElementById("CurrencyTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML= name;
    cell2.innerHTML = code;
    cell3.innerHTML = value;
  
}

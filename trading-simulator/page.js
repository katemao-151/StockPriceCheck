// alpha advatage api key 02NGXG0ZQ5XGMPAN
//starting with 100,000 dollars

function addStock(){
    //input bar
}
function totalAsset(){

}
async function getTimeSeriesDataOneMinute(company_name){
    //call API
    //call plotstockData
    let URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+company_name+'interval=1min&apikey=02NGXG0ZQ5XGMPAN';
    const result = await axios({
        method: 'get',
        url: URL,
    }).then((response) => {
        //console.log("response: ", response);
        //console.log('response data: ', response.data);
        return response;
    });
    return result;
}
async function getDaily(company_name){
    //get info for the past month
    let URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+company_name+'&outputsize=TEN&apikey=02NGXG0ZQ5XGMPAN';
    const result = await axios({
        method: 'get',
        url: URL,
    }).then((response) => {
        //console.log("response: ", response);
        //console.log('response data: ', response.data);
        return response;
    });
    return result;
}
const getWeeklyData = function (event) {
    let idClicked = event.target.id;
    console.log(idClicked);
    let company_name = idClicked.substring(idClicked.indexOf('y') + 1);
    const weeklyData = getDaily(company_name).then(data=>{
        let all_time_series = data.data['Time Series (Daily)'];
        const entries = Object.entries(all_time_series);
        //0 is seven open
        //1 is seven close
        let close_weekly = new Array()
        for(let i = 0; i<7; i++){
            close_weekly.push(entries[i]['1']['4. close']);
        }
    
        let close_three_month = new Array()
        for(let i = 0; i<90; i++){
            close_three_month.push(entries[i]['1']['4. close']);
        }
    
        var trace1 = {
            name: 'one week growth',
            y: close_weekly,
            type: 'line',
            line: {
              color: '#FF4500'
            }
          };
        
        var trace2 = {
            name: 'three month growth',
            y: close_three_month,
            type: 'line',
            line: {
              color: '#FF4500'
            }
          };
        layout = {
            showlegend: false
        }
        //console.log(close);
        var plot_data_weekly = [trace1];
        var plot_data_threeMonth = [trace2]
        Plotly.newPlot('weekly-chart',plot_data_weekly,layout,{
            responsive: true,
        });
        Plotly.newPlot('three-month-chart',plot_data_threeMonth,layout,{
            responsive: true,
        });
    
    
        //console.log(entries[0]['1']['1. open']) // ways to index
    });
   


}
const getFundamentals = function(event){
    let idClicked = event.target.id;
    console.log(idClicked);
    let company_name = idClicked.substring(idClicked.indexOf('s') + 1);
    const Fundamentals = companyFundamentals(company_name).then(fundamentaldata=>{
        console.log(fundamentaldata.data);
        let all_fund_info = fundamentaldata.data;
        /*
        <div class = "row" id = 'row-high-low-volumn'>
            <div class = "column" id = 'high'>
                <h5>52 Weeks High</h5>
            </div>
            <div class = "column" id = 'low'>
                <h5>52 Weeks Low</h5>
            </div>

            <div id = 'volumn'></div>
        </div>

        */
        //let company_fundamentals = `<div id='company-fundamentals'></div>`
        let high_div = $(`<div class = "row" id = 'row-high-low-volumn}'><div>`);
        let high_column_high = $(`<div class = "column" id = 'high'>52 Weeks High<div>`);
        let high_column_low = $(`<div class = "column" id = 'low'>52 Weeks Low<div>`);
        let company_name = $(`<div class = "company" id = 'company_name'>Symbol<div>`);
        
        let high = $(`<p class = 'high' id = company-high${all_fund_info['Symbol']}> ${all_fund_info['52WeekHigh']} </p>`);
        let low = $(`<p class = 'low' id = company-low${all_fund_info['Symbol']}> ${all_fund_info['52WeekLow']} </p>`);
        let name = $(`<p class = 'name' id = company-name${all_fund_info['Symbol']}> ${all_fund_info['Symbol']} </p>`);
        console.log('high',high);
        console.log('low',low)
        high_column_high.append(high);
        high_column_low.append(low);
        company_name.append(name);
        high_div.append(company_name,high_column_high,high_column_low);
        remove = '#'+idClicked;
        $(remove).after(high_div);
        $(remove).remove()
        //company_fundamentals.append(high_div);
        //console.log(high_div);
        //$('#row-high-low-volumn').replaceWith(high_div);
        //$('#row-high-low-volumn').remove();
        //const entries = Object.entries(all_fund_info);
        //let all_fund_info = fundamentaldata.data;
    
    });

}


function plotstockData(){

}

/*
function createBuyForm(){
    
    /*<label for ="stock-symbol">Stock Symbol:</label><br>
    <input type =text id = 'stock-symbol-id'></input><br>
    <label for ="quantity">Quantity:</label><br>
    <input type =text id = 'quantity'></input><br>
    <button id = 'buy-stock'>Buy Stock</button>
    */
   
   //return form



const getStockInfo = function(event){
    event.preventDefault();
    let symbol = $('#stock-symbol-input').val();
    console.log('in get stock');
    console.log(symbol);
    let quantity = $('#stock-quantity').val();
    let stock_div = $(`<div class = 'all-stock-bought' id = ${symbol}> </div>`);
    let stock_bought = $(`<p class = 'all-stock-bought-stock' id = ${symbol}${quantity}> ${symbol} </p>`);
    let quant = $(`<p class = 'all-stock-bought-quant' id = ${symbol}${quantity}> ${quantity} </p>`);
    let check_history = $(`<button class = 'check' id = check-history${symbol}>Details</button>`).on('click',getWeeklyData);
    let fundamentals = $(`<button class = 'check' id = fundamentals${symbol}>Fundamentals</button>`).on('click',getFundamentals);
    stock_div.append(stock_bought,quant,check_history,fundamentals);
    $('#bought-stock').append(stock_div);
}
function addStockInfo(){
    console.log('in add stock');
    let button_buy_stock = $(`<button class = submit id = buy-stock></button>`).text('Buy Stock').on('click', getStockInfo);
    $('#buy').append(button_buy_stock);
    //$('#buy-stock').on('click',getStockInfo);
}

async function companyFundamentals(company_name){
    let URL = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol='+company_name+'&apikey=02NGXG0ZQ5XGMPAN';
    const result = await axios({
        method: 'get',
        url: URL,
    }).then((response) => {
        //console.log("response: ", response);
        //console.log('response data: ', response.data);
        return response;
    });
    return result;
}


const timeRemaining = function (){
    let d = new Date();
    let cur_hr = d.getHours();
    let cur_min = d.getMinutes();
    console.log('cur_min',cur_min);
    console.log('cur_hr',cur_hr);
    if(cur_hr<8 || cur_hr>15){
        //market closed
        console.log("HERE");
        let close = $('<p class = close></p>').text('Market is Closed!');
        $('#time-remaining').append(close);
    }
    else if(cur_hr==8 && cur_min<29){
        //market closed
        let close = $('<p class = close></p>').text('Market is Closed!');
        $('#time-remaining').append(close);
    }
}
const addForm= function () {
    /*
    <div class = 'left' id = 'left-container'>
                <div class = 'stock' id = 'buy'>
                    <div class = 'bought' id = 'bought-stock'>

                    </div>
                    
                    
                </div>
            </div>
    */

    let left = $(`<div class='left' id = 'left-container'></div>`);
    let stock = $(`<div class='stock' id = 'buy'></div>`);
    let bought = $(`<div class='bought' id = 'bought-stock'></div>`);
    let form = $(`<form id = form></form>`);
    let stock_symbol = $(`<label class='stock-symbol'>Stock Symbol</div><br>`);
    let stock_symbol_name = $(`<input id='stock-symbol-input'></input><br>`);
    let quantity = $(`<label class='stock-quantity'>Quantity</Quantity><br>`);
    let quantity_num = $(`<input id='stock-quantity'></input><br>`);
    let buyStock = $(`<button id = 'buy-stock'></button>`).on('click',getStockInfo);
    form.append(stock_symbol,stock_symbol_name,quantity,quantity_num,buyStock);
    bought.append(form);
    stock.append(bought);
    left.append(stock);
    $('body').append(left);
}

addForm();

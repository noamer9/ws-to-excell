const api = require('binance');
const rp = require('request-promise');
const _ = require('lodash');
const fs = require('fs');
const csv = require('fast-csv');
const log = console.log;
let ticker = {};
let tickerArr = [];
const binanceWS = new api.BinanceWS(true); // Argument specifies whether the responses should be beautified, defaults to true
  
    binanceWS.onTicker("BTCUSDT", async tickerData  => {
        ticker = {};
        ticker.bestAsk = tickerData.bestAskPrice;
        ticker.bestAskQuantity = tickerData.bestAskQuantity;
        ticker.lastPrice = tickerData.currentClose;
        ticker.bidQuantity = tickerData.bestBidQuantity;
        ticker.bestBid = tickerData.bestBid;
        try {
             tickerArr.push(ticker) ;
             console.log("tickerArr :", tickerArr );
            myVar = setTimeout(download, 1000);
        } 
            catch (e) {
            log(e);
          }
    });
  
  
 
  const download = async () => {    
    log(`Total No. API Requests to process => ${tickerArr.length}`);
    log(`Initiating download...`);
    const fileName = "BTCUSDT_1m_data.csv";
    const ws = fs.createWriteStream(fileName);
    csv.write(tickerArr,{headers:true}).pipe(ws).on('downloding',() => log(` data has been downloaded to ${fileName}`));
  }




  
  
  

        
    
     

    

 

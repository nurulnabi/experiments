for(key in splitedDataArray){
    calculatePower(splitedDataArray[key]);
    var octopusMAC = getOctopusIDFromRaw(splitedDataArray[key]);
    var channelID = getChannelIDFromRaw(splitedDataArray[key]);
    console.log("outside")
    getChannelCTSize(octopusMAC, channelID, function (result) {
        console.log("inside")
        var timestamp = convertDateTimeToInt(transmission.date);
        var adcTicks = getAdcTicksFromRaw(splitedDataArray[key]);
        var power = convertAdcTicksToAmps(parseInt(adcTicks, 16), result);
        console.log("channelID: " + channelID + " ADC ticks HEX: " + adcTicks + " timestamp: " + timestamp + " power for " + result + "A CT Size: " + power);
    });
}

var promiseArr = [];
for(key in splitedDataArray){
    calculatePower(splitedDataArray[key]);
    var octopusMAC = getOctopusIDFromRaw(splitedDataArray[key]);
    var channelID = getChannelIDFromRaw(splitedDataArray[key]);
    console.log("outside")

    (function(promiseArr, octopusMAC, channelID){
       promiseArr.push(new Promise(function(resolve, reject){
           getChannelCTSize(octopusMAC, channelID, function (result) {
               if(everythingGoneWell)
                   resolve("your data");
               else
                   reject("rejection reason");
           });
       })); 
   })(promiseArr, octopusMAC, channelID);
    
}

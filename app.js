const request = require('request')
const cheerio = require('cheerio');


var name;
var count = 0;

var postData = {
    section: 'cars',
    adType: 'forsale',
    sort: 'publishDate desc',
    priceType: 'Euro',
    mileageType: 'Kilometres',
    max:30,
    start:0,
    fuelType:["Diesel"],
    dependant:[{"parentName":"make","parentValue":"Volkswagen","childName":"model"
        ,"childValues":[]},{"parentName":"make","parentValue":"Skoda","childName":"model","childValues"
        :["Octavia"]}],
    price_from: "0",
    price_to: "3000",
    year_from: "2007",
    source: "private",
    country: ["Ireland"]

}

var url = 'https://www.donedeal.ie/search/api/v4/find/'
var options = {
    method: 'post',
    body: postData,
    json: true,
    url: url
}


function getData (options, callback) {
    request(options, function (err, resp, body) {
        var totalCounts = body.pagingCounts.total;
        var data = body.ads;
        var nextStart = body.pagingCounts.nextStart;
        if(postData.start < totalCounts){
            postData.start = nextStart;
            console.log("Page " + count);
            //console.log(data);
            for(var each in data){
                if(data[each].spotlight == true){

                }
                else if(data[each].keyInfo[2] == null){

                }
                else{
                    console.log(data[each].header + " " + data[each].age + " \nPrice: " + data[each].price + " \nMilage: " + data[each].keyInfo[2] + "\nCounty: " + data[each].county + "\n");
                }

            }
            getData(options, callback);
            postData.start = postData.start + 29;
            count++;
        }
        else{
            callback();
        }
    });
}

getData(options, function () {
    console.log("Done");
})




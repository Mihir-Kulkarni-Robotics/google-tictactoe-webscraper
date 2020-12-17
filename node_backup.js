fs = require('fs');
const { equal } = require('assert');
var webdriver = require('selenium-webdriver');
const { Driver } = require('selenium-webdriver/chrome');

// Open Chrome Browser

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

// Open google.com
//driver.get('http://www.google.com');

fs.writeFile('movelist.txt', "" ,function(err){
    if (err) return console.log(err);
});

var new_game = false;
var moves = [];
var flag = true;
driver.get("https://www.google.com/search?q=tictactoe&oq=tictactoe&aqs=chrome.0.69i59l2j0j0i10j0j0i10j69i60l2.2280j0j7&sourceid=chrome&ie=UTF-8")
    .then(async function () {
        while(new_game == false){
            if (flag == true){
                for(i = 1; i <= 3; i++){
                    for(j = 1; j <= 3; j++){
                        var child = driver.findElement(webdriver.By.xpath("/html/body/div[7]/div[2]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div[1]/div/div[1]/div/div/div/div[2]/table/tbody/tr["+ i +"]/td[" + j + "]"));
                        var element = child.findElement(webdriver.By.tagName("svg"));
                        var trigger1 = await element.getAttribute("style");
                        var trigger2 = await element.getAttribute("aria-label"); //originally "aria-label"
                        if((trigger1 == "display: none; visibility: visible;" || trigger1 == "visibility: visible; display: none;") && trigger2 == "X"){
                            var X = await child.getAttribute("data-row");
                            var Y = await child.getAttribute("data-col");
                            var move = X + "," + Y
                            if(moves.includes(move)){
                                break;
                            }
                            else{
                                moves.push(move);
                                console.log(move);
                                fs.writeFile('movelist.txt', move ,function(err){
                                    if (err) return console.log(err);
                                });
                            }
                            
                            //console.log(X + "," + Y);
                        }
                    }
                }
            }
            var restart  = driver.findElement(webdriver.By.xpath("/html/body/div[7]/div[2]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div[1]/div/div[1]/div/div/div/div[2]/div"));
            var check = await restart.getAttribute("class");
            if(check == "Vu40Fd Z3VHAd TTT-active"){
                if(flag == true){
                    console.log("new gaymee");
                    new_game = true;
                }
                    
                flag = false;
                moves.length = 0;
            }
            else{
                flag = true;
            }
            
        }
    })


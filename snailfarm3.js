/* WEB3 DETECTION */

//var modal2 = document.getElementById("modal2");

window.addEventListener("load", function() {
	if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        web3.version.getNetwork(function(error, result) {
            if (!error) {
                if (result == "3") {
					console.log("Ropsten Testnet successfully loaded!");
                } else {
                    console.log("You must be on the Testnet to play SnailFarm 3 Test!");
					//modal2.style.display = "block";
                }
            }
        });
    } else {
        console.log("Web3 library not found.");
		//modal2.style.display = "block";
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
    }
});
/*
// Get the <span> element that closes the modal
var span2 = document.getElementById("close2");

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    modal2.style.display = "none";
}

/* MODAL */
/*
// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var b_helpmodal = document.getElementById("helpmodal");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
b_helpmodal.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Close modal on game info
function closeModal() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal || event.target == modal2) {
        modal.style.display = "none";
		modal2.style.display = "none";
    }
}

/* UTILITIES */

//Truncates ETH value to 3 decimals
function formatEthValue(ethstr){
    return parseFloat(parseFloat(ethstr).toFixed(3));
}

//Truncates ETH value to 6 decimals
function formatEthValue2(ethstr){
	return parseFloat(parseFloat(ethstr).toFixed(6));
}
/*
//Referrals
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function copyRef() {
  var copyText = document.getElementById("copytextthing");
  copyText.style.display="block"
  copyText.select();
  document.execCommand("Copy");
  copyText.style.display="none"
  //displayModalMessage("copied link to clipboard")
  //alert("Copied the text: " + copyText.value);
}

var playerreflinkdoc = document.getElementById('playerreflink'); 
var a_refLink = window.location.protocol + '//' + window.location.host + window.location.pathname + "?ref=" + web3.eth.accounts[0];
var copyText = "no" //document.getElementById("copytextthing"); 
copyText.value = playerreflinkdoc.textContent;

/* VARIABLES */

var a_godTimer = "";
var godtimer_in_seconds = 0;
var god_numhours = 0;
var god_numminutes = 0;
var god_numseconds = 0;

var god_roundover = false;

var godtimerdoc;
var playereggdoc;

var a_pharaoh = "";
var a_tokenPrice = 0;
var a_tokenSellPrice = 0;
var a_maxSnail = 0;
var a_godPot = 0;
var a_frogPot = 0;
var a_snailPot = 0;
var a_playerSnail = 0; //y
var a_playerEgg = 0;
var a_playerProd = 0;
var a_playerHatchCost = 0;
var a_feedReward = 0;
var a_pharaohReq = 0;
var a_pharaohReq2 = 0;
var a_removeSnailReq = 0;
var f_buy = 0;
var f_sell = 0;
var f_sacrifice = 40;
var m_account = "waiting for web3";

/* GLOBAL LOOP */

//Started once, to trigger the main loop and the egg loop
function main(){
    console.log('Main loop started.');
    controlLoop();
	controlLoopFast();
}

//Main loop
function controlLoop(){
    refreshData();
    setTimeout(controlLoop,4000);
}

//Secondary loop for actions that need faster refresh
function controlLoopFast(){
	refreshDataFast();
	setTimeout(controlLoopFast,200);
}

/* STATE UPDATES */

//Refreshes game data
function refreshData(){
	updateEthAccount();

	updatePlayerSnail();
	/*
	
	updateGodRound();
	updateGodPot();
	updateRoundPot();
	updatePharaoh();
	updateGodTimer();
	updatePharaohReq();
	updateMaxSnail();
	updateContractBalance();
	updateFrogPot();
	updateSnailPot();

	updateTokenPrice();
	updatePlayerSnailValue();
	updateTokenSellPrice();
	updateMaxSnailSell();
	updatePlayerEgg();
	updatePlayerProd();
	updateHatchPrice();
	updateFullHatchCost();
	updateFeedReward();
	updateFullFeedReward();
	updateUnclaimedDiv();
	updatePlayerEarning();
	updatePlayerRef();
	updateButton();
	*/
}

//Refreshes some game data faster
function refreshDataFast(){
	/*
	fastupdateGodTimer();
	//fastupdatePlayerEgg();
	updateFieldBuy2();
	updateFieldSacrifice2();
	updateFieldSell2();
	updateSellEstimate();
	updateBuyEstimate();*/
}

//Current ETH address in use
function updateEthAccount(){
	m_account = web3.eth.accounts[0];
}

//Current player snail count
function updatePlayerSnail(){
	var playersnaildoc = document.getElementById('playersnail');
	GetMySnail(function(req) {
		a_playerSnail = req;
		playersnaildoc.textContent = a_playerSnail;
	});
}

/*
//Current ETH balance in contract
function updateContractBalance(){
	var contractbalancedoc = document.getElementById('contractbalance');
	GetContractBalance(function(req) {
		contractbalancedoc.textContent = formatEthValue2(web3.fromWei(req,'ether'));
	});
}
*/


/*
//Current round
function updateGodRound(){
	var godrounddoc = document.getElementById('godround');
	godRound(function(req) {
		godrounddoc.textContent = req;
	});
}

//Full godpot
function updateGodPot(){
	var godpotdoc = document.getElementById('godpot');
	godPot(function(req) {
		a_godPot = formatEthValue(web3.fromWei(req,'ether'));
		godpotdoc.textContent = a_godPot;
	});
}

//Current round pot (50% of godpot)
function updateRoundPot(){
	var roundpotdoc = document.getElementById('roundpot');
	roundpotdoc.textContent = a_godPot / 2;
}
	
//Current pharaoh
function updatePharaoh(){
	var pharaohdoc = document.getElementById('pharaoh');
	pharaoh(function(req) {
		a_pharaoh = req.substring(26, 66);
		var b_pharaoh = "0x" + a_pharaoh;
		if(god_roundover === false) {
			if(b_pharaoh === m_account) {
				pharaohdoc.innerHTML = "YOU<br>Will Ascend to Godhood in";
			} else {
			pharaohdoc.innerHTML = b_pharaoh + "<br>Will Ascend to Godhood in";
			}
		}
		else {
			if(b_pharaoh === m_account) {
				pharaohdoc.innerHTML = "YOU ARE THE SNAILGOD!<br>Claim your winnings by starting a new round.";
			} else {
			pharaohdoc.innerHTML = b_pharaoh + " is the SnailGod!<br>To the victor the spoils. Start a new round to be next in line!";
			}
		}
	});
}

//Current round timer
function updateGodTimer(){
	var blocktime = Math.round((new Date()).getTime() / 1000); //current blocktime should be Unix timestamp
	godtimerdoc = document.getElementById('godtimer');
	godTimer(function(req) {
		godtimer_in_seconds = req - blocktime; //godTimer is the planned blocktime for the end
		
		//Check if round is over
		if(godtimer_in_seconds <= 0){
			godtimerdoc.textContent = "[Round is over. Press the magic button below!]";
			god_roundover = true;
		} else {
			//Convert result to hour minute second format
			god_numhours = Math.floor(godtimer_in_seconds / 3600);
			god_numminutes = Math.floor((godtimer_in_seconds % 3600) / 60);
			god_numseconds = (godtimer_in_seconds % 3600) % 60;

			a_godTimer = god_numhours + "h " + god_numminutes + "m " + god_numseconds + "s ";
			godtimerdoc.textContent = a_godTimer;
			god_roundover = false;
		}
	});
}

//Show or hide relevant sacrifice/new round buttons
function updateButton(){
	if (god_roundover === false) {
		document.getElementById('showroundon').style.display = "block";
		document.getElementById('showroundoff').style.display = "none";
	} else {
		document.getElementById('showroundoff').style.display = "block";
		document.getElementById('showroundon').style.display = "none";
	}
}

//Fast local update for godtimer
function fastupdateGodTimer(){
	
	//Check if round is ongoing
	if(godtimer_in_seconds > 0){
		godtimer_in_seconds = godtimer_in_seconds - 0.2;
		//console.log(godtimer_in_seconds);
		god_numhours = Math.floor(godtimer_in_seconds / 3600);
		god_numminutes = Math.floor((godtimer_in_seconds % 3600) / 60);
		god_numseconds = parseFloat((godtimer_in_seconds % 3600) % 60).toFixed(0);
		
		a_godTimer = god_numhours + "h " + god_numminutes + "m " + god_numseconds + "s ";
		godtimerdoc.textContent = a_godTimer;
	}
}	
	
//Current pharaoh requirement
function updatePharaohReq(){
	var pharaohreqdoc = document.getElementById('pharaohreq');
	var pharaohreq2doc = document.getElementById('pharaohreq2');
	//Check current pharaohReq
	pharaohReq(function(req) {
		a_pharaohReq = req;
	});
	//Check number of snails to remove
	ComputePharaohReq(function(req) {
		a_removeSnailReq = req;
	});
	//Remove snails from pharaohReq
	a_pharaohReq2 = a_pharaohReq - a_removeSnailReq;
	if(a_pharaohReq2 < 40) {
		a_pharaohReq2 = 40; //minimum req
	}

	pharaohreqdoc.textContent = a_pharaohReq2;
	pharaohreq2doc.textContent = a_pharaohReq2;
}

//Current max supply of snails
function updateMaxSnail(){
	var maxsnaildoc = document.getElementById('maxsnail');
	maxSnail(function(req) {
		a_maxSnail = req;
		maxsnaildoc.textContent = a_maxSnail;
	});
}



//Current frog pot
function updateFrogPot(){
	var frogpotdoc = document.getElementById('frogpot');
	frogPot(function(req) {
		a_frogPot = formatEthValue(web3.fromWei(req,'ether'));
		frogpotdoc.textContent = a_frogPot;
	});
}

//Current snail pot
function updateSnailPot(){
	var snailpotdoc = document.getElementById('snailpot');
	snailPot(function(req) {
		a_snailPot = formatEthValue(web3.fromWei(req,'ether'));
		snailpotdoc.textContent = a_snailPot;
	});
}
	


//Current token price on buys
function updateTokenPrice(){
	var tokenpricedoc = document.getElementById('tokenprice');
	ComputeTokenPrice(function(req) {
		a_tokenPrice = formatEthValue2(web3.fromWei(req,'ether'));
		tokenpricedoc.textContent = a_tokenPrice;
	});
}

//Current token price on sells
function updateTokenSellPrice(){
	var tokensellpricedoc = document.getElementById('tokensellprice');
	a_tokenSellPrice = a_tokenPrice / 2;
	tokensellpricedoc.textContent = a_tokenSellPrice;
}

//Maximum snails that can be sold
function updateMaxSnailSell(){
	var maxsnailselldoc = document.getElementById('maxsnailsell');
	var i_snailPot = a_snailPot / 10; //the maximum obtainable in one sale is 10%
	maxsnailselldoc.textContent = parseFloat(i_snailPot / a_tokenSellPrice).toFixed(0); //divide that max by token price, round up to integer
}
	
//Current player snail ETH value
function updatePlayerSnailValue(){
	var playersnailvaluedoc = document.getElementById('playersnailvalue');
	playersnailvaluedoc.textContent = parseFloat(a_playerSnail * a_tokenSellPrice).toFixed(4);
}

//Current player eggs
function updatePlayerEgg(){
	playereggdoc = document.getElementById('playeregg');
	ComputeMyEggs(m_account, function(req) {
		a_playerEgg = formatEthValue(req);
		//a_playerEgg = parseFloat(a_playerEgg / 1080000).toFixed(0); //TIME_TO_HATCH_1SNAIL
		playereggdoc.textContent = a_playerEgg;
	});
}

//Fast local update for player eggs
/*function fastupdatePlayerEgg(){
	playereggdoc = document.getElementById('playeregg');
	var b_playerEgg = a_playerEgg + (a_playerProd / 18000); //60 minutes * 60 seconds * 5 refreshes per second = 18000
	a_playerEgg = parseFloat(b_playerEgg).toFixed(4);
	playereggdoc.textContent = a_playerEgg;
}*/
/*
//Current player prod
function updatePlayerProd(){
	var playerproddoc = document.getElementById('playerprod');
	a_playerProd = parseFloat(a_playerSnail * 0.08 / 24).toFixed(4); //8% per day, divided by 24 hours
	playerproddoc.textContent = a_playerProd;
}

//Current hatch price per egg
function updateHatchPrice(){
	var hatchpricedoc = document.getElementById('hatchprice');
	hatchpricedoc.textContent = a_tokenSellPrice;
}

//Current hatch cost for player
function updateFullHatchCost(){
	var fullhatchcostdoc = document.getElementById('fullhatchcost');
	var roundup = 0.000004;
	a_playerHatchCost = parseFloat(a_playerEgg * a_tokenSellPrice).toFixed(6);
	a_playerHatchCost = parseFloat(a_playerHatchCost + roundup).toFixed(6);
	fullhatchcostdoc.textContent = a_playerHatchCost;
}

//Current feed reward per egg
function updateFeedReward(){
	var feedrewarddoc = document.getElementById('feedreward');
	a_feedReward = parseFloat(a_frogPot / a_maxSnail).toFixed(8);
	feedrewarddoc.textContent = a_feedReward;
}

//Current feed reward for player
function updateFullFeedReward(){
	var fullfeedrewarddoc = document.getElementById('fullfeedreward');
	fullfeedrewarddoc.textContent = parseFloat(a_playerEgg * a_feedReward).toFixed(8);
}

//Current unclaimed dividends for player
function updateUnclaimedDiv(){
	var playerdivdoc = document.getElementById('playerdiv');
	ComputeMyDivs(function(req) {
		var b_playerdiv = formatEthValue(web3.fromWei(req,'ether'));
		playerdivdoc.textContent = b_playerdiv;
	});
}
	
//Current balance for player
function updatePlayerEarning(){
	var playerearningdoc = document.getElementById('playerearning');
	GetMyEarnings(function(req) {
		playerearningdoc.textContent = formatEthValue(web3.fromWei(req,'ether'));
	});
}	

//Status of referral link for player
function updatePlayerRef(){
	if(a_playerSnail >= 300){
		playerreflinkdoc.innerHTML = "<br>" + a_refLink; //+ "<br>Any buy through this link gives you 6% of the ETH spent.";
	} else {
		playerreflinkdoc.textContent = "NOT active. You must have at least 300 snails in your hatchery.";
	}
}

//Lifetime divs - UNUSED
function updateMaxDiv(){
	var maxdivdoc = document.getElementById('maxdiv');
	divsPerSnail(function(req) {
		maxdivdoc.textContent = formatEthValue2(web3.fromWei(req,'ether'));
	});
}

/* LOCAL FIELD INPUT */
/*
//Player input on buy
function updateFieldBuy2(){
	//var fieldbuydoc = document.getElementById('fieldBuy');
	f_buy = document.getElementById('fieldBuy').value;
	if(f_buy > 4){ 
		f_buy = 4; //max 4 ETH per buy
	}
	var fieldbuy2doc = document.getElementById('fieldBuy2');
	fieldbuy2doc.textContent = f_buy;
}

//Buy estimate
function updateBuyEstimate(){
	var buyEstimatedoc = document.getElementById('buyestimate');
	buyEstimatedoc.textContent = parseFloat(f_buy / a_tokenPrice).toFixed(0);
}
	
//Player input on sell
function updateFieldSell2(){
	//var fieldbuydoc = document.getElementById('fieldBuy');
	f_sell = document.getElementById('fieldSell').value;
	var fieldsell2doc = document.getElementById('fieldSell2');
	fieldsell2doc.textContent = f_sell;
}

//Sell estimate
function updateSellEstimate(){
	var sellEstimatedoc = document.getElementById('sellEstimate');
	sellEstimatedoc.textContent = parseFloat(f_sell * a_tokenSellPrice).toFixed(6);
}

//Player input on sacrifice
function updateFieldSacrifice2(){
	f_sacrifice = document.getElementById('fieldSacrifice').value;
	if(f_sacrifice < a_pharaohReq2){
		f_sacrifice = a_pharaohReq2;
	}
	var fieldsacrifice2doc = document.getElementById('fieldSacrifice2');
	fieldsacrifice2doc.textContent = f_sacrifice;
}

/* WEB3 TRANSACTIONS */
/*
//Buy snail tokens
function webBuySnail(){
	var ref = getQueryVariable('ref');
    var weitospend = web3.toWei(f_buy,'ether');
    BuySnail(ref, weitospend,function(){
    });
}

//Sacrifice snail tokens
function webSacrificeSnail(){
	BecomePharaoh(f_sacrifice, function(){
	});
}

//Sell snail tokens
function webSellSnail(){
	SellSnail(f_sell, function(){
	});
}

//Hatch eggs
function webHatchEgg(){
	var weitospend = web3.toWei(a_playerHatchCost,'ether');
	HatchEgg(weitospend, function(){
	});
}

//Feed eggs
function webFeedFrog(){
	FeedEgg(function(){
	});
}

//Claim divs
function webClaimDiv(){
	ClaimDivs(function(){
	});
}

//Withdraw earnings
function webWithdrawEarning(){
	WithdrawEarnings(function(){
	});
}

//Start a new round
function webAscendGod(){
	AscendGod(function(){
	});
}

/* CONTRACT ABI */ 

abiDefinition=[{"constant": true,"inputs": [],"name": "ACORN_PRICE","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "LETTUCE_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SPIDER_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "gotCarrot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeHarvest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "round","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "ClaimAcornShare","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "JoinRound","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "BuyStartingSnail","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "GetMySnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "ClaimRedHarvest","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hatcherySnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasSlug","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "divPerAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_redAmount","type": "uint256"}],"name": "UseRedEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_MIN_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasStartingSnail","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "base","type": "uint256"}],"name": "ComputeSquare","outputs": [{"name": "squareRoot","type": "uint256"}],"payable": false,"stateMutability": "pure","type": "function"},{"constant": false,"inputs": [],"name": "FundTree","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "_ether","type": "uint256"}],"name": "ComputeAcornBuy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "redEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeAcornCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TADPOLE_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "roundPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "eggspent","type": "uint256"}],"name": "ComputeSell","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "lastHatch","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SNAILTHRONE","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "PayThrone","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ACORN_MULT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "ComputeMyEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "acorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FindLettuce","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "SellEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSpiderQueen","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "snailPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BuyEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "SQUIRREL_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ROUND_DOWNTIME","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HATCHING_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "snailmasterReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "STARTING_SNAIL_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "harvestStartTime","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSpiderOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SLUG_MIN_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "eggPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "HatchEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "FROGKING_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BeginRound","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "marketEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeTadpolePrince","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "SNAILMASTER_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "prodBoost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FindCarrot","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "harvestStartCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "WithdrawBalance","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "StartGame","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "STARTING_SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeMyShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSnailmaster","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_COUNT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "tadpoleReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "claimedShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "thronePot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "ethspent","type": "uint256"}],"name": "ComputeBuy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "maxAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "spiderReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TIME_TO_HATCH_1SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "CARROT_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSquirrelDuke","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasLettuce","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "nextRoundStart","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_DURATION","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSnailmaster","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "claimedEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_DUR_ROOT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lettuceReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FindSlug","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "squirrelReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyProd","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "gameActive","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSquirrelOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "gameOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentTadpoleOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "acorns","type": "uint256"}],"name": "FundedTree","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "share","type": "uint256"}],"name": "ClaimedShare","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "newmaster","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "BecameMaster","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WithdrewBalance","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "Hatched","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "seller","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "SoldEgg","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "buyer","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "playereggs","type": "uint256"}],"name": "BoughtEgg","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "StartedSnailing","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "newqueen","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "spiderreq","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "BecameQueen","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "newduke","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "squirrelreq","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "BecameDuke","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "newprince","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "tadpolereq","type": "uint256"}],"name": "BecamePrince","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "roundwinner","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "WonRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "round","type": "uint256"}],"name": "BeganRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "JoinedRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "ClaimedHarvest","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "UsedRed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "FoundSlug","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "lettucereq","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "FoundLettuce","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "FoundCarrot","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "PaidThrone","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "BoostedPot","type": "event"}]

var contractAddress="0x0888E6ec5b053Bc7FA3244ED58af25883f742C70" // ROPSTEN 1
var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);

function ACORN_PRICE(callback){   
    var outputData = myContract.ACORN_PRICE.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ACORN_PRICE ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyBalance(callback){
    var outputData = myContract.GetMyBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMyBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function LETTUCE_BASE_REQ(callback){
    var outputData = myContract.LETTUCE_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('LETTUCE_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function SPIDER_BASE_REQ(callback){
    var outputData = myContract.SPIDER_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('SPIDER_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function gotCarrot(callback){
    var outputData = myContract.gotCarrot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('gotCarrot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeHarvest(callback){
    var outputData = myContract.ComputeHarvest.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeHarvest ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function playerRound(callback){
    var outputData = myContract.playerRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('playerRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function round(callback){
    var outputData = myContract.round.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('round ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ClaimAcornShare(callback){
    var outputData = myContract.ClaimAcornShare.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ClaimAcornShare ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function JoinRound(callback){
    var outputData = myContract.JoinRound.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('JoinRound ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BuyStartingSnail(eth,callback){
    var outputData = myContract.BuyStartingSnail.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('BuyStartingSnail ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMySnail(callback){
    var outputData = myContract.GetMySnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMySnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ClaimRedHarvest(eth,callback){
    var outputData = myContract.ClaimRedHarvest.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('ClaimRedHarvest ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function hatcherySnail(callback){
    var outputData = myContract.hatcherySnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('hatcherySnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function hasSlug(callback){
    var outputData = myContract.hasSlug.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('hasSlug ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function divPerAcorn(callback){
    var outputData = myContract.divPerAcorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('divPerAcorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function UseRedEgg(_redAmount,callback){
    var outputData = myContract.UseRedEgg.getData(_redAmount);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('UseRedEgg ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_MIN_COST(callback){
    var outputData = myContract.HARVEST_MIN_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('HARVEST_MIN_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function hasStartingSnail(callback){
    var outputData = myContract.hasStartingSnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('hasStartingSnail ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeSquare(base,callback){
    var outputData = myContract.ComputeSquare.getData(base);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeSquare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function FundTree(eth,callback){
    var outputData = myContract.FundTree.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('FundTree ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeAcornBuy(_ether,callback){
    var outputData = myContract.ComputeAcornBuy.getData(_ether);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeAcornBuy ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function redEgg(callback){
    var outputData = myContract.redEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('redEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeAcornCost(callback){
    var outputData = myContract.ComputeAcornCost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeAcornCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function TADPOLE_BASE_REQ(callback){
    var outputData = myContract.TADPOLE_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('TADPOLE_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function roundPot(callback){
    var outputData = myContract.roundPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('roundPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeSell(eggspent,callback){
    var outputData = myContract.ComputeSell.getData(eggspent);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeSell ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function lastHatch(callback){
    var outputData = myContract.lastHatch.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('lastHatch ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function SNAILTHRONE(callback){
    var outputData = myContract.SNAILTHRONE.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('SNAILTHRONE ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function PayThrone(callback){
    var outputData = myContract.PayThrone.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('PayThrone ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function playerBalance(callback){
    var outputData = myContract.playerBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('playerBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ACORN_MULT(callback){
    var outputData = myContract.ACORN_MULT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ACORN_MULT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeMyEgg(adr,callback){
    var outputData = myContract.ComputeMyEgg.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeMyEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function acorn(callback){
    var outputData = myContract.acorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('acorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function FindLettuce(callback){
    var outputData = myContract.FindLettuce.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('FindLettuce ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function SellEgg(callback){
    var outputData = myContract.SellEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('SellEgg ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeSpiderQueen(callback){
    var outputData = myContract.BecomeSpiderQueen.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('BecomeSpiderQueen ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function snailPot(callback){
    var outputData = myContract.snailPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('snailPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BuyEgg(eth,callback){
    var outputData = myContract.BuyEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('BuyEgg ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function SQUIRREL_BASE_REQ(callback){
    var outputData = myContract.SQUIRREL_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('SQUIRREL_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyEgg(callback){
    var outputData = myContract.GetMyEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMyEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ROUND_DOWNTIME(callback){
    var outputData = myContract.ROUND_DOWNTIME.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ROUND_DOWNTIME ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function HATCHING_COST(callback){
    var outputData = myContract.HATCHING_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('HATCHING_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function snailmasterReq(callback){
    var outputData = myContract.snailmasterReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('snailmasterReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function STARTING_SNAIL_COST(callback){
    var outputData = myContract.STARTING_SNAIL_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('STARTING_SNAIL_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function harvestStartTime(callback){
    var outputData = myContract.harvestStartTime.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('harvestStartTime ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function currentSpiderOwner(callback){
    var outputData = myContract.currentSpiderOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('currentSpiderOwner ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function SLUG_MIN_REQ(callback){
    var outputData = myContract.SLUG_MIN_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('SLUG_MIN_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function eggPot(callback){
    var outputData = myContract.eggPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('eggPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function HatchEgg(eth,callback){
    var outputData = myContract.HatchEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('HatchEgg ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function FROGKING_REQ(callback){
    
    
    var outputData = myContract.FROGKING_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('FROGKING_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BeginRound(callback){
    
    
    var outputData = myContract.BeginRound.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('BeginRound ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function marketEgg(callback){
    
    
    var outputData = myContract.marketEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('marketEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeTadpolePrince(eth,callback){
    
    
    var outputData = myContract.BecomeTadpolePrince.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('BecomeTadpolePrince ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function SNAILMASTER_REQ(callback){
    
    
    var outputData = myContract.SNAILMASTER_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('SNAILMASTER_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function prodBoost(callback){
    
    
    var outputData = myContract.prodBoost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('prodBoost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function FindCarrot(eth,callback){
    
    
    var outputData = myContract.FindCarrot.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('FindCarrot ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function harvestStartCost(callback){
    
    
    var outputData = myContract.harvestStartCost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('harvestStartCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function WithdrawBalance(callback){
    
    
    var outputData = myContract.WithdrawBalance.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('WithdrawBalance ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function StartGame(callback){
    
    
    var outputData = myContract.StartGame.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('StartGame ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function STARTING_SNAIL(callback){
    
    
    var outputData = myContract.STARTING_SNAIL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('STARTING_SNAIL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeMyShare(callback){
    
    
    var outputData = myContract.ComputeMyShare.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeMyShare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function currentSnailmaster(callback){
    
    
    var outputData = myContract.currentSnailmaster.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('currentSnailmaster ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_COUNT(callback){
    
    
    var outputData = myContract.HARVEST_COUNT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('HARVEST_COUNT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function tadpoleReq(callback){
    
    
    var outputData = myContract.tadpoleReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('tadpoleReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function claimedShare(callback){
    
    
    var outputData = myContract.claimedShare.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('claimedShare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function thronePot(callback){
    
    
    var outputData = myContract.thronePot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('thronePot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeBuy(ethspent,callback){
    
    
    var outputData = myContract.ComputeBuy.getData(ethspent);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeBuy ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function maxAcorn(callback){
    
    
    var outputData = myContract.maxAcorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('maxAcorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function spiderReq(callback){
    
    
    var outputData = myContract.spiderReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('spiderReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function TIME_TO_HATCH_1SNAIL(callback){
    
    
    var outputData = myContract.TIME_TO_HATCH_1SNAIL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('TIME_TO_HATCH_1SNAIL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function CARROT_COST(callback){
    
    
    var outputData = myContract.CARROT_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('CARROT_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeSquirrelDuke(callback){
    
    
    var outputData = myContract.BecomeSquirrelDuke.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('BecomeSquirrelDuke ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function hasLettuce(callback){
    
    
    var outputData = myContract.hasLettuce.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('hasLettuce ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function nextRoundStart(callback){
    
    
    var outputData = myContract.nextRoundStart.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('nextRoundStart ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_DURATION(callback){
    
    
    var outputData = myContract.HARVEST_DURATION.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('HARVEST_DURATION ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeSnailmaster(callback){
    
    
    var outputData = myContract.BecomeSnailmaster.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('BecomeSnailmaster ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function claimedEgg(callback){
    
    
    var outputData = myContract.claimedEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('claimedEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_DUR_ROOT(callback){
    
    
    var outputData = myContract.HARVEST_DUR_ROOT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('HARVEST_DUR_ROOT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function lettuceReq(callback){
    
    
    var outputData = myContract.lettuceReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('lettuceReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function FindSlug(callback){
    
    
    var outputData = myContract.FindSlug.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('FindSlug ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function squirrelReq(callback){
    
    
    var outputData = myContract.squirrelReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('squirrelReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyProd(callback){
    
    
    var outputData = myContract.GetMyProd.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMyProd ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function gameActive(callback){
    
    
    var outputData = myContract.gameActive.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('gameActive ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function currentSquirrelOwner(callback){
    
    
    var outputData = myContract.currentSquirrelOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('currentSquirrelOwner ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function gameOwner(callback){
    
    
    var outputData = myContract.gameOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('gameOwner ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function currentTadpoleOwner(callback){
    
    
    var outputData = myContract.currentTadpoleOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('currentTadpoleOwner ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}



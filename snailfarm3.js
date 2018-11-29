//var contractAddress="0x0888E6ec5b053Bc7FA3244ED58af25883f742C70" // ROPSTEN 1
var contractAddress="0x0b4f4F98457e6A9431EdDD8f8c4fD731Ef2fA5f6" // ROPSTEN 2

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

var c_snailmaster = "";
var c_spiderowner = "";
var c_squirrelowner = "";
var c_tadpoleowner = "";

var a_marketEgg = 0; 
var a_tokenPrice = 0;
var a_tokenSellPrice = 0;
var a_maxAcorn = 0;
var a_acornCost = 0; 

var a_roundPot = 0; 
var a_eggPot = 0; 
var a_snailPot = 0; 
var a_thronePot = 0; 

var a_harvestCost = 0;
var a_tadpoleReq = 0; 

var a_playerSnail = 0; 
var a_playerEgg = 0; 
var a_playerBoost = 0; 
var a_playerProd = 0;
var a_playerRed = 0; 

var f_buy = 0;
var f_prince = 0;
var f_tree = 0;
var f_redhatch = 0;

var m_account = "waiting for web3";

/* GLOBAL LOOP */

//Initiates loops
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
	updateContractBalance();
	updateRound();
	
	updateEggPot();
	updateRoundPot();
	updateSnailPot();
	updateThronePot();
	
	updateMarketEgg();
	updateMaxEggBuy();
	updateMaxAcorn();
	
	updateHarvestCost();
	
	updatePlayerSnail();
	updatePlayerEgg();
	updatePlayerRed();
	updatePlayerProd();
	updatePlayerBoost();
	
	updatePlayerBalance();
	updatePlayerAcorn();
	updatePlayerShare();

	checkSnailmaster();
	checkSpiderOwner();
	checkSquirrelOwner();
	checkTadpoleOwner();
	checkOwnsLettuce();
	checkOwnsCarrot();
	checkOwnsSlug();
	
	updateSnailmasterReq();
	updateSpiderReq();
	updateSquirrelReq();
	updateTadpoleReq();
	updateLettuceReq();
	
	updateHatchEstimate();
	
	
	
	/*
	
	updateGodTimer();
	updatePharaohReq();
	updateMaxSnail();


	updateTokenPrice();
	updatePlayerSnailValue();
	updateTokenSellPrice();
	updateMaxSnailSell();


	updateHatchPrice();
	updateFullHatchCost();
	updateFeedReward();
	updateFullFeedReward();
	updateUnclaimedDiv();
	updateButton();
	*/
}

//Refreshes some game data faster
function refreshDataFast(){
	updateFieldBuy2();
	updateBuyEstimate();
	updateFieldPrince2();
	updateSellEstimate();
	updateFieldTree2();
	updateTreeEstimate();
	updateRedHatch2();
	updateRedEstimate();
	/*
	fastupdateGodTimer();
	//fastupdatePlayerEgg();

	updateFieldSacrifice2();
	updateFieldSell2();
	
	*/
}

//Check Snailmaster
function checkSnailmaster(){
	var snailmasterdoc = document.getElementById('snailmaster');
	currentSnailmaster(function(req) {
		c_snailmaster = "0x" + req.substring(26, 66);
		snailmasterdoc.textContent = c_snailmaster;
	});
}

//Current Snailmaster req
function updateSnailmasterReq(){
	var snailmasterreqdoc = document.getElementById('snailmasterreq');
	snailmasterReq(function(req) {
		snailmasterreqdoc.textContent = req;
	});
}
	
//Check SpiderQueen owner
function checkSpiderOwner(){
	var spiderownerdoc = document.getElementById('spiderowner');
	currentSpiderOwner(function(req) {
		c_spiderowner = "0x" + req.substring(26, 66);
		spiderownerdoc.textContent = c_spiderowner;
	});
}

//Current SpiderQueen req
function updateSpiderReq(){
	var spiderreqdoc = document.getElementById('spiderreq');
	spiderReq(function(req) {
		spiderreqdoc.textContent = req;
	});
}

//Check SquirrelDuke owner
function checkSquirrelOwner(){
	var squirrelownerdoc = document.getElementById('squirrelowner');
	currentSquirrelOwner(function(req) {
		c_squirrelowner = "0x" + req.substring(26, 66);
		squirrelownerdoc.textContent = c_squirrelowner;
	});
}

//Current SquirrelDuke req
function updateSquirrelReq(){
	var squirrelreqdoc = document.getElementById('squirrelreq');
	squirrelReq(function(req) {
		squirrelreqdoc.textContent = req;
	});
}

//Check TadpolePrince owner
function checkTadpoleOwner(){
	var tadpoleownerdoc = document.getElementById('tadpoleowner');
	currentTadpoleOwner(function(req) {
		c_tadpoleowner = "0x" + req.substring(26, 66);
		tadpoleownerdoc.textContent = c_tadpoleowner;
	});
}

//Current TadpolePrince req
function updateTadpoleReq(){
	var tadpolereqdoc = document.getElementById('tadpolereq');
	tadpoleReq(function(req) {
		a_tadpoleReq = formatEthValue2(web3.fromWei(req, 'ether'));
		a_tadpoleReq = parseFloat(a_tadpoleReq) + parseFloat(0.0001);
		tadpolereqdoc.textContent = a_tadpoleReq;
	});
}

//Current harvest cost
function updateHarvestCost(){
	var harvestcostdoc = document.getElementById('harvestcost');
	ComputeHarvest(function(req) {
		a_harvestCost = formatEthValue2(web3.fromWei(req,'ether'));
		a_harvestCost = parseFloat(a_harvestCost) + parseFloat(0.0001);
		harvestcostdoc.textContent = a_harvestCost;
	});
}

//Current lettuce req
function updateLettuceReq(){
	var lettucereqdoc = document.getElementById('lettucereq');
	lettuceReq(function(req) {
		lettucereqdoc.textContent = req;
	});
}

//Check if player owns lettuce
function checkOwnsLettuce(){
	var haslettucedoc = document.getElementById('haslettuce');
	GetMyLettuce(function(req) {
		if(req > 0) {
			haslettuce.innerHTML = " Lettuce";
		}
	});
}

//Check if player owns carrot
function checkOwnsCarrot(){
	var hascarrotdoc = document.getElementById('hascarrot');
	GetMyCarrot(function(req) {
		if(req > 0) {
			hascarrot.innerHTML = " Carrot";
		}
	});
}

//Check if player owns slug
function checkOwnsSlug(){
	var hasslugdoc = document.getElementById('hasslug');
	GetMySlug(function(req) {
		if(req > 0) {
			haslettuce.innerHTML = " Slug";
		}
	});
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

//Current ETH balance in contract
function updateContractBalance(){
	var contractbalancedoc = document.getElementById('contractbalance');
	web3.eth.getBalance(contractAddress, function(error, result) {
		if(!error) {
			//console.log(result);
			contractbalancedoc.textContent = formatEthValue(web3.fromWei(result, 'ether')); 
		} else {
			console.log("didn't work");
		}
	});
}

//Current round
function updateRound(){
	var rounddoc = document.getElementById('round');
	round(function(req) {
		rounddoc.textContent = req;
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

//Current round pot (10% of snailpot at start of round)
function updateRoundPot(){
	var roundpotdoc = document.getElementById('roundpot');
	roundPot(function(req) {
		a_roundPot = formatEthValue(web3.fromWei(req,'ether'));
		roundpotdoc.textContent = a_roundPot;
	});
}

//Current eggpot
function updateEggPot(){
	var eggpotdoc = document.getElementById('eggpot');
	eggPot(function(req) {
		a_eggPot = formatEthValue(web3.fromWei(req,'ether'));
		eggpotdoc.textContent = a_eggPot;
	});
}

//Current throne pot
function updateThronePot(){
	var thronepotdoc = document.getElementById('thronepot');
	thronePot(function(req) {
		a_thronePot = formatEthValue(web3.fromWei(req,'ether'));
		thronepotdoc.textContent = a_thronePot;
	});
}

//Current number of eggs on the market
function updateMarketEgg(){
	var marketeggdoc = document.getElementById('marketegg');
	marketEgg(function(req) {
		a_marketEgg = req;
		marketeggdoc.textContent = a_marketEgg;
	});
}

//Maximum eggs that can be bought
function updateMaxEggBuy(){
	var maxeggbuydoc = document.getElementById('maxeggbuy');
	maxeggbuydoc.innerHTML = a_marketEgg / 5;
}

//Current number of acorns
function updateMaxAcorn(){
	var maxacorndoc = document.getElementById('maxacorn');
	maxAcorn(function(req) {
		a_maxAcorn = req;
		maxacorndoc.textContent = a_maxAcorn;
	});
}

//Current acorn cost
function updateAcornCost(){
	var acorncostdoc = document.getElementById('acorncost');
	ComputeAcornCost(function(req) {
		a_acornCost = formatEthValue2(web3.fromWei(req,'ether'));
		acorncostdoc.textContent = a_acornCost;
	});
}

//Current player eggs
function updatePlayerEgg(){
	playereggdoc = document.getElementById('playeregg');
	ComputeMyEgg(m_account, function(req) {
		a_playerEgg = formatEthValue(req);
		playereggdoc.textContent = a_playerEgg;
	});
}

//Current player red eggs
function updatePlayerRed(){
	var playerreddoc = document.getElementById('playerred');
	GetMyRed(function(req) {
		a_playerRed = req;
		playerreddoc.textContent = a_playerRed;
	});
}

//Current player hatch size
function updatePlayerBoost(){
	var hatchboostdoc = document.getElementById('hatchboost');
	GetMyProd(function(req) {
		a_playerBoost = req;
		hatchboostdoc.textContent = a_playerBoost;
	});
}

//Current player prod
function updatePlayerProd(){
	var playerproddoc = document.getElementById('playerprod');
	a_playerProd = parseFloat(a_playerSnail / 24).toFixed(4); //100% per day, divided by 24 hours
	playerproddoc.textContent = a_playerProd;
}

//Current balance for player
function updatePlayerBalance(){
	var playerbalancedoc = document.getElementById('playerbalance');
	GetMyBalance(function(req) {
		playerbalancedoc.textContent = formatEthValue(web3.fromWei(req,'ether'));
	});
}	

//Current acorns for player
function updatePlayerAcorn(){
	var playeracorndoc = document.getElementById('playeracorn');
	GetMyAcorn(function(req) {
		playeracorndoc.textContent = req;
	});
}

//Current unclaimed share for player
function updatePlayerShare(){
	var playersharedoc = document.getElementById('playershare');
	ComputeMyShare(function(req) {
		playersharedoc.textContent = formatEthValue2(web3.fromWei(req,'ether'));
	});
}

/*





	
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



//Fast local update for player eggs
/*function fastupdatePlayerEgg(){
	playereggdoc = document.getElementById('playeregg');
	var b_playerEgg = a_playerEgg + (a_playerProd / 18000); //60 minutes * 60 seconds * 5 refreshes per second = 18000
	a_playerEgg = parseFloat(b_playerEgg).toFixed(4);
	playereggdoc.textContent = a_playerEgg;
}*/
/*


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

//Player input on buy
function updateFieldBuy2(){
	f_buy = document.getElementById('fieldBuy').value;
	var fieldbuy2doc = document.getElementById('fieldBuy2');
	fieldbuy2doc.textContent = f_buy;
}

//Player input on TadpolePrince
function updateFieldPrince2(){
	f_prince = document.getElementById('fieldPrince').value;
	var fieldprince2doc = document.getElementById('fieldPrince2');
	fieldprince2doc.textContent = f_buy;
}

//Player input on Acorn buy
function updateFieldTree2(){
	f_tree = document.getElementById('fieldTree').value;
	var fieldtree2doc = document.getElementById('fieldTree2');
	fieldtree2doc.textContent = f_tree;
}

//Player input on Red Egg Hatch
function updateRedHatch2(){
	f_redhatch = document.getElementById('fieldRed').value;
	if(f_redhatch > a_playerRed) {
		f_redhatch = a_playerRed;
	}
	var fieldred2doc = document.getElementById('fieldRed2');
	fieldred2doc.textContent = f_redhatch;
}

//Buy estimate
function updateBuyEstimate(){
	var buyEstimatedoc = document.getElementById('buyestimate');
	var weitospend = web3.toWei(f_buy,'ether');
	ComputeBuy(weitospend, function(req) {
		buyEstimatedoc.textContent = req;
	});	
}

//Sell estimate
function updateSellEstimate(){
	var sellEstimatedoc = document.getElementById('sellEstimate');
	ComputeSell(a_playerEgg, function(req) {
		sellEstimatedoc.textContent = formatEthValue2(web3.fromWei(req,'ether'));
	});
}

//Acorn estimate
function updateTreeEstimate(){
	var treeEstimatedoc = document.getElementById('treeestimate');
	treeEstimatedoc.innerHTML = f_tree / a_acornCost;
}

//Hatch estimate
function updateHatchEstimate(){
	var hatchEstimatedoc = document.getElementById('hatchestimate');
	hatchEstimatedoc.innerHTML = a_playerEgg * a_playerBoost;
}

//Red estimate
function updateRedEstimate(){
	var redEstimatedoc = document.getElementById('redestimate');
	redEstimatedoc.innerHTML = a_playerRed * a_playerBoost;
}

/* WEB3 TRANSACTIONS */

//Begin round
function webBeginRound(){
	BeginRound(function(){
	});
}

//Join round
function webJoinRound(){
	JoinRound(function(){
	});
}

//Fund tree
function webFundTree(){
    var weitospend = web3.toWei(f_tree,'ether');
    FundTree(weitospend, function(){
    });
}

//Claim share
function webClaimShare(){
	ClaimAcornShare(function(){
	});
}

//Buy starting snails
function webGetStarter(){
    var weitospend = web3.toWei(0.004,'ether');
	BuyStartingSnail(weitospend, function(){
	});
}

//Hatch eggs
function webHatchEgg(){
	var weitospend = web3.toWei(0.0008,'ether');
	HatchEgg(weitospend, function(){
	});
}

//Buy eggs
function webBuyEgg(){
    var weitospend = web3.toWei(f_buy,'ether');
    BuyEgg(weitospend, function(){
    });
}	

//Sell eggs
function webSellEgg(){
	SellEgg(function(){
	});
}

//Withdraw balance
function webWithdrawBalance(){
	WithdrawBalance(function(){
	});
}

//Become Snailmaster
function webBecomeSnailmaster(){
	BecomeSnailmaster(function(){
	});
}

//Become Snailmaster
function webBecomeSnailmaster(){
	BecomeSnailmaster(function(){
	});
}

//Become SpiderQueen
function webBecomeSpiderQueen(){
	BecomeSpiderQueen(function(){
	});
}

//Become SquirrelDuke
function webBecomeSquirrelDuke(){
	BecomeSquirrelDuke(function(){
	});
}

//Become TadpolePrince
function webBecomeTadpolePrince(){
	var weitospend = web3.toWei(f_prince,'ether');
	BecomeTadpolePrince(weitospend, function(){
	});
}

//Claim Red Harvest
function webClaimRedHarvest(){
	var weitospend = web3.toWei(a_harvestCost,'ether');
	ClaimRedHarvest(weitospend, function(){
	});
}

//Find Lettuce
function webFindLettuce(){
	FindLettuce(function(){
	});
}

//Find Carrot
function webFindCarrot(){
	var weitospend = web3.toWei(0.02,'ether');
	FindCarrot(weitospend, function(){
	});
}

//Find Slug
function webFindSlug(){
	FindSlug(function(){
	});
}

/*


//Sacrifice snail tokens
function webSacrificeSnail(){
	BecomePharaoh(f_sacrifice, function(){
	});
}







//Claim divs
function webClaimDiv(){
	ClaimDivs(function(){
	});
}



//Start a new round
function webAscendGod(){
	AscendGod(function(){
	});
}

/* CONTRACT ABI */ 


abiDefinition=[{"anonymous": false,"inputs": [{"indexed": true,"name": "newmaster","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "BecameMaster","type": "event"},{"constant": false,"inputs": [],"name": "BecomeSnailmaster","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSpiderQueen","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSquirrelDuke","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "BecomeTadpolePrince","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "BeginRound","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "buyer","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "playereggs","type": "uint256"}],"name": "BoughtEgg","type": "event"},{"constant": false,"inputs": [],"name": "BuyEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "BuyStartingSnail","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "ClaimAcornShare","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "share","type": "uint256"}],"name": "ClaimedShare","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "ClaimedHarvest","type": "event"},{"constant": false,"inputs": [],"name": "ClaimRedHarvest","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "FindCarrot","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "FindLettuce","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "FindSlug","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "acorns","type": "uint256"}],"name": "FundedTree","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "BoostedPot","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "newduke","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "squirrelreq","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "BecameDuke","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "newprince","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "tadpolereq","type": "uint256"}],"name": "BecamePrince","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "lettucereq","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "FoundLettuce","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "FoundCarrot","type": "event"},{"constant": false,"inputs": [],"name": "FundTree","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "Hatched","type": "event"},{"constant": false,"inputs": [],"name": "HatchEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "JoinedRound","type": "event"},{"constant": false,"inputs": [],"name": "JoinRound","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "PaidThrone","type": "event"},{"constant": false,"inputs": [],"name": "PayThrone","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "SellEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "seller","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "SoldEgg","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "StartedSnailing","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "newqueen","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "spiderreq","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "BecameQueen","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "UsedRed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "FoundSlug","type": "event"},{"constant": false,"inputs": [{"name": "_redAmount","type": "uint256"}],"name": "UseRedEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WithdrewBalance","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "roundwinner","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "WonRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "round","type": "uint256"}],"name": "BeganRound","type": "event"},{"constant": false,"inputs": [],"name": "WithdrawBalance","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [{"name": "_hoursToLaunch","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "acorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ACORN_MULT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ACORN_PRICE","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "CARROT_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "claimedEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "claimedShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_ether","type": "uint256"}],"name": "ComputeAcornBuy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeAcornCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "ethspent","type": "uint256"}],"name": "ComputeBuy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeHarvest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "ComputeMyEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeMyShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "eggspent","type": "uint256"}],"name": "ComputeSell","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "base","type": "uint256"}],"name": "ComputeSquare","outputs": [{"name": "squareRoot","type": "uint256"}],"payable": false,"stateMutability": "pure","type": "function"},{"constant": true,"inputs": [],"name": "currentSnailmaster","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSpiderOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSquirrelOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentTadpoleOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "dev","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "divPerAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "eggPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "FROGKING_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "gameActive","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyCarrot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyLettuce","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyProd","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyRed","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMySlug","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMySnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyStart","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "gotCarrot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_COUNT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_DUR_ROOT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_DURATION","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_MIN_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "harvestStartCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "harvestStartTime","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasLettuce","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasSlug","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasStartingSnail","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hatcherySnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HATCHING_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "lastHatch","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "LETTUCE_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lettuceReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "marketEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "maxAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "nextRoundStart","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "prodBoost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "redEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "round","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ROUND_DOWNTIME","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "roundPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SLUG_MIN_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SNAILMASTER_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "snailmasterReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "snailPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SNAILTHRONE","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SPIDER_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "spiderReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SQUIRREL_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "squirrelReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "STARTING_SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "STARTING_SNAIL_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TADPOLE_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "tadpoleReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "thronePot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TIME_TO_HATCH_1SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}]


function BecomeSnailmaster(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function BecomeSpiderQueen(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function BecomeSquirrelDuke(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function BecomeTadpolePrince(eth,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function BeginRound(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function BuyEgg(eth,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function BuyStartingSnail(eth,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ClaimAcornShare(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ClaimRedHarvest(eth,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function FindCarrot(eth,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function FindLettuce(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function FindSlug(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function FundTree(eth,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function HatchEgg(eth,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function JoinRound(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function PayThrone(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function SellEgg(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function UseRedEgg(_redAmount,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function WithdrawBalance(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function acorn(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ACORN_MULT(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ACORN_PRICE(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function CARROT_COST(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function claimedEgg(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function claimedShare(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ComputeAcornBuy(_ether,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ComputeAcornCost(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ComputeBuy(ethspent,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ComputeHarvest(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ComputeMyEgg(adr,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ComputeMyShare(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ComputeSell(eggspent,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ComputeSquare(base,callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function currentSnailmaster(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function currentSpiderOwner(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function currentSquirrelOwner(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function currentTadpoleOwner(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function dev(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.dev.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('dev ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function divPerAcorn(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function eggPot(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function FROGKING_REQ(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function gameActive(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function GetMyAcorn(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.GetMyAcorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMyAcorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyBalance(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function GetMyCarrot(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.GetMyCarrot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMyCarrot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyEgg(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function GetMyLettuce(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.GetMyLettuce.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMyLettuce ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyProd(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function GetMyRed(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.GetMyRed.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMyRed ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyRound(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.GetMyRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMyRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMySlug(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.GetMySlug.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMySlug ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMySnail(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function GetMyStart(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
    var outputData = myContract.GetMyStart.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetMyStart ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function gotCarrot(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function HARVEST_COUNT(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function HARVEST_DUR_ROOT(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function HARVEST_DURATION(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function HARVEST_MIN_COST(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function harvestStartCost(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function harvestStartTime(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function hasLettuce(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function hasSlug(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function hasStartingSnail(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function hatcherySnail(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function HATCHING_COST(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function lastHatch(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function LETTUCE_BASE_REQ(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function lettuceReq(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function marketEgg(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function maxAcorn(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function nextRoundStart(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function playerBalance(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function playerRound(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function prodBoost(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function redEgg(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function round(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function ROUND_DOWNTIME(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function roundPot(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function SLUG_MIN_REQ(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function SNAILMASTER_REQ(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function snailmasterReq(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function snailPot(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function SNAILTHRONE(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function SPIDER_BASE_REQ(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function spiderReq(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function SQUIRREL_BASE_REQ(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function squirrelReq(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function STARTING_SNAIL(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function STARTING_SNAIL_COST(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function TADPOLE_BASE_REQ(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function tadpoleReq(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function thronePot(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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


function TIME_TO_HATCH_1SNAIL(callback){
    var contractAbi = web3.eth.contract(abiDefinition);
    var myContract = contractAbi.at(contractAddress);
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




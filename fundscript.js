var contractAddress="0x486e218E8029eFCc096DbE8a8E4C7f1a20aF8ddF"; // ROPSTEN 6

/* WEB3 DETECTION */

var web3;

window.addEventListener("load", function() {
	if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        web3.version.getNetwork(function(error, result) {
            if (!error) {
                if (result == "3") {
					console.log("Ropsten Testnet successfully loaded!");
                } else {
                    console.log("You must be on the Testnet to play SnailFarm 3 Test!");
					web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
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

/* COUNTDOWN */

var countdownState = 1;
		
var fund_doublesnailpot;
var fund_doubleminusbalance;
var fund_doubledivten;
var fund_firstroundpot;
var fund_playeracornpercent;

var a_snailPot;
var a_contractBalance;
var a_playerAcorn;
var a_maxAcorn;
var a_playerShare;
var a_playerBalance;

var f_tree;

var m_account = "waiting for web3";
	
//Set game timer
function initCountdown(){
	var currentTime = Math.round((new Date()).getTime() / 1000);
	var endTime = 1544385600; //snailfarm3 launch
	countdownState = Math.floor((endTime - currentTime));
	updateCountdown();
}

/* STANDARD FUNCTIONS */

//Truncates ETH value to 3 decimals
function formatEthValue(ethstr){
    return parseFloat(parseFloat(ethstr).toFixed(3));
}

//Current ETH address in use
function updateEthAccount(){
	m_account = web3.eth.accounts[0];
}

//Current snail pot
function updateSnailPot(){
	snailPot(function(req) {
		a_snailPot = formatEthValue(web3.fromWei(req,'ether'));
	});
}

//Current ETH balance in contract
function updateContractBalance(){
	web3.eth.getBalance(contractAddress, function(error, result) {
		if(!error) {
			////////console.log(result);
			a_contractBalance = formatEthValue(web3.fromWei(result, 'ether')) 
		} else {
			//////console.log("didn't work");
		}
	});
}

//Acorn estimate
function updateTreeEstimate(){
	var treeEstimatedoc = document.getElementById('treeestimate');
	treeEstimatedoc.innerHTML = (f_tree / 0.0005).toFixed(0);
}

//Current acorns for player
function updatePlayerAcorn(){
	var playeracorndoc = document.getElementById('playeracorn');
	GetAcorn(m_account, function(result) {
		a_playerAcorn = result;
		playeracorndoc.textContent = a_playerAcorn;
	});
}

//Current unclaimed share for player
function updatePlayerShare(){
	var playersharedoc = document.getElementById('playershare');
	ComputeMyShare(function(req) {
		playersharedoc.textContent = formatEthValue2(web3.fromWei(req,'ether'));
	});
}

//Current balance for player
function updatePlayerBalance(){
	var playerbalancedoc = document.getElementById('playerbalance');
	GetMyBalance(function(req) {
		playerbalancedoc.textContent = formatEthValue2(web3.fromWei(req,'ether'));
	});
}	

//Current number of acorns
function updateMaxAcorn(){
	var maxacorndoc = document.getElementById('maxacorn');
	maxAcorn(function(req) {
		a_maxAcorn = req;
		maxacorndoc.textContent = a_maxAcorn;
	});
}

//Player input on Acorn buy
function updateFieldTree2(){
	f_tree = document.getElementById('fieldTree').value;
	var fieldtree2doc = document.getElementById('fieldTree2');
	fieldtree2doc.textContent = f_tree;
}

/* WEB3 TRANSACTIONS */
 
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

//Withdraw balance
function webWithdrawBalance(){
	WithdrawBalance(function(){
	});
}

/* COUNTDOWN UPDATE */
		
//Update game timer
function updateCountdown(){
	var countdowndoc = document.getElementById("countdown");
	if(countdownState > 0) {
		countdownState = countdownState - 1;
				
		var	numhours = Math.floor(countdownState / 3600);
		var numminutes = Math.floor((countdownState % 3600) / 60);
		var numseconds = (countdownState % 3600) % 60;
				
		if(numseconds < 10) {
			numseconds = "0" + numseconds;
		}
		if(numminutes < 10) {
			numminutes = "0" + numminutes;
		}
		if(numhours < 10) {
			numhours = "0" + numhours;
		}

		var countdownString = numhours + ":" + numminutes + ":" + numseconds;
		countdowndoc.textContent = countdownString;
	} else {
		document.getElementById('fundingstate').textContent = 'THE ETHERTREE IS GROWING!';
		countdowndoc.textContent = "GET ACORNS NOW";
	}
	updateEthAccount();
	updateMaxAcorn();
	updatePlayerAcorn();
	updateContractBalance();
	updateSnailPot();
	updateFieldTree2();
	updateTreeEstimate();
	updatePlayerBalance();
	updatePlayerShare();
	updateFundVariables();
	setTimeout(updateCountdown, 1000);
}
		
//Update FundTree-specific variables
function updateFundVariables() {
	fund_doublesnailpot = parseFloat(a_snailPot * 2).toFixed(3);
	var doublesnailpotdoc = document.getElementById('doublesnailpot');
	doublesnailpotdoc.textContent = fund_doublesnailpot;
			
	fund_doubleminusbalance = parseFloat(fund_doublesnailpot - a_contractBalance).toFixed(3);
	var doubleminusbalancedoc = document.getElementById('doubleminusbalance');
	doubleminusbalancedoc.textContent = fund_doubleminusbalance;
			
	fund_doubledivten = parseFloat(fund_doublesnailpot / 10).toFixed(4);
	var doubledivtendoc = document.getElementById('doubledivten');
	doubledivtendoc.textContent = fund_doubledivten;
			
	fund_firstroundpot = parseFloat(a_snailPot / 10).toFixed(4);
	var firstroundpotdoc = document.getElementById('firstroundpot');
	firstroundpotdoc.textContent = fund_firstroundpot;
			
	fund_playeracornpercent = parseFloat(100 * a_playerAcorn / a_maxAcorn).toFixed(2);
	var playeracornpercentdoc = document.getElementById('playeracornpercent');
	playeracornpercentdoc.textContent = fund_playeracornpercent;
}




/* CONTRACT ABI */
 
abiDefinition=[{"constant": true,"inputs": [],"name": "ACORN_PRICE","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "LETTUCE_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SPIDER_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "gotCarrot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeHarvest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "round","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetRed","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "ClaimAcornShare","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "JoinRound","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "BuyStartingSnail","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hatcherySnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasSlug","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "divPerAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_redAmount","type": "uint256"}],"name": "UseRedEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_MIN_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasStartingSnail","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "base","type": "uint256"}],"name": "ComputeSquare","outputs": [{"name": "squareRoot","type": "uint256"}],"payable": false,"stateMutability": "pure","type": "function"},{"constant": false,"inputs": [],"name": "FundTree","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "_ether","type": "uint256"}],"name": "ComputeAcornBuy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "redEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeAcornCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TADPOLE_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "roundPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "eggspent","type": "uint256"}],"name": "ComputeSell","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetSnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "lastHatch","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SNAILTHRONE","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "PayThrone","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ACORN_MULT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "ComputeMyEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "acorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FindLettuce","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "SellEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetLettuce","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSpiderQueen","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "snailPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BuyEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetProd","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SQUIRREL_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ROUND_DOWNTIME","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "GrabRedHarvest","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "HATCHING_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetSlug","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "snailmasterReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "STARTING_SNAIL_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "harvestStartTime","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSpiderOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SLUG_MIN_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "eggPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "HatchEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "FROGKING_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BeginRound","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "marketEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeTadpolePrince","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "SNAILMASTER_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "dev","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "prodBoost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FindCarrot","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "harvestStartCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "WithdrawBalance","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "STARTING_SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeMyShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentLeader","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSnailmaster","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_COUNT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "tadpoleReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "claimedShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "thronePot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "ethspent","type": "uint256"}],"name": "ComputeBuy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "maxAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "spiderReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TIME_TO_HATCH_1SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "CARROT_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSquirrelDuke","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetCarrot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasLettuce","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "nextRoundStart","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_DURATION","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSnailmaster","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "GetMyRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "claimedEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_DUR_ROOT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lettuceReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FindSlug","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "squirrelReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "gameActive","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSquirrelOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentTadpoleOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [{"name": "_hoursToLaunch","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "acorns","type": "uint256"}],"name": "FundedTree","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "acorns","type": "uint256"}],"name": "ClaimedShare","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "BecameMaster","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WithdrewBalance","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "Hatched","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "SoldEgg","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "playereggs","type": "uint256"}],"name": "BoughtEgg","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "StartedSnailing","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "spiderreq","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "BecameQueen","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "squirrelreq","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "BecameDuke","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "tadpolereq","type": "uint256"}],"name": "BecamePrince","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "roundwinner","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WonRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "round","type": "uint256"}],"name": "BeganRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "JoinedRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "GrabbedHarvest","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "UsedRed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"}],"name": "FoundSlug","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "lettucereq","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "FoundLettuce","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "FoundCarrot","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "PaidThrone","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "BoostedPot","type": "event"}]

var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);

function ACORN_PRICE(callback){

    var outputData = myContract.ACORN_PRICE.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ACORN_PRICE ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyBalance(callback){
    
   
    var outputData = myContract.GetMyBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetMyBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function LETTUCE_BASE_REQ(callback){
    
   
    var outputData = myContract.LETTUCE_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('LETTUCE_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function SPIDER_BASE_REQ(callback){
    
   
    var outputData = myContract.SPIDER_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('SPIDER_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetAcorn(adr,callback){
    
   
    var outputData = myContract.GetAcorn.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetAcorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function gotCarrot(callback){
    
   
    var outputData = myContract.gotCarrot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('gotCarrot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeHarvest(callback){
    
   
    var outputData = myContract.ComputeHarvest.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ComputeHarvest ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function playerRound(callback){
    
   
    var outputData = myContract.playerRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('playerRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function round(callback){
    
   
    var outputData = myContract.round.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('round ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetRed(adr,callback){
    
   
    var outputData = myContract.GetRed.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetRed ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ClaimAcornShare(callback){
    
   
    var outputData = myContract.ClaimAcornShare.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ClaimAcornShare ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function JoinRound(callback){
    
   
    var outputData = myContract.JoinRound.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('JoinRound ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function BuyStartingSnail(eth,callback){
    
   
    var outputData = myContract.BuyStartingSnail.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            ////console.log('BuyStartingSnail ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function hatcherySnail(callback){
    
   
    var outputData = myContract.hatcherySnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('hatcherySnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function hasSlug(callback){
    
   
    var outputData = myContract.hasSlug.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('hasSlug ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function divPerAcorn(callback){
    
   
    var outputData = myContract.divPerAcorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('divPerAcorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function UseRedEgg(_redAmount,callback){
    
   
    var outputData = myContract.UseRedEgg.getData(_redAmount);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('UseRedEgg ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_MIN_COST(callback){
    
   
    var outputData = myContract.HARVEST_MIN_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('HARVEST_MIN_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function hasStartingSnail(callback){
    
   
    var outputData = myContract.hasStartingSnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('hasStartingSnail ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeSquare(base,callback){
    
   
    var outputData = myContract.ComputeSquare.getData(base);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ComputeSquare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function FundTree(eth,callback){
    
   
    var outputData = myContract.FundTree.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            ////console.log('FundTree ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeAcornBuy(_ether,callback){
    
   
    var outputData = myContract.ComputeAcornBuy.getData(_ether);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ComputeAcornBuy ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function redEgg(callback){
    
   
    var outputData = myContract.redEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('redEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeAcornCost(callback){
    
   
    var outputData = myContract.ComputeAcornCost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ComputeAcornCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function TADPOLE_BASE_REQ(callback){
    
   
    var outputData = myContract.TADPOLE_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('TADPOLE_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function roundPot(callback){
    
   
    var outputData = myContract.roundPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('roundPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeSell(eggspent,callback){
    
   
    var outputData = myContract.ComputeSell.getData(eggspent);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ComputeSell ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetSnail(adr,callback){
    
   
    var outputData = myContract.GetSnail.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetSnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function lastHatch(callback){
    
   
    var outputData = myContract.lastHatch.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('lastHatch ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function SNAILTHRONE(callback){
    
   
    var outputData = myContract.SNAILTHRONE.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('SNAILTHRONE ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function PayThrone(callback){
    
   
    var outputData = myContract.PayThrone.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('PayThrone ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function playerBalance(callback){
    
   
    var outputData = myContract.playerBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('playerBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ACORN_MULT(callback){
    
   
    var outputData = myContract.ACORN_MULT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ACORN_MULT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeMyEgg(adr,callback){
    
   
    var outputData = myContract.ComputeMyEgg.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ComputeMyEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function acorn(callback){
    
   
    var outputData = myContract.acorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('acorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function FindLettuce(callback){
    
   
    var outputData = myContract.FindLettuce.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('FindLettuce ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function SellEgg(callback){
    
   
    var outputData = myContract.SellEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('SellEgg ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetLettuce(adr,callback){
    
   
    var outputData = myContract.GetLettuce.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetLettuce ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeSpiderQueen(callback){
    
   
    var outputData = myContract.BecomeSpiderQueen.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('BecomeSpiderQueen ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function snailPot(callback){
    
   
    var outputData = myContract.snailPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('snailPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function BuyEgg(eth,callback){
    
   
    var outputData = myContract.BuyEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            ////console.log('BuyEgg ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetProd(adr,callback){
    
   
    var outputData = myContract.GetProd.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetProd ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function SQUIRREL_BASE_REQ(callback){
    
   
    var outputData = myContract.SQUIRREL_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('SQUIRREL_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyEgg(callback){
    
   
    var outputData = myContract.GetMyEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetMyEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ROUND_DOWNTIME(callback){
    
   
    var outputData = myContract.ROUND_DOWNTIME.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ROUND_DOWNTIME ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GrabRedHarvest(eth,callback){
    
   
    var outputData = myContract.GrabRedHarvest.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            ////console.log('GrabRedHarvest ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function HATCHING_COST(callback){
    
   
    var outputData = myContract.HATCHING_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('HATCHING_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetSlug(adr,callback){
    
   
    var outputData = myContract.GetSlug.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetSlug ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function snailmasterReq(callback){
    
   
    var outputData = myContract.snailmasterReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('snailmasterReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function STARTING_SNAIL_COST(callback){
    
   
    var outputData = myContract.STARTING_SNAIL_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('STARTING_SNAIL_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function harvestStartTime(callback){
    
   
    var outputData = myContract.harvestStartTime.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('harvestStartTime ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function currentSpiderOwner(callback){
    
   
    var outputData = myContract.currentSpiderOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('currentSpiderOwner ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function SLUG_MIN_REQ(callback){
    
   
    var outputData = myContract.SLUG_MIN_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('SLUG_MIN_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function eggPot(callback){
    
   
    var outputData = myContract.eggPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('eggPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function HatchEgg(eth,callback){
    
   
    var outputData = myContract.HatchEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            ////console.log('HatchEgg ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function FROGKING_REQ(callback){
    
   
    var outputData = myContract.FROGKING_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('FROGKING_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function BeginRound(callback){
    
   
    var outputData = myContract.BeginRound.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('BeginRound ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function marketEgg(callback){
    
   
    var outputData = myContract.marketEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('marketEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeTadpolePrince(eth,callback){
    
   
    var outputData = myContract.BecomeTadpolePrince.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            ////console.log('BecomeTadpolePrince ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function SNAILMASTER_REQ(callback){
    
   
    var outputData = myContract.SNAILMASTER_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('SNAILMASTER_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function dev(callback){
    
   
    var outputData = myContract.dev.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('dev ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function prodBoost(callback){
    
   
    var outputData = myContract.prodBoost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('prodBoost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function FindCarrot(eth,callback){
    
   
    var outputData = myContract.FindCarrot.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            ////console.log('FindCarrot ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function harvestStartCost(callback){
    
   
    var outputData = myContract.harvestStartCost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('harvestStartCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function WithdrawBalance(callback){
    
   
    var outputData = myContract.WithdrawBalance.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('WithdrawBalance ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function STARTING_SNAIL(callback){
    
   
    var outputData = myContract.STARTING_SNAIL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('STARTING_SNAIL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeMyShare(callback){
    
   
    var outputData = myContract.ComputeMyShare.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ComputeMyShare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function currentLeader(callback){
    
   
    var outputData = myContract.currentLeader.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('currentLeader ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function currentSnailmaster(callback){
    
   
    var outputData = myContract.currentSnailmaster.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('currentSnailmaster ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_COUNT(callback){
    
   
    var outputData = myContract.HARVEST_COUNT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('HARVEST_COUNT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function tadpoleReq(callback){
    
   
    var outputData = myContract.tadpoleReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('tadpoleReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function claimedShare(callback){
    
   
    var outputData = myContract.claimedShare.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('claimedShare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function thronePot(callback){
    
   
    var outputData = myContract.thronePot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('thronePot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeBuy(ethspent,callback){
    
   
    var outputData = myContract.ComputeBuy.getData(ethspent);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('ComputeBuy ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function maxAcorn(callback){
    
   
    var outputData = myContract.maxAcorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('maxAcorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function spiderReq(callback){
    
   
    var outputData = myContract.spiderReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('spiderReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function TIME_TO_HATCH_1SNAIL(callback){
    
   
    var outputData = myContract.TIME_TO_HATCH_1SNAIL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('TIME_TO_HATCH_1SNAIL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function CARROT_COST(callback){
    
   
    var outputData = myContract.CARROT_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('CARROT_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeSquirrelDuke(callback){
    
   
    var outputData = myContract.BecomeSquirrelDuke.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('BecomeSquirrelDuke ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetCarrot(adr,callback){
    
   
    var outputData = myContract.GetCarrot.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetCarrot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function hasLettuce(callback){
    
   
    var outputData = myContract.hasLettuce.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('hasLettuce ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function nextRoundStart(callback){
    
   
    var outputData = myContract.nextRoundStart.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('nextRoundStart ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_DURATION(callback){
    
   
    var outputData = myContract.HARVEST_DURATION.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('HARVEST_DURATION ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeSnailmaster(callback){
    
   
    var outputData = myContract.BecomeSnailmaster.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('BecomeSnailmaster ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyRound(callback){
    
   
    var outputData = myContract.GetMyRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('GetMyRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function claimedEgg(callback){
    
   
    var outputData = myContract.claimedEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('claimedEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_DUR_ROOT(callback){
    
   
    var outputData = myContract.HARVEST_DUR_ROOT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('HARVEST_DUR_ROOT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function lettuceReq(callback){
    
   
    var outputData = myContract.lettuceReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('lettuceReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function FindSlug(callback){
    
   
    var outputData = myContract.FindSlug.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('FindSlug ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function squirrelReq(callback){
    
   
    var outputData = myContract.squirrelReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('squirrelReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function gameActive(callback){
    
   
    var outputData = myContract.gameActive.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('gameActive ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function currentSquirrelOwner(callback){
    
   
    var outputData = myContract.currentSquirrelOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('currentSquirrelOwner ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}


function currentTadpoleOwner(callback){
    
   
    var outputData = myContract.currentTadpoleOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            ////console.log('currentTadpoleOwner ',result);
            callback(result)
        }
        else{
            ////console.log('transaction failed with ',error.message)
        }
    });
}
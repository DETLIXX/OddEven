var player1 = {  
    playerName: "Player1",
    playerMarbles: 10,
    playerNumber: 0,
    ready: false
};

var player2 = {  
    playerName: "Player2",
    playerMarbles: 10,
    playerNumber: 0,
    ready: false
};


var titleText = ".titleText";

 // Step1 : Set Name 
$(".setName").click(function (e) { 
    e.preventDefault();

    if($(".p1Name").val() == "") { 
        alert("You cannot play without setting both names");
    }
    else if($(".p2Name").val() == "") { 
        alert("You cannot play without setting both names");
    }
    else { 
        $(".rollBtn").css("display", "block");
        $(".setName").css("display", "none");
        $(".p1Name, .p2Name").attr("readonly", "readonly");
        $(".p1Name, .p2Name").css("background-color", "transparent").css("color", "white");

        player1.playerName = $(".p1Name").val();
        player2.playerName = $(".p2Name").val();
    }
});

// Step 2: Can roll

$(".rollBtn").click(function (e) { 

    player1.playerNumber = $("#Player1").val();
    player2.playerNumber = $("#Player2").val();
    e.preventDefault();

    CheckNumbers();
});



// Step 3: Check numbers if there is not more then 20 and less then 1
function CheckNumbers() { 
    if(player1.playerNumber > 20 || player1.playerNumber < 1) { 
        console.log($("input").val());
        $("#Player1").css("background-color", "red");
        $("#Player1").val("");
        setTimeout(function() { 
            alert(player1.playerName + " Choose between 1-10");
            $("#Player1").css("background-color", "#94FDFF");
        },100);
    }
    else if (player2.playerNumber > 20 || player2.playerNumber < 1) { 
        console.log($("input").val());
        $("#Player2").css("background-color", "red");
        $("#Player2").val("");
        setTimeout(function() { 
            alert(player2.playerName + " Choose between 1-10");
            $("#Player2").css("background-color", "#94FDFF");
        },100);
    }
    else { 
        CheckMarbles();
    }
}


function CheckMarbles() { 
    if(player1.playerMarbles >= player1.playerNumber) { 
        player1.ready = true;
    }
    else { 
        alert(player1.playerName + ` Dont have enough marbles!`)
    }

    if(player2.playerMarbles >= player2.playerNumber) { 
        player2.ready = true;
    }
    else { 
        alert(player2.playerName + " Dont have enough marbles!")
    }

    if (player1.ready && player2.ready) { 
        console.log("Ready and Roll");

        player1.playerMarbles -= player1.playerNumber;
        player2.playerMarbles -=  player2.playerNumber;

        $(".p1Marbles").text(player1.playerMarbles);
        $(".p2Marbles").text(player2.playerMarbles);

        RollMarbles();
        $(".rollBtn").css("display", "none");
    }

}

function RollMarbles() { 
    $(titleText).text("Rolling 🎲");

    setTimeout(function() { 
        var randomNumber = Math.floor(Math.random() * 2);

        var player1Result = player1.playerNumber % 2;
        var player2Result = player2.playerNumber % 2;

        console.log(`Results ${randomNumber}, P1: ${player1Result}, P2 ${player2Result}`);

        CheckResults(randomNumber, player1Result, player2Result);
    }, 1500)

    setTimeout(function() { 
        player1.ready = false;
        player2.ready = false;

        $(".rollBtn").css("display", "block");
    },2000)
}


// 0 = Odd / 1 = Even 
// p1 (4) % 2 = 0 = Even
// p2 (3) % 2 = 1 = Odd


function CheckResults(result, p1Result, p2Result) { 


    console.log(`${p1Result} + ${p2Result}`);
    if(p1Result == p2Result) { 
        $(titleText).text("- DRAW -"); 
        player1.playerMarbles = parseInt(player1.playerMarbles) + parseInt(player1.playerNumber);
        player2.playerMarbles = parseInt(player2.playerMarbles) + parseInt(player2.playerNumber);
    }
    else {
        var oddWinner;
        var evenWinner;
    
        if(result == 0) { 
            if(p1Result == 1) { 
                console.log("p1 Odd Win");
                oddWinner = player1.playerName;
                player1.playerMarbles = parseInt(player1.playerMarbles) + parseInt(player1.playerNumber) + parseInt(player2.playerNumber);
            }
    
            if(p2Result == 1) { 
                console.log("p2 Odd Win");
                oddWinner = player2.playerName;
                player2.playerMarbles = parseInt(player2.playerMarbles) + parseInt(player2.playerNumber) + parseInt(player1.playerNumber);
            }
    
            $(titleText).text(". Odd ." + "\n Winner is " + oddWinner); 
        }
        else if (result == 1) { 
    
            if(p1Result == 0) { 
                console.log("p1 Even Win");
                evenWinner = player1.playerName;
                player1.playerMarbles = parseInt(player1.playerMarbles) + parseInt(player1.playerNumber) + parseInt(player2.playerNumber);
            }
    
            if(p2Result == 0) { 
                console.log("p2 Even Win");
                evenWinner = player2.playerName;
                player2.playerMarbles = parseInt(player2.playerMarbles) + parseInt(player2.playerNumber) + parseInt(player1.playerNumber);
            }
            $(titleText).text(": Even :" + "\n Winner is " + evenWinner); 
        }
    }

    CheckWinner();

}

function CheckWinner() { 

    if(player1.playerMarbles == 20) { 
        $(titleText).text("GAME END \n Winner is " + player1.playerName);
        $(".rollBtn").css("display", "none");
    }
    if(player2.playerMarbles == 20) { 
        $(titleText).text("GAME END \n Winner is " + player2.playerName);
        $(".rollBtn").css("display", "none");
    }

    $(".p1Marbles").text(player1.playerMarbles);
    $(".p2Marbles").text(player2.playerMarbles);

    $("#Player1").val("");
    $("#Player2").val("");


}

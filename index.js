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



// Step 3: Check numbers if there is not more then 10 and less then 1
function CheckNumbers() { 
    if(player1.playerNumber > 10 || player1.playerNumber < 1) { 
        console.log($("input").val());
        $("#Player1").css("background-color", "red");
        $("#Player1").val("");
        setTimeout(function() { 
            alert(player1.playerName + " Choose between 1-10");
            $("#Player1").css("background-color", "#94FDFF");
        },100);
    }
    else if (player2.playerNumber > 10 || player2.playerNumber < 1) { 
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
        alert(player1.playerName + " Dont have enough marbles!")
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

    setTimeout(function() { 
        player1.ready = false;
        player2.ready = false;

        console.log("Test");
        $(".rollBtn").css("display", "block");
    },2000)
}

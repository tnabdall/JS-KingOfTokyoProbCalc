var Die = {
    face: 1,
    rollDie: function(){
    this.face =  Math.floor(Math.random()*6+1);
    },
    printDie: function(){
        console.log(this.face);
    },
    setDie: function(value){
        this.face = value ;
    }
}

function Dice(){
    this.dice = [];
    this.rollDice = function(rollArray){
        for (var i = 0; i<6; i++){
            if(!rollArray){
                this.dice[i].rollDie();
            }
            else{
                if(rollArray[i]){
                    this.dice[i].rollDie();
                }
            }
        }
    };
    this.createDice = function(){
        while(this.dice.length<6){
            this.dice.push(Object.create(Die));
        }
    };
    this.createDice();
}

function Probability(desRoll, numberOfRolls, setRoll){
    this.dice = new Dice();
    this.diceDesired = new Dice();
    this.numRolls = numberOfRolls;
    this.turns = 0;
    this.successes = 0;
    this.setDice = false;
    this.setDiceStr = "";
    

    this.Create = function(){
        if(desRoll){
            for(var i = 0; i<6; i++){
                this.diceDesired.dice[i].setDie(desRoll.dice[i].face);
            }
        }
        if(setRoll){
            for(var i = 0; i<6; i++){
                this.dice.dice[i].setDie(setRoll.dice[i].face);
            }
            this.setDice = true;
        }
        else{
            this.dice.rollDice();
        }
    }

    this.Calculate = function(totalTurns){
        if (totalTurns<1){
            return 0;
        }
        while(this.turns<totalTurns){
            this.turns+=1;
            if(!this.setDice){
                this.dice.rollDice();
            }
            else{
                this.dice.rollDice(this.compareRolls());
            }
            for (var i = 0; i<this.numRolls; i++){
                var rollThis = this.compareRolls();
                if(this.isSuccess(rollThis)){
                    this.successes+=1;
                    break;
                }
                else{
                    this.dice.rollDice(rollThis);
                }
            }
            if(this.setDice){
                for (var i = 0; i < 6; i++){
                    this.dice.dice[i].setDie(setRoll.dice[i].face);
                }
            }

        }
        var probability = (this.successes)/this.turns;
        this.successes = 0;
        this.turns=0;
        return probability;
    }

    this.isSuccess = function(rollThis){
        for(var i = 0; i<6; i++){
            if(rollThis[i]){
                return false;
            }
        }
        return true;
    }

    this.compareRolls = function(){
        var rollThis = [];
        for (var i = 0; i<6; i++){
            rollThis.push(true);
        }
        var onesDes = 0;
        var twosDes = 0;
        var threesDes = 0;
        var attDes = 0;
        var healDes = 0;
        var enerDes = 0;
        var desiredValues = [];
        var diceValues = [];
        for (var i = 0; i<6; i++){
            desiredValues.push(this.diceDesired.dice[i].face);
            diceValues.push(this.dice.dice[i].face);
        }
        for(var i = 0; i<6; i++){
            switch(desiredValues[i]){
                case 1: onesDes+=1; break;
                case 2: twosDes+=1; break;
                case 3: threesDes+=1; break;
                case 4: attDes+=1; break;
                case 5: healDes+=1; break;
                case 6: enerDes+=1; break;
                case 7: break;
            }
        }
        for (var i = 0; i<6; i++){
            if(diceValues[i] == 1 && onesDes>0){
                rollThis[i] = false;
                onesDes-=1;
            }
            else if(diceValues[i]==2 && twosDes>0){
                rollThis[i] = false;
                twosDes-=1;
            }
            else if(diceValues[i]==3 && threesDes>0){
                rollThis[i] = false;
                threesDes-=1;
            }
            else if(diceValues[i]==4 && attDes>0){
                rollThis[i] = false;
                attDes-=1;
            }
            else if(diceValues[i]==5 && healDes>0){
                rollThis[i] = false;
                healDes-=1;
            }
            else if(diceValues[i]==6 && enerDes>0){
                rollThis[i] = false;
                enerDes-=1;
            }
        }
        if(onesDes+twosDes+threesDes+attDes+healDes+enerDes==0){
            for (var k = 0; k<6; k++){
                rollThis[k]=false;
            }
        }
        return rollThis;
    }

    this.Create();

}

function foo(){
    dice = new Dice();
    for (var i = 0; i<6; i++){
        dice.dice[i].setDie(i+1);
    }
    prob = new Probability(dice,3);
}

function calculate(numSimulations, numRolls, desRollStr, setRollCheck,setDiceStr){
    var sims = parseInt(numSimulations);
    var rolls = parseInt(numRolls);
    if (sims<0 || sims>10000000 || sims ==NaN){
        return "Error in simulations";
    }
    if (rolls<0 || rolls>10 || rolls ==NaN){
        return "Error in rolls;"
    }
    var desdice = new Dice();
    for (var i = 0; i<6; i++){
        switch(desRollStr.substring(i,i+1)){
            case "1": desdice.dice[i].setDie(1); break;
            case "2": desdice.dice[i].setDie(2); break;
            case "3": desdice.dice[i].setDie(3); break;
            case "a": desdice.dice[i].setDie(4); break;
            case "h": desdice.dice[i].setDie(5); break;
            case "e": desdice.dice[i].setDie(6); break;
            case "w": desdice.dice[i].setDie(7); break;
        }

    }
    if(setRollCheck){
        var setdice = new Dice();
        for (var i = 0; i<6; i++){
            switch(setDiceStr.substring(i,i+1)){
                case "1": setdice.dice[i].setDie(1); break;
                case "2": setdice.dice[i].setDie(2); break;
                case "3": setdice.dice[i].setDie(3); break;
                case "a": setdice.dice[i].setDie(4); break;
                case "h": setdice.dice[i].setDie(5); break;
                case "e": setdice.dice[i].setDie(6); break;
                case "w": setdice.dice[i].setDie(7); break;
            }
    
        }
        
        prob = new Probability(desdice,rolls,setdice);
        return prob.Calculate(sims);
    }
    else{
        prob = new Probability(desdice,rolls);
        return prob.Calculate(sims);
    }
}

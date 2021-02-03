class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      player.getCount();

      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();

      }

      form = new Form()
      form.display();
    }
  }

  play(){
    Form.hide();
    text("Game Start", 120, 100);

    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var display_Position = 130;

      for(var plr in allPlayers){
        if (plr === "player" + player.index)
        fill("red");

        else
        fill("black");
        display_Position = display_Position + 20;

        text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 120, display_Position)
      }
    }

    if(keyDown(UP_ARROW) && player.index !== null){
      player.distance = player.distance + 20;
      player.update();
    }
  }
}
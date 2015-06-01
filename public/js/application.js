$(document).ready(function() {

//**********************************************  LOGIN STUFF  ****//
  $('button#create_link').click(function(){
    console.log("create button clicked");
    $('#login').hide();
    $('#newb').show();
  });

  $('button#sign_in').click(function(event){
    event.preventDefault();
    var $email = $('input[name="email"]').val();
    var $password = $('input[name="password"]').val();
    $.ajax({
            type: 'post',
            url: '/sessions/new',
            data: {"email": $email, "password": $password},
            dataType: 'json'
          }
    ).done(function(user){
      $('#login').hide();
      $('#welcome').show();
      $('#handle').html(user.handle)
      }
    ).fail(function(response){
      if ($('span')) {
        $('span').remove()
      }
      $('#login_form').prepend('<span class="red">' + JSON.parse(response.responseText) + '<br></span>')
      }
    )
  })

  $('button#register').click(function(event){
    event.preventDefault();
    console.log("register button clicked");
    var $email = $('input[name="new-email"]').val();
    var $handle = $('input[name="new-handle"]').val();
    var $password = $('input[name="new-password"]').val();
    $.ajax({
            type: 'post',
            url: '/users/new',
            data: {"email": $email, "handle": $handle, "password": $password},
            dataType: 'json'
            }
    ).done(function(user) {
      $('#newb').hide();
      $('#welcome').show();
      $('#handle').html(user.handle)
      }
    ).fail(function(response) {
      if ($('span')) {
        $('span').remove()
      }
      var parsedResponse = JSON.parse(response.responseText)
      for (var i=0; i<parsedResponse.length; i++) {
        $('#create_form').prepend('<span class="red">' + parsedResponse[i] + '<br></span>');
          };
    });

  })


//******************************************   AVATAR MOVEMENT  ****//

  var avatar = $('#avatar')
  $(document).keydown(function(key) {
    switch(parseInt(key.which,10)) {
      case 38:
        if (avatar.position().top > 0) {
          avatar.animate({top: "-=70px"}, 100);
          break;
        };
    }
    switch(parseInt(key.which,10)) {
      case 40:
        if (avatar.position().top < 350) {
          avatar.animate({top: "+=70px"}, 100);
          break;
        };
    }
  })


//**********************************************   GAME TIMER  ****//

  var format = function(time) {
    var m = s = ms = 0;
    m = Math.floor( time / (60 * 100) );
    time = time % (60 * 100);
    s = Math.floor( time / 100 );
    ms = time % 100;

    var newTime = m + ":" + (s > 9 ? s : "0" + s) + ":" +  (ms > 9 ? ms : "0" + ms);
    return newTime
  }

  var add = function() {
    timer++;
    $('time').html(format(timer));
  }

  var startTimer = function() {
    timeClock = setInterval(add, 10);
  }

  var stopTimer = function() {
    clearInterval(timeClock)
  }
  var timer = 0;


//**********************************************   COUNTDOWN  ****//

  var countDown = function() {
    centerText('3');
    setTimeout(function(){centerText('2')}, 1000);
    setTimeout(function(){centerText('1')}, 2000);
    setTimeout(function(){centerText('GO!')}, 3000);
    setTimeout(function(){centerText('')}, 4000);
  }
  var centerText = function(text) {
    $('.center_text').html(text);
  }


//******************************************   GAME FUNCTIONS  ****//



//******************************************   GAME VARIABLES  ****//

  var gameLength = 30;
  var normalSpeed = 500;
  var slowSpeed = 1000;
  var fastSpeed = 250;
  var gameSpeed = normalSpeed
  var miniLength = "+=" + (1100 / gameLength) + "px"
  var finishLine = "<div id='finish'></div>"
  var bus = "<div class='bus obstacle'><img class='img' src='./imgs/bus.gif'></div>"
  var car = "<div class='car obstacle'>car</div>"
  var lowRider = "<div class='car obstacle'><img class='img' src='./imgs/lowrider.gif'></div>"
  var pothole = "<div class='pothole obstacle'>pthole</div>"
  var coffee = "<div class='coffee obstacle'>cafe</div>"
  obstacles = [$('.bus'), $('.car'), $('.pothole'), $('.coffee')];


//*********************************************    GAME LOOP    ****//
  var startGameLoop = function(speed) {
    gameLoop();
    loopGame = setInterval(gameLoop, speed);
  }

  var stopGameLoop = function() {
    clearInterval(loopGame)
  }

  var resetGameLoop = function(speed) {
    stopGameLoop();
    startGameLoop(speed);
  }


  var gameLoop = function() {
    var move = function(obstacle) {
      obstacle.animate({left: "-=100px"}, gameSpeed, 'linear')
    }
    if (gameLength > 0) {

      move($('.obstacle'));
      move($('#finish'));
      if (gameLength === 29) {
        $('#ln2').append(pothole);
      }
      if (gameLength === 27) {
        $('#ln3').append(coffee);
      }
      if (gameLength === 17) {
        $('#ln4').append(lowRider)
      }
      if (gameLength === 16) {
        $('#ln5').append(bus)
      }

      if (gameLength === 11) {
        $('#ln1').append(finishLine);
        obstacles.push($('#finish'));
      };

      var crashingObstacle = $('.obstacle').filter(function(){
        return ( parseInt($(this).css('left'), 10) <= 115 && Math.round($(this).position().top) == Math.round($('#avatar').position().top));
      })

      var endingObstacles = $('.obstacle').filter(function(){
        return parseInt($(this).css('left'), 10) <= 15;
      })

      var blink = function() {
        $('#avatar').fadeIn(250).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250);
      }

      var busCrash = function() {
        stopGameLoop();
        $('#avatar').hide( "explode", {pieces: 9 }, 200);
        countDown();
        setTimeout(function(){crashingObstacle.remove(), blink()}, 1000);
        setTimeout(function() {startGameLoop(gameSpeed), $('#avatar').show()}, 4000);
      }

      var carCrash = function() {
        stopGameLoop();
        $('#avatar_img').hide( "scale", {percentage: 20, direction: 'vertical', origin: ['bottom']}, 500 );
        countDown();
        setTimeout(function(){crashingObstacle.remove(), blink()}, 1000);
        setTimeout(function() {startGameLoop(gameSpeed)}, 4000);
      }

      var hitPothole = function() {
        $('#avatar').effect("bounce", { times: 5 }, "slow")
        crashingObstacle.remove();
        gameSpeed = slowSpeed;
        resetGameLoop(gameSpeed);
        setTimeout(function(){
          gameSpeed = normalSpeed;
          resetGameLoop(gameSpeed);
        }, 6000);
      }

      var flash = function() {
        $('#avatar').effect('highlight',{color:"white"}, 100);
      }
      var getCoffee = function() {
        //flash avatar
        // var flashLoop = setInterval(function(){flash()}, 200);
        // flash()
        $('#avatar_img').hide("explode", {pieces: 9 }, 200);
        $('#star').show("explode", {pieces: 9 }, 200);
        crashingObstacle.remove();
        gameSpeed = fastSpeed;
        gameLength-- //THIS WILL BE IMPORTANT... not reaching end with gameloop reset... does this need to happen before every reset?
        resetGameLoop(gameSpeed);
        setTimeout(function(){
          gameSpeed = normalSpeed;
          resetGameLoop(gameSpeed);
          $('#avatar_img').show("explode", {pieces: 9 }, 200);
           $('#star').hide("explode", {pieces: 9 }, 200);
        }, 6000);
      }

      if (crashingObstacle.length > 0) {

        if (crashingObstacle.attr('class') == "bus obstacle") {
          busCrash();
        }
        else if (crashingObstacle.attr('class') == "car obstacle") {
          carCrash();
        }
        else if (crashingObstacle.attr('class') == "pothole obstacle") {
          hitPothole();
        }
        else if (crashingObstacle.attr('class') == "coffee obstacle") {
          getCoffee();
        }
      }

      endingObstacles.remove();

      $('#mini').animate({left: miniLength}, gameSpeed, 'linear');
      gameLength--;
    }
    else {
      stopTimer();
      clearInterval(loopGame);
    };
  };


//******************************************    ON PAGE LOAD    ****//

  window.onload = countDown(), setTimeout(function(){startTimer(), startGameLoop(gameSpeed)}, 3000);
/*************

  *************
  ONE GAME LOOP
  1) interval of 500ms
  2) check if crash, run crash
  3) check if win, break loop
  4) if objects on left, disappear
  5) move objects left
  6) generate objects
  7) move miniAvatar right
  *************


GAME FINISH
*******************/

















});


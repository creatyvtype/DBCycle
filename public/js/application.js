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


//**********************************************   COUNTDOWN  ****//

  var timer = 0;
  var countDown = function() {
    centerText('3');
    setTimeout(function(){centerText('2')}, 1000);
    setTimeout(function(){centerText('1')}, 2000);
    setTimeout(function(){centerText('GO!')}, 3000);
    setTimeout(function(){centerText('')}, 4000);
  }


//******************************************   GAME FUNCTIONS  ****//

  var centerText = function(text) {
    $('.center_text').html(text);
  }

  var startGameLoop = function() {
    gameLoop();
    loopGame = setInterval(gameLoop, gameSpeed);
  }

  var stopGameLoop = function() {
    clearInterval(loopGame)
  }

//******************************************   GAME VARIABLES  ****//

  //timer
  //gameLength
  //gameSpeed
  //miniLength
  //avatar
  var gameLength = 20;
  var gameSpeed = 500
  var miniLength = "+=" + (1100 / gameLength) + "px"

  // var Obstacle = function Obstacle(cssClass, code, speed) {
  //   this.cssClass = cssClass;
  //   this.code = code;
  //   this.speed = speed;
  // }

  // Obstacle.prototype.move = function() {
  //   this.animate({left: "-=100px"}, this.speed, 'linear')
  // }
  var finishLine = "<div class='obstacle' id='finish'></div>"
  var bus = "<div class='bus obstacle'></div>"
  var car = "<div class='car obstacle'></div>"
  var pothole = "<div class='pothole obstacle'></div>"
  var coffee = "<div class='coffee obstacle'></div>"
  obstacles = [$('.bus'), $('.car'), $('.pothole'), $('.coffee')];


//*********************************************    GAME LOOP    ****//
  var move = function(obstacle) {
    obstacle.animate({left: "-=100px"}, gameSpeed, 'linear')
  }

  var gameLoop = function() {
    if (gameLength > 0) {

      // $.each(obstacles, function(i, obstacle){
      //   move(obstacle);
      // })
      move($('.obstacle'));
      if (gameLength === 19) {
        $('#ln2').append(bus);
      }
      if (gameLength === 11) {
        //do I move this to the place where other obstacles get generated?
        $('#ln1').append(finishLine);
        obstacles.push($('#finish'));
      };
      if (gameLength === 18) {
        $('#ln3').append(car);
      }
      var avatarTop = document.getElementById('avatar').getBoundingClientRect().top

      /*
      NEXT STEPS
      -put images in
      -create crashes
      -randomly generate obstacles
      */

      $.each($('.obstacle'), function(i, obstacle) {
        var obstacleRect = obstacle.getBoundingClientRect()
        console.log(obstacleRect.left)
        if (obstacleRect.top === avatarTop && obstacleRect.left < 350) {
          console.log("MADE IT")
          clearInterval(loopGame);
        }
        else if (obstacle.getBoundingClientRect().left < 300) {
          obstacle.remove();
        }
        // console.log($('#avatar').position())
      })

      $('#mini').animate({left: miniLength}, gameSpeed, 'linear');
      gameLength--;
    }
    else {
      stopTimer();
      clearInterval(loopGame);
    };
  };


//******************************************    ON PAGE LOAD    ****//

  window.onload = countDown(), setTimeout(function(){startTimer(), startGameLoop()}, 3000);
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


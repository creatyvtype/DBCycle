$(document).ready(function() {
  //    LOGIN STUFF      *********************     LOGIN STUFF   ********
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
// END LOGIN STUFF     *********************  END LOGIN STUFF   *********

//GAME TIMER********************************  GAME TIMER  ****************
  var timer = 0
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

  $('#start_time').click(function(){
      setInterval(add, 10)
    })

  // var moveMini = function() {
  //   $('#mini').animate({"left": "+=1em"})
  // };

  var gameLength = 70;
//END GAME TIMER**************************   END GAME TIMER   ***********



//AVATAR MOVEMENT
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

//ON PAGE LOAD
  var centerText = $('.center_text')

  var countDown = function() {

  }

/*****************
GAME START
1) run countdown (3 2 1 GO!)
  a) run display 3, wait
  b) run display 2, wait
  c) run display 1, wait
  d) run display GO, wait (3 secs have passed)
  e) run display disappear, done
2) start timer 3 sec after page load
3) start game loop with counter 3 sec after page load

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

4) generate finishLine 10 loops shy of the end


GAME FINISH
*******************/

















});


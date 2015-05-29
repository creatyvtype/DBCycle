$(document).ready(function() {
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
      $('#login_form').prepend('<span class="red">' + response.responseText + '<br></span>')
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
      $('#create_form').prepend('<span class="red">' + response.responseText + '<br></span>');
      })
  })




});

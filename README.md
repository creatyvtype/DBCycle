# DBCycle
Phase 2 Passion Project

*Getting error messages back isn't working. Right now, I'm returning a weird thing to append to top.
*same for login and create
#ANSWER: JSON.parse the information that's coming back from .fail

*Not validating passwords correctly
#ANSWER: build validator in .js file because the password is not what is saved in the database.

GAME PLAN (hehehe)
1) avatar can move
  a) slide up and down 1/2 the image length
  b) bound by top/bottom of lane
2) objects come at you
  a) how do they appear/generate
  b) time/interval to move left
3) objects and avatar collide
  a) test .position().top == .position().top
  b) test .position.left + width == .position().left
4) finish line arrives after so many intervals
  a) time stops when that event happens


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

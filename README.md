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

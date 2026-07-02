## AuthRouter
POST /signup
POST /login
POST /logout

## profileRouter
GET   /profile/view
PATCH /profile/update
PATCH /profile/password

## connectionRequestRouter
POST request/send/:status/id:userId
<!-- POST request/send/ignored/id:userId
POST request/send/intrested/id:userId -->

POST request/review/:status/id:requestId
<!-- POST request/review/accept/id:requestId
POST request/review/reject/id:requestId -->

## userRouter
GET user/requests/received
GET user/connections
GET user/feed ( gets you profile of other user on plateform)

/feed?page=1&limit=10 => 1-10  => skip(0) limit(10)

/feed?page=2&limit=10 => 11-20 => skip(10) limit(10)

/feed?page=3&limit=10 => 21-30 => skip(20) limit(10)

/feed?page=4&limit=10 => 31-40 => skip(30) limit(10)

<!-- .skip()
.limit() -->

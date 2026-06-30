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


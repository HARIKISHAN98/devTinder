const express = require('express');

const app = express();

app.get("/user/:userid/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({firstName: 'Hunny', lastName: 'Mittal'});
}); 
 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

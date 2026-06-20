const adminAuth = (req, res, next) => {
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  if(!isAdminAuthorized){
    console.log("Unauthorized Request from admin");
    res.status(403).send("Unauthorized Request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isUserAuthorized = token === "xyz";
    if(!isUserAuthorized){  
       console.log("Unauthorized Request from user");
       res.status(403).send("Unauthorized Request");
    } else {
       next();
    }   
};

module.exports = { adminAuth, userAuth };

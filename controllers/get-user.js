const User = require('../models/user');

module.exports = async (req, res) => {
  const { login } = req.params;
  console.log(login)
  const user = await User.findOne({ login })

  if(user){
     res.json(user)
  } else{
       return res.json({success: false, msg: 'User not found'});
  }

 /* User.getUser(login, (err, user) => {
   
  
 });
});
  await User.findOne(query, callback); */
};

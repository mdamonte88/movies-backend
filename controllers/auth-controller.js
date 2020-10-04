var authModel = require("../models/user"),
	errors = require("../middlewares/errors"),
    ControllerAuth = function () {};


ControllerAuth.add = async (req, res, next) =>
{
        var user = new authModel({
            user_id:0,
            username:req.body.email,
            email:req.body.email,
            password:req.body.password,
            name: req.body.name,
            gender: req.body.gender
        });
        
        user.save()
            .then((userAdded, err) => {
                if(err)
                {
                    var locals = {
                        title:"Error al agregar el registro con name: " + userAdded.name,
                        description:"Error de Sintaxis SQL",
                        error:err
                    }
            
                    res.send({ error: locals});
                }
        
                res.send(userAdded)
            })
            .catch((e) => {
                if(e.name === 'MongoError' && e.code === 11000) {
                    res.send({ message: 'duplicate key error', keyValue: e.keyValue, status: 500})
                }
            });
}

ControllerAuth.login = async (req, res, next) =>
{
    try {
        const { username, email, password } = req.body;

        console.log(user);
        
        const user = await authModel.findOne({username: username})

        req.session.username = (user!=null)? user.username: null;
        console.log(req.session,"---",user);


        const payload = {
            user: {
                id: user.id
            }
        };
    
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
    
                //async email
                const url = `http://mok.co.il/confirmation/${token}`;
    
                const design = `<div>
                                <h3 style='color:red;'>ברוכים הבאים לאתר M.o.K </h3>
                            </div>`;
    
                const reciver = user.email;
                SES.sendingEmail(reciver, design);
                res.json({ token });
            }
        );

        return (req.session.username) ? res.send({ login: 'ok' }) : errors.http401(req, res, next);
    } catch (err) {
        res.send({ message: "Server error", status: 500 });
    }
}

ControllerAuth.logout = async (req, res, next) =>
{
    try {
        req.session.destroy(function (err){
            return (err)
                ?errors.http500(req, res, next)
                :res.send({ logout: 'ok' });
        });
    } catch (err) {
        res.send({ message: "Server error", status: 500 });
    }
}


module.exports = ControllerAuth;
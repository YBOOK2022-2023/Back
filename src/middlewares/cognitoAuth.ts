import { CognitoJwtVerifier } from "aws-jwt-verify";
import { RequestHandler } from "express";

const cognitoAuth: RequestHandler =  async (req, res, next) =>{
    var reqUserPoolId = process.env.userPoolId;
    var reqClientId = process.env.clientId;
    var tokenHeader = req.headers['authorization'];
    if(!reqUserPoolId){
        throw new Error('missing user pool ID')
    }
    else if(!reqClientId){
        throw new Error('missing client ID')
    }
    else if(!tokenHeader){
        throw new Error('missing token')
    }

    var token = tokenHeader.split(' ')[1];
    const verifier = CognitoJwtVerifier.create({
    userPoolId: reqUserPoolId,
    tokenUse: "id",
    clientId: reqClientId,  
    });
  try {
    const payload =  await verifier.verify(
      token
    );
    res.locals.user = payload;
    next();
  } catch(err: any) {
   res.send(err.message)
  }
}

export default cognitoAuth;
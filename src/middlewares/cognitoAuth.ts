import { CognitoJwtVerifier } from "aws-jwt-verify";
import { RequestHandler } from "express";

const cognitoAuth: RequestHandler =  async (req, res, next) =>{
    var reqUserPoolId = process.env.userPoolId;
    var reqClientId = process.env.clientId;
    var token = req.headers['authorization'];
    if(!reqUserPoolId){
        throw new Error('missing user pool ID')
    }
    else if(!reqClientId){
        throw new Error('missing client ID')
    }
    else if(!token){
        throw new Error('missing token')
    }
    const verifier = CognitoJwtVerifier.create({
    userPoolId: reqUserPoolId,
    tokenUse: "access",
    clientId: reqClientId,  
    });

  try {
    const payload =  await verifier.verify(
      token // the JWT as string
    );
    res.json(payload);
  } catch(err: any) {
   res.send(err.message)
  }
}

export default cognitoAuth;
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { RequestHandler } from "express";

export type TokenRouteParams = {
    userPoolId: string,
    clientId: string
}

const checkToken: RequestHandler<TokenRouteParams> =  async (req, res, next) =>{
    var reqUserPoolId = req.params.userPoolId;
    var reqClientId = req.params.clientId;
    if(!reqUserPoolId){
        throw new Error('missing user pool ID')
    }
    else if(!reqClientId){
        throw new Error('missing client ID')
    }
    const verifier = CognitoJwtVerifier.create({
    userPoolId: reqUserPoolId,
    tokenUse: "access",
    clientId: reqClientId,  
    });

  try {
    const payload =  await verifier.verify(
      "eyJraWQeyJhdF9oYXNoIjoidk..." // the JWT as string
    );
    res.json(payload);
  } catch(err: any) {
   res.send(err.message)
  }
}

export default checkToken;
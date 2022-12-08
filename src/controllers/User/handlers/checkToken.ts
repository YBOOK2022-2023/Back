import { CognitoJwtVerifier } from "aws-jwt-verify";
import { RequestHandler } from "express";

export type TokenRouteParams = {
    userPoolId: string,
    clientId: string
}

const checkToken: RequestHandler<TokenRouteParams> = (req, res, next) =>{
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
    const payload = async() => await verifier.verify(
      "njnjkhjyh" // the JWT as string
    );
    console.log("Token is valid. Payload:", payload);
  } catch {
    console.log("Token not valid!");
  }
}

export default checkToken;
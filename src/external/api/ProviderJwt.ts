import jwt from 'jsonwebtoken'

export default class ProviderJwt {
  constructor(private secret: string) {}

  generate(payload:string | object): string{
    return jwt.sign(payload, this.secret,{
      expiresIn: '1d'
    })
  }

  verify(token: string): string | object {
    return jwt.verify(token, this.secret)
  }
}
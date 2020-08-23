import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { BnetProfile } from './bnet-profile.interface'

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy, 'jwt') { 
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    // injects into request for any handler that is guarded by this strategy
    async validate(payload: BnetProfile) { 
        return payload
    }
}
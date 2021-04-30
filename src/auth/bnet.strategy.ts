/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-bnet'
import { AuthService } from "./auth.service";
import { BnetProfile } from "./bnet-profile.interface";

@Injectable()
export class BnetStrategy extends PassportStrategy(Strategy, 'bnet') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.BNET_CLIENT_ID,
            clientSecret: process.env.BNET_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/bnet/callback',
            grant_type: "authorization_code",
            scope: 'wow.profile',
            region: 'us',
        })
    }
    async validate(accessToken, refreshToken, profile: BnetProfile, done: Function) {
        console.log(profile)
        console.log(accessToken)
        try {
            const payload = { battleTag: profile.battletag, token: profile.token }
            const token = await this.authService.validateOAuthLogin(payload)
            const user = { token }
            done(null, user)
        } catch (err) {
            done(err, false)
        }
    }
}
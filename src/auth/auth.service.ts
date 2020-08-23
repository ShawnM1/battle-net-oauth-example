import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async validateOAuthLogin(payload: any): Promise<string> {
        const jwt = await this.jwtService.sign(payload)
        return jwt
    }
}

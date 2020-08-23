import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { JwtService } from '@nestjs/jwt'

const mockJwtService = () => ({
    sign: jest.fn()
})

describe('AuthService', () => {
    let authService: AuthService
    let jwtService
    
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthService, { provide: JwtService, useFactory: mockJwtService}]
        }).compile()

        authService = module.get<AuthService>(AuthService)
        jwtService = module.get<JwtService>(JwtService)
    })

    describe('validateOAuthLogin', () => {
        it('should call the JwtService and return a jwt', async () => {
            jwtService.sign.mockResolvedValue('token123')
            const result = await authService.validateOAuthLogin('test')
            
            expect(result).toBeDefined()
            expect(jwtService.sign).toHaveBeenCalledWith('test')
        })
    })
})
import { Test } from "@nestjs/testing"
import { BnetStrategy } from "./bnet.strategy"
import { AuthService } from "./auth.service"
import { BnetProfile } from "./bnet-profile.interface"

import * as dotenv from 'dotenv';

// loading .env file
dotenv.config();

const mockAuthService = {
    validateOAuthLogin: jest.fn()
}
const mockBnetProfile: BnetProfile = {
    id: 1,
    battletag: 'soup#123',
    token: 'abc123'
}
describe('BnetStrategy', () => {
    let bnetStrategy: BnetStrategy

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BnetStrategy, { provide: AuthService, useValue: mockAuthService}]
        }).compile()
        bnetStrategy = module.get<BnetStrategy>(BnetStrategy)
    })
    it('should be defined', () => {
        expect(bnetStrategy).toBeDefined()
    })
    describe('validate', () => {
        it('should call the auth service to create a jwt', async () => {
            bnetStrategy.validate('123', '123', mockBnetProfile, jest.fn().mockImplementation(() => undefined))
            expect(mockAuthService.validateOAuthLogin).toHaveBeenCalled()
        })
    })

})
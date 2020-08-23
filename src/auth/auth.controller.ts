import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiOAuth2 } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    @Get('bnet')
    @UseGuards(AuthGuard('bnet'))
    @ApiOperation({ summary: 'Starts the bnet OAuth2 login flow' })

    bnetLogin() {
        // initiates the bnet OAuth2 login flow
    }

    @Get('bnet/callback')
    @UseGuards(AuthGuard('bnet'))
    @ApiOperation({ summary: 'Callback from bnet provider. Returns a JWT' })
    bnetLoginCallback(@Req() request) {
        const jwt = request.user.token
        return jwt
    }
}

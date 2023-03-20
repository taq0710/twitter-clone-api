import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

export class IndexResponse {
  @ApiProperty({
    description: 'greeting message',
  })
  data: string;
}

@Controller('')
export class IndexController {
  @Get('/')
  @ApiOperation({
    summary: 'Index route',
    operationId: 'hi',
  })
  @ApiResponse({
    status: 200,
    description: 'return greeting message',
    type: IndexResponse,
  })
  greeting(): string {
    console.log('aaaaaaa');
    return 'Hi, there!';
  }
}

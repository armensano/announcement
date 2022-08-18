import { ApiProperty } from '@nestjs/swagger';

export class MessageToUser {
  @ApiProperty()
  message: string;
}

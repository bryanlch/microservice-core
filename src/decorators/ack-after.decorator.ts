// decorators/ack-after.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ACK_AFTER_KEY = 'ACK_AFTER';

export const AckAfter = () => SetMetadata(ACK_AFTER_KEY, true);

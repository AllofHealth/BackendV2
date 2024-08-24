import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty, IsString } from 'class-validator';

@Configuration()
export class AuthConfiguration {
  @IsNotEmpty()
  @IsString()
  @Value('MONGODB_URI')
  MONGO_URI: string;

  @IsNotEmpty()
  @IsString()
  @Value('POSTMARK_SERVER_TOKEN')
  SERVER_TOKEN: string;

  @IsNotEmpty()
  @IsString()
  @Value('ENCRYPTION_KEY')
  ENCRYPTION_KEY: string;
}

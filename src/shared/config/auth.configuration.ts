import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class AuthConfiguration {
  @Value('MONGODB_URI')
  MONGO_URI: string;

  @Value('POSTMARK_SERVER_TOKEN')
  SERVER_TOKEN: string;
}

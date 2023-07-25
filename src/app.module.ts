import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TracksModule } from './modules/tracks/tracks.module';
@Module({
  imports: [UsersModule, TracksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

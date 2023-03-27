import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LoanService } from './loan/loan.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [LoanService],
})
export class AppModule {}

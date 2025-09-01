import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-clients/jobber-auth'; //**NOTE *//

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{

  async onModuleInit() {
      await this.$connect()
  }

}

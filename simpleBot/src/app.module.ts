import { Logger, Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { OrderModule } from "./order/order.module";
import { CustomerModule } from "./customer/customer.module";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "../data.sqlite",
      logging: false,
      entities: [path.join(__dirname, "/**/*.entity.*")],
      synchronize: true,
      logger: "debug",
    }),
    EventEmitterModule.forRoot(),
    OrderModule,
    CustomerModule,

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "chrome"),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

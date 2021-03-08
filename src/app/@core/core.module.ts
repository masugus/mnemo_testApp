import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from './authentication/auth.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
  ],
  providers: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${String(parentModule)}
             has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}

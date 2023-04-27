import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppTopbarComponent } from './layout/app.topbar.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { MenuModule } from 'primeng/menu';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpInterceptorService } from './shared/http-interceptor.service';
import { MenuBarComponent } from './layout/menu-bar.component';
import { SettingsComponent } from './layout/settings.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppTopbarComponent,
    PageNotFoundComponent,
    MenuBarComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    MenuModule,
    PdfViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
          text: () => import('highlight.js/lib/languages/plaintext')
        },
        themePath: 'assets/panda-syntax-light.css'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

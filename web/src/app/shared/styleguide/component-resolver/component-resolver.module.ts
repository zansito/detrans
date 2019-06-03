import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentResolverComponent } from './component-resolver.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComponentResolverComponent],
  exports: [ComponentResolverComponent]
})
export class ComponentResolverModule { }

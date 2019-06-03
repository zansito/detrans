import { Component, OnInit,
  ViewChild, ViewContainerRef, Input,
  ComponentFactoryResolver, ReflectiveInjector
} from '@angular/core';

import { Subscription, Observable } from "rxjs";

@Component({
  selector: 'app-component-resolver',
  template: `<div #_componentWrapper></div>`
})
export class ComponentResolverComponent {

  currentComponent = null;

  private __subscriptions: Subscription[] = [];

  @ViewChild('_componentWrapper', { read: ViewContainerRef })
  _componentWrapper: ViewContainerRef;

  @Input('options') options;

  private subscriptions

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnChanges() {
    this.__resolve(this.options);
  }

  private __resolve(data: any) {

    if (!data)
      return;

    let componentWrapper = this._componentWrapper;

    const inputProviders = Object.keys(data.inputs).map(
      inputName => {
        return {
          provide: inputName,
          useValue: data.inputs[inputName]
        };
    });

    const resolvedInputs = ReflectiveInjector.resolve(inputProviders),
          injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs,
            componentWrapper.parentInjector),
          factory = this.resolver.resolveComponentFactory(data.component),
          component = factory.create(injector);

    Object.keys(data.outputs).forEach(output => {
      let out = data.outputs[output];
      this.__subscribe(
        component.instance[output],
        out.context,
        out.command,
      )
    });

    Object.keys(data.inputs).forEach(input => {
      component.instance[input] = data.inputs[input];
    });

    componentWrapper.insert(component.hostView);

    if (this.currentComponent)
      this.currentComponent.destroy();

    this.currentComponent = component;
  }

  private __subscribe(observable: Observable<any>,
    ctx: any, fn: string,
    err: Function = (e)=>e) {

    let subscription = observable.subscribe(
      res => ctx[fn].call(ctx, res),
      e => err(e)
    );

    this.__subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.__unsubscribe();
  }

  private __unsubscribe() {
    this.__subscriptions.forEach(s => s.unsubscribe());
  }
}

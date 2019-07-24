import { Component, OnInit, ViewContainerRef, ViewRef, ComponentFactoryResolver, Injector, ViewChild, AfterViewInit } from '@angular/core';
import { ComponentAComponent } from '../component-a/component-a.component';
import { ComponentBComponent } from '../component-b/component-b.component';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {
  private views = new Map<number, ViewRef>();
  private currentIndex = 1;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private sharedServiceService: SharedServiceService) { }

  @ViewChild('containerRef', { read: ViewContainerRef })
  containerRef: ViewContainerRef;

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const factory1 = this.componentFactoryResolver.resolveComponentFactory(ComponentAComponent);
    const componentA = factory1.create(this.containerRef.injector);
    this.views.set(1, componentA.hostView);

    const factory2 = this.componentFactoryResolver.resolveComponentFactory(ComponentBComponent);
    const componentB = factory2.create(this.containerRef.injector);
    this.views.set(2, componentB.hostView);
    this.currentIndex = 2;

    this.containerRef.insert(componentB.hostView);

    setTimeout(() => this.sharedServiceService.publicStore.a.value = 'a-new-value', 3000);
  }

  toggleViews(): void {
    this.containerRef.detach(0);
    const view = this.currentIndex === 1 ? this.views.get(2) : this.views.get(1);
    this.currentIndex = this.currentIndex === 1 ? 2 : 1;
    this.containerRef.insert(view);
  }

}

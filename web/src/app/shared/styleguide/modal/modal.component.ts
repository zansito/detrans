import { Component, Input,
  ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() size: string;

  @ViewChild('header') header: ElementRef;
  @ViewChild('body') body: ElementRef;
  @ViewChild('footer') footer: ElementRef;

  public hasHeader: boolean = false;
  public hasBody: boolean = false;
  public hasFooter: boolean = false;

  public visible = false;
  visibleAnimate = false;

  constructor() {}

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false);
  }

  ngAfterViewChecked() {
    this.hasHeader = !!this.header.nativeElement.children.length;
    this.hasBody = !!this.body.nativeElement.children.length;
    this.hasFooter = !!this.footer.nativeElement.children.length;
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}

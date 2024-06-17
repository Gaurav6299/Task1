import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupSettings } from "@progress/kendo-angular-dateinputs";
import {
  DateInputSize,
  DateInputRounded,
  DateInputFillMode,
} from "@progress/kendo-angular-dateinputs";
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('carouselElement') carouselElement: ElementRef | undefined;


  bsInlineValue = new Date();
  // bsInlineRangeValue: Date[];
  // maxDate = new Date();


  title = 'first';
  public value: Date = new Date(2000, 2, 10);
  public format = "MM/dd/yyyy HH:mm";
  public size: DateInputSize = "large";
  public rounded: DateInputRounded = "medium";
  public fillMode: DateInputFillMode = "solid";

  data: any = [1, 2, 3, 4];
  nextDataList: any[] = []
  isSeondBox: boolean = false;
  temp: any[] = [];
  temp1: any[] = [];

  public popupSettings: PopupSettings = {
    appendTo: "component",
    animate: false,
    popupClass: "crimson",
  };

  constructor(private spinner: NgxSpinnerService,) {
    // this.maxDate.setDate(this.maxDate.getDate() + 7);
    // this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000); // 5 seconds

    this.nextDataList = [];

  }


  selectDate() {
    console.log("value is:::", this.value)
  }

  ngAfterViewInit(): void {
    $(this.carouselElement?.nativeElement).owlCarousel({
      center: true,
      items: 2,
      loop: true,
      margin: 10,
      // nav: true,
      responsive: {
        // 0: {
        //   items: 1
        // },
        600: {
          items: 2
        },
        // 1000: {
        //   items: 3
        // }
      }
    });
  }






  findClickDataBox1(value: any, event: any) {
    if (event.target.checked) {
      this.temp1.push(value)

    }
    else {
      if(event.target.checked==false){
        var index = this.temp1.indexOf(value)
        this.temp1.splice(index, 1)
      }
    }
   
  }

  findClickDataBox2(value: any, event: any) {
   
    if (event.target.checked) {
      this.temp.push(value)

    }
    else {
      if(event.target.checked==false){
        var index = this.temp.indexOf(value)
        this.temp.splice(index, 1)
      }
    
    }

  }

  goToPrevBox() {
    this.temp.forEach((ele: any) => {
      var index = this.nextDataList.indexOf(ele)
      if (index >= 0) {
        this.nextDataList.splice(index, 1)
      }
      this.data.push(ele)
    })
    this.temp = []
  }

  /**
   * goToSecondBox
   */
  goToSecondBox() {
    this.temp1.forEach((ele: any) => {
      var index = this.data.indexOf(ele)
      if (index >= 0) {
        this.data.splice(index, 1)
        this.nextDataList.push(ele)
      }
    })
    this.temp1 = []
  }

}

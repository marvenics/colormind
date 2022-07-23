/* eslint-disable @typescript-eslint/quotes */
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Clipboard } from "@capacitor/clipboard";
import { Toast } from "@capacitor/toast";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  colorsArr: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getColors(...this.colorsArr);
  }
  getColors(c1 = "N", c2 = "N", c3 = "N", c4 = "N", c5 = "N") {
    this.http
      .post(
        "https://k8am1bcleh.execute-api.ap-northeast-2.amazonaws.com/2020-11-14/colormind",
        {
          model: "default",
          input: [...c1, ...c2, ...c3, ...c4, ...c5]
        }
      )
      .subscribe((res: any) => {
        console.log(res);
        this.colorsArr = [];
        res.forEach((element: any) => {
          this.colorsArr.push({
            rgb: element,
            hex: this.rgbToHex(element[0], element[1], element[2])
          });
        });
        // this.colorsArr = res;
      });
  }
  rgbToHex(r, g, b) {
    // eslint-disable-next-line no-bitwise
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  async writeToClipboard(text) {
    await Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string: text
    });
    this.showToast("copied");
  }
  async showToast(message) {
    await Toast.show({
      text: message
    });
  }
}

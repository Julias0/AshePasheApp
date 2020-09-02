import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// //const browser = this.iab.create('https://ionicframework.com/');
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// constructor(private iab: InAppBrowser) { }

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  domain: string;
  email: string;
  myGroup: FormGroup;

  constructor(private menuController: MenuController, private iab: InAppBrowser, private authService: AuthService, private formBuidler: FormBuilder,) {
    this.menuController.enable(false, 'navigation');

  }

  samlLogin(data) {
    console.log("/////////////////////")
    console.log(data);
    console.log(this.domain);
    //this.domain = 'data';
    //this.test(data);
    console.log(this.domain)
  }

  test() {
    setInterval(() => { // <-----
    console.log("COUNT: " + this.domain);
    this.domain = 'chumma';
    }, 1000);
  }

  setData = function (data) {
    this.domain = data;
  }

  

  samlLogic(url) {
    //var url = 'https://accounts.google.com/o/saml2/idp?idpid=C01k8rg3v&SAMLRequest=nVLfa9swEH7fXyH0kidbsstGJmIHL6E0kG5u4xa6l6LaF1dMllydnDb766e4vxiMQPcgkO6%2B%2B%2B7TdzebP3Wa7MChsiabJDGfEDC1bZRps8lVdRpNJ%2FP808wgF8Xg780lPAyAnoQygyKEMzo4I6xEFZ6yAxS%2BFpvifC3SmIveWW9rq%2BlbQXK8QCKC80EMJcXrdWENDh24DbidquHqcp3Re%2B97FIzJuraD8Rijl20QHW%2F3GmJlmLODByd7xVB2miFadkjdtta2GihZhl8oIw%2F8%2F2B7RsW17ZgdCVKmmn4ejmqyBU9%2BTV17sqNktcyoaqIGVo%2BbQt2sf19fpOqs%2FBwyiAOsTJBlfEZTnvKIf414WvEvIpmK9OQnJeWLO9%2BUGQ0%2F6szdMwjFWVWVUfljU1Fy%2FTI4GgA0D1NKxNjXkVPrOumPMx4iQfx2hAowXvk9zf%2FHWexn7L15Pq7L98C%2BWpZWq3pPCq3t48KB9JDRrdQYJvBxid5JgyoIpYTlh45%2FL2X%2BBw%3D%3D'
    //var url = 'https://accounts.google.com/o/saml2/idp?idpid=C01k8rg3v&SAMLRequest=nVJRT9swEH7fr7D80qfESQCJWU2qrBWigrGKBibxgjzXCRaOL%2FPZhf77uYGBkFCl7cGSfffdd5%2B%2Fu%2BnsuTdkqxxqsOUkT7MJUVbCRtuunNw0Z8npZFZ9mVrMeB38g71Wv4NCT2KZRR7DJQ3OchCo41P0CrmXfF1%2Fv%2BRFmvHBgQcJhr4V5IcLBKJyPoqhpP57nYPF0Cu3Vm6rpbq5vizpg%2FcDcsaElBCsxxS96KLotN0ZlWrLHASvnBg0Q9Ebhghsn7rvADqjKFnEX2gr9vyfsL2gUgk9g5GgYHozzOLRm3Ke5Y%2BnrjvaUrJclFRvEtk%2BL4rmog64u%2Fi5fmxDzCAGtbRRlvUlLbIiS7KvSZY3ec5Pjnl%2BckfJ6tWdb9qOhh905tcLCPl506yS1Y91Q8nt6%2BBoBNAqTinnY19HzsD1wh9m3Eei%2BHaEcmW99jta%2FY%2BzOEzZe%2FNqXJeryL5crMBouSO1MfA0d0p4VdJWGIwT%2BHeJ3gmLOgqlhFX7jh%2BXsvoD&RelayState=MOBILE';
    url += '&RelayState=MOBILE';
    const browser = this.iab.create(url, '_blank', 'location=yes');
    this.domain = 'xyz';
    browser.on('loadstop').subscribe(event => {
      //console.log(this.domain);
      this.domain = 'def';
      var getResponse = setInterval(() =>{
        // setInterval(() =>{
        //console.log(this.domain);
        browser.executeScript({
          code: 'try{document.getElementById("fyle-login-response").innerHTML;}catch(err){}'
        //}).then(function (responseData) {
        }).then((responseData) => {
          //console.log(this.domain);
          this.domain = 'ghi';
          var response = responseData && responseData[0];
          var data = '';

          try {
            data = JSON.parse(response);
          } catch (err) {
          }
          if (data) {
            //clearInterval(getResponse);
            browser.close();
            console.log(data['refresh_token']);
            this.domain = data['cluster_domain'];
            console.log(this.domain);
            //return data['cluster_domain'];
          }
        });
      }, 1000);
    });

    // browser.on('exit').subscribe(event => {
    //   console.log("-------exited-------");
    // })

  }

  saml() {
    //console.log(this.myGroup.value.email);
    this.authService.checkEmailExists(this.myGroup.value.email).then(res => {
      console.log(res);
      if (res && res.idp_url) {
        this.samlLogic(res.idp_url)
      }
    })
  }

  ngOnInit() { 
    this.domain = 'blank domain';
    this.myGroup = this.formBuidler.group({
      email: ['', Validators.required]
    });

    // this.myGroup = new FormGroup({
    //    firstName: new FormControl()
    // });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  submitForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phoneCountry: ['France', Validators.required],
    phone: ['+33 ', Validators.required],
    message: ['', Validators.required],
    language: ['English'],
    promoCode: [''],
  });

  preferredLanguage =  ["English", "Français"];
  phoneCountry = ["France", "US", "UK"]

  boxs = [
    {
      logo: "/assets/fr.png",
      title: "Join our French Discord group",
      subtitle: null,
      link: "https://www.google.com/"
    },
    {
      logo: "/assets/uksvg.png",
      title: "Join our English Discord group",
      subtitle: null,
      link: "https://www.google.com/"
    },
    {
      logo: "/assets/discord-black.png",
      title: "Join our PRIVATE Discord group",
      subtitle: "Available on invitation only.",
      link: "https://www.google.com/"
    },
  ]


  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) {

  }

  ngOnInit(): void {
  }

  submitResponses() {
    console.log(this.submitForm.value);
    this.firebaseService.postToFirestore(this.submitForm.value).then((response) => {
      console.log("okok", response);
      this.initForm();
    })
  }

  initForm() {
    this.submitForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneCountry: ['France', Validators.required],
      phone: ['+33 ', Validators.required],
      message: ['', Validators.required],
      language: ['English'],
      promoCode: [''],
    });
  }

  openLink(link: string) {
    window.open(link, '_blank')
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.scss'
})
export class WhatsappComponent {

  redirectToWhatsApp() {
    const phoneNumber = '01552666657'; // Replace with the actual phone number
    const message = 'Hello! I would like to inquire about...'; // Replace with the desired message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }


}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationRequest, ReservationService, Reservation } from './reservation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string = 'reservation-app';
  rooms: Room[];
  roomSearchForm: FormGroup;

  currentCheckInVal: string;
  currentCheckOutVal: string;
  currentPrice: number;
  currentRoomNumber: number;
  allReservations: Reservation[];

  constructor (private reservationSvc: ReservationService) {}

  ngOnInit() {
    this.roomSearchForm = new FormGroup({
      checkIn: new FormControl(''),
      checkOut: new FormControl(''),
      roomNumber: new FormControl('')
    });

    this.rooms = [
      new Room("127", "127", "150"),
      new Room("138", "138", "180"),
      new Room("254", "254", "200")
    ];

    this.roomSearchForm.valueChanges.subscribe(form => {
      this.currentCheckInVal = form.checkIn;
      this.currentCheckOutVal = form.checkOut;

      if (form.roomNumber) {
        const roomValues: string[] = form.roomNumber.split('|');
        this.currentRoomNumber = Number(roomValues[0]);
        this.currentPrice = Number(roomValues[1]);
      }
    });
    this.getAllReservations();
  }

  getAllReservations() {
    this.reservationSvc.getAllReservations().subscribe(res => {
      if (!res) return;
      this.allReservations = res;
    });
  }

  createReservation(): void {
    if (!this.currentRoomNumber || !this.currentCheckInVal ||
      !this.currentCheckOutVal || !this.currentPrice) { return }

    this.reservationSvc.createReservation(
      new ReservationRequest(
        this.currentRoomNumber, this.currentCheckInVal,
        this.currentCheckOutVal, this.currentPrice
    )).subscribe(postResult => {
      console.log('Post Results: ', postResult);
      this.getAllReservations();
    })
  }
}

export class Room {
  id: string;
  roomNumber: string;
  price: string;

  constructor (@Inject(String) id: string, @Inject(String) roomNumber: string, @Inject(String) price: string) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.price = price;
  }
}

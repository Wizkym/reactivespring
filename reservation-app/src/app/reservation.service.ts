import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baserUrl: string = 'http://localhost:8080';
  private reservationUrl: string = this.baserUrl + '/room/v1/reservation/';

  constructor(private http: HttpClient) {}

  createReservation(body: ReservationRequest): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Reservation>(this.reservationUrl, body, httpOptions);
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationUrl);
  }
}

export class ReservationRequest {
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  price: number;

  constructor (
    @Inject(Number) roomNumber: number,
    @Inject(String) checkIn: string,
    @Inject(String) checkOut: string,
    @Inject(Number) price: number) {

      this.roomNumber = roomNumber;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.price = price;
  }
}

export interface Reservation {
  id: string;
  checkIn: string;
  checkOut: string;
  roomNumber: string;
  price: number;
}

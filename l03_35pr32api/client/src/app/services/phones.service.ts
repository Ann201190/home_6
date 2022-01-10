
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/index'
import { Phone } from '../models/phone'
@Injectable({
  providedIn: 'root'
})
export class PhonesService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Phone[]> {
    return this.http.get<Phone[]>('/api/phone')
  }

  getById(id: string): Observable<Phone> {
    return this.http.get<Phone>(`/api/phone/${id}`)
  }

  update(id: string, phone: Phone): Observable<Phone> {

    return this.http.patch<Phone>(`/api/phone/${id}`,
      {
        typePhone: phone.typePhone,
        vendor: phone.vendor,
        model: phone.model,
        price: phone.price,
        img: phone.img,
        count: phone.count,
        vendorEmail: phone.vendorEmail,
        description: phone.description
      })
  }


  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/phone/${id}`)
  }


  create(phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(`/api/phone/`, phone)
  }




}


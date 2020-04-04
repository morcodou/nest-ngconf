import { Injectable } from '@angular/core';
import { Mission } from '../../../shared/models/mission.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  private readonly url = 'http://localhost:3000/missions/';
  constructor(private httpClient: HttpClient) { }

  getMissions() {
    return this.httpClient
      .get<{ data: Mission[] }>(this.url)
      .pipe(map(response => response.data));
  }

  getMissionById(id: number) {
    return this.httpClient
      .get<{ data: Mission }>(`${this.url}${id}`)
      .pipe(map(response => response.data));
  }
}

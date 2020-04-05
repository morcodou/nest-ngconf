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

  createMission(mission: Mission) {
    return this.httpClient
      .post<Mission>(this.url, mission)
      .toPromise()
      .catch(this.handleError);
  }

  updateMission(mission: Mission) {
    return this.httpClient
      .put<Mission>(`${this.url}${mission.id}`, mission)
      .toPromise()
      .catch(this.handleError);
  }

  deleteMission(mission: Mission) {
    return this.httpClient
      .delete<Mission>(`${this.url}${mission.id}`)
      .toPromise()
      .catch(this.handleError);
  }

  handleError(response: any) {
    const { error } = response;
    if (error.statusCode === 400) {
      let message = '';
      error.message.forEach((msg: any) => {
        const keys = Object.keys(msg.constraints);
        keys.forEach(k => {
          message += msg.constraints[k] + '<br/ >';
        });
      });
      throw { message };
    }
    throw  error;
  }
}

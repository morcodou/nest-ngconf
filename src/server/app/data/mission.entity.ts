import { Exclude } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  Min
} from 'class-validator';
import { Mission } from '../../../shared/models/mission.model';
import { isNumber } from 'util';

export class MissionEntity implements Mission {
  id?: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsNumber()
  @Min(0)
  reward: number;

  @IsDefined()
  @IsBoolean()
  active: boolean;

  @Exclude()
  createdAt = new Date();

  @Exclude()
  createdBy = 'user';
}

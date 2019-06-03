import { Accredited } from '../../accredited/domain/accredited.model';
import { ActionEnum } from '../../accredited/domain/action.enum';

export class Credential {
   id: number;
   expireDate: string;
   emissionDate: string;
   register: number;
   documentNumber: number;
   accredited: Accredited;
   action: ActionEnum;
   lastchangeId: number;
}

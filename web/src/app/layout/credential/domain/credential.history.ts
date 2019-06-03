import { ActionEnum } from 'app/layout/accredited/domain/action.enum';

export class CredentialHistory {
         id: number;
         expireDate: string;
         emissionDate: string;
         register: number;
         documentNumber: number;
         accredited_id: number;
         action: ActionEnum;
         changedat: Date;
         credential_id: number;
         lastchange_id: number;
       }

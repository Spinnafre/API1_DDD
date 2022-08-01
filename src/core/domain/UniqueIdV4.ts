import {v4 as uuid4} from 'uuid'
import { Identifier } from './Identifier';


export class UniqueIdv4 extends Identifier<string>{
    
    constructor(id?:string){
        super(id ? id : uuid4())
    }
}
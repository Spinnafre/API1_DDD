import {v5 as uuid5} from 'uuid'

import { Identifier } from './Identifier';

export class UniqueIdV5 extends Identifier<string>{
    constructor(id?:string){
        super(id?id:uuid5.toString())
    }
}
import { AssignUserName } from './AssignUserName';

import {userRepo} from '../../repos'

const assignInitialUserName=new AssignUserName(userRepo)

export {
    assignInitialUserName
}
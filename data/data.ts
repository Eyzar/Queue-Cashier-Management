import { atom } from "jotai";

const dataListAtom = atom<string[][]>([
    ['Prine' , 'Seile'] ,
    ['Linnon' , 'Pon' , 'Cliff'] , 
    ['Mourin']
]);

export default dataListAtom;
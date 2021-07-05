import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

     

  transform(items: any[], term: string): any {​​​​​​​​
  // I am unsure what id is here. did you mean title?
   term=term.toUpperCase();
  if(term.length > 0)
  return items.filter(item=>item.userName.toUpperCase().indexOf(term) !== -1);
  else
  return [];
  }​​​​​​​​
  
  

}

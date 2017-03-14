import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { IconModel } from './icons.model';

@Injectable()
export class IconsService {

   constructor(private http: Http) { }

   getIconList(): Observable<IconModel[]> {
      return this.http.get(location.pathname + 'assets/theme-stratio.css')
         .map(response => response.text())
         .map(text => this.getIconClasses(text));
   }

   private getIconClasses(text: string): IconModel[] {
      let result: IconModel[] = [];
      let execResult: RegExpExecArray;
      let regex = /.icon-(.*?)\:before {[\n].*?content: \"(.*?)"/gm;

      do {
         execResult = regex.exec(text);
         if (execResult) {
            result.push({
             name: execResult[1] || '',
             key: execResult[2] || ''
            });
         }
      } while (execResult);
      return result;
   }
}

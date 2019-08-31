import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { dateFormat } from './dateformat.js';

class DateFormatter extends PolymerElement {
  static get template() {
    return html`
      <time id="time" datetime$="{{datetime}}" format$="{{format}}">{{output}}</time>
    `;
  }

  static get properties() {
    return {
        target: {
            type: Object
          },
          format: {
            type: String
          },
          datetime: {
            type: String
          },
          output: {
            type: String,
            computed: 'refresh(datetime, format)'
          }
      }
  }   

  refresh(date_time, format_str) {
    return dateFormat(date_time, format_str);
  }

}

window.customElements.define('date-formatter', DateFormatter);

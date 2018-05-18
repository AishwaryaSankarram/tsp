import React, {Component} from 'react';

export class SignalImage extends Component {
  
    getDirection(){
    let rt =  <g id="rt-arrow" transform="translate(-140,0)">
               <path xmlns="http://www.w3.org/2000/svg" d="M329.115722,122.581149 L342.144662,122.598079 L342.294273,57.6194484 C343.313796,50.5354558 352.006619,41.4888718 358.221548,41.4466859 L372.286164,41.4466859 L368.722078,50.1721905 C367.279598,53.6351985 369.014477,57.5550742 375.362194,53.9677161 L409,34.7755985 L375.09686,15.3350779 C368.726626,11.6354613 366.594426,16.4680213 368.984506,19.6244773 L373.815708,28.0226711 L357.16893,28.0396016 C346.14987,28.095465 329.471372,38.7895961 329,54.7269401 L329.115722,122.581149 Z" id="path3832" fill="#3B3B3B"/>
            </g>;
   let st = <g id="st-arrow">
                <path d="M208.910129,123 L221.951741,123 L221.761355,42.0000025 L230.709613,45.7058814 C234.386981,46.9610382 237.334907,45.1791462 235.374126,41.5462168 L215.859309,15 L196.915657,41.2436987 C194.144445,45.8815909 198.216829,46.455083 201.770563,45.4033632 L208.910129,42.2268932 L208.910129,123 Z" id="path3830" fill="#3B3B3B"/>
		</g>;         
    return this.props.arrow ? st : rt;
  }  
  render(){
  return (
   <svg xmlns="http://www.w3.org/2000/svg" width="250px" height="153px" viewBox="0 0 480 700" version="1.1">
   <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="signal-details-(1)" transform="translate(0,125)">
         <g id="signal-label" transform="translate(160, -151)">
            <rect id="Rectangle" fill="#E5E5E5" fillRule="nonzero" x="0" y="18" width="135" height="100"/>
            <g id="A" transform="translate(0.00, -35)" fill="#3B3B3B" fontFamily="Arial-BoldMT, Arial" fontSize="80">
               <text>
                  <tspan x="0" y="136">562</tspan>
               </text>
            </g>
         </g>
         <g fillRule="nonzero" transform="translate(239.702420, 80.860168) rotate(90.000000) translate(-239.702420, -115.860168) translate(124.702420, -123.639832)" id="Group">
            <path d="M115,0 C51.4917183,0 1.42108547e-14,32.7239344 1.42108547e-14,73.0911475 L1.42108547e-14,405.593443 C1.42108547e-14,445.960656 51.4917183,478.68459 115,478.68459 C178.508282,478.68459 230,445.960656 230,405.593443 L230,73.0911475 C230,32.7239344 178.508282,0 115,0 Z" id="Shape" fill="#E5E5E5"/>
            <path d="M115,13 C59.7747472,13 15,43.9311475 15,82.0872131 L15,396.36918 C15,434.525246 59.7747472,465.456393 115,465.456393 C170.225253,465.456393 215,434.525246 215,396.36918 L215,82.0872131 C215,43.9311475 170.225253,13 115,13 Z" id="Shape" fill="#3B3B3B"/>
            <circle id="red-s" fill="#EA4949" cx="117.393443" cy="373.393443" r="56.3934426"/>
            <circle id="yellow-s" fill="#EAB42D" cx="117.393443" cy="242.393443" r="56.3934426"/>
            <circle id="green-s" fill="#2BBF60" cx="118.393443" cy="111.606557" r="56.3934426"/>
         </g>
         <g id="signal-timer" transform="translate(24.000000, 200.000000)">
            <rect id="Rectangle" fill="#E5E5E5" fillRule="nonzero" x="294" y="1" width="135" height="125"/>
            <g id="28" transform="translate(296.000000, 0.000000)" fill="#3B3B3B" fontFamily="Arial-BoldMT, Arial" fontSize="120" fontWeight="bold">
               <text>
                  <tspan x="0" y="109">28</tspan>
               </text>
            </g>
            <rect id="Rectangle" fill="#E5E5E5" fillRule="nonzero" x="147" y="1" width="135" height="125"/>
            <g id="28" transform="translate(149.000000, 0.000000)" fill="#3B3B3B" fontFamily="Arial-BoldMT, Arial" fontSize="120" fontWeight="bold">
               <text>
                  <tspan x="0" y="109">28</tspan>
               </text>
            </g>
            <rect id="Rectangle" fill="#E5E5E5" fillRule="nonzero" x="0" y="1" width="135" height="125"/>
            <g id="28" transform="translate(3.000000, 0.000000)" fill="#3B3B3B" fontFamily="Arial-BoldMT, Arial" fontSize="120" fontWeight="bold">
               <text>
                  <tspan x="0" y="109">28</tspan>
               </text>
            </g>
         </g>
         <g id="signal-direction" transform="translate(25.000000, 325)" fillRule="nonzero">
            <circle id="center-d" fill="#E5E5E5" cx="215.5" cy="71.5" r="71.5"/>
            {this.getDirection()}
         </g>
      </g>
   </g>
</svg>
  )
}
}

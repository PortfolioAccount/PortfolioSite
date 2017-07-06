import React from 'react';

export default class ScillsInfo extends React.Component {
    render() {
        return (
    
    
       <div className="col-md-3 menu-r infoblock" > 
    <h4 className="scills"> Примененные навыки:</h4>
    <div>   
    <div className="second-scills"> <img className="icon1 " src="/Pictures/react-icon.png" /></div>
    <div>
    <div><div className="block-icon"> <img className="icon2" src="/Pictures/html_icon.png" /></div>
    <div className="block-icon"><img className="icon3" src="/Pictures/css-icon.png" /></div></div>
    </div>

     <div><div className="block-icon"> <img className="icon4" src="/Pictures/Node-js.png" /></div>
    <div className="block-icon"> <img className="icon5" src="/Pictures/icon-js.png" /></div>
      </div>

     <div><div className="block-icon"><img className="icon7" src="/Pictures/c-icon.png" /></div>
     <div className="block-icon"> <img className="icon6" src="/Pictures/Bootstrap.png" /></div>
    </div>
   
     <div className="second-scills"> <img className="icon8" src="/Pictures/webpack.png" /> </div>

    <div className="second-scills"><img className="icon9" src="/Pictures/logo_mvc.png" /></div>
    </div>
        </div>
               
  
   
    
    )
        }
}
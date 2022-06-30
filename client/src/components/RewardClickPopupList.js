import React from "react";
import PopupDict from "./RewardPopupDict";

class PopupList extends React.Component{
    render(){
        return (
            <div>
                {
                    PopupDict.map(function (info){
                        console.log(info);
                        return 
                    })
                }
            </div>

        );
    }
}
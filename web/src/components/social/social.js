import * as styles from "./campaign-social.css";
import React from "react";
import { urlFor } from "../../lib/image-url";

function campaignSocial(props) {
  return (
    <div className="cw_footer cw_text_center campaign-component" data-componentname="socialChannel" data-component-experience-variant="default" data-component-variants="defaultView">
        <ul className="cw_footer_socialIcon">
            {props.socialChannel && props.socialChannel.map((social, i) => (
              <li key={i}>
                    {social.channelIcon == undefined || social.channelIcon.asset == undefined ? (
      <a className={`${social.channelName} social_button`} href={social.channelUrl} target="_blank" title={`${social.channelIcon !=undefined? social.channelIcon.alt : social.channelName} - Link open in new window`}>{social.channelName} - Link open in new window</a>
      ) : (
        <a className="social_button" href={social.channelUrl} target="_blank" title={`${social.channelIcon !=undefined? social.channelIcon.alt : social.channelName} - Link open in new window `}> <img
        src={urlFor(social.channelIcon)
          .width(30)
          .url()} width="30" alt={social.channelName} /></a>
      )
      }
         </li>
            ))}
        </ul>
    </div>
  );
}



export default campaignSocial;

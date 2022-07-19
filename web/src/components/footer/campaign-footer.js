import "./campaign-footer.css";
import React from "react";
import { ReactComponent as UnileverLogo } from '../../images/svg/unilever_logo.svg';

function campaignFooter(props) {
  return (
    <div className="cw_footer cw_text_center campaign-component" data-componentname="footer" data-component-experience-variant="default" data-component-variants="defaultView">
        
        <ul className="cw_footer_links">
            <li>
                {props.country.countryName === 'Canada'? 
                    <a id="_bapw-link" href="#" className="cw-ad-choices_link" data-title="adchoice" data-ct-action="linkClick">
                        <img aria-hidden="true" id="_bapw-icon" className="c-ad-choices__img" alt=""/>
                        <span className="c-ad-choices__text">AdChoices</span>
                    </a> : 
                    <button className="ot-sdk-show-settings">Manage Cookie Preferences</button> 
                }
            </li>
            {props.style.footer.cookieNotice && (
                <li>
                    <a className="footerLink" href={props.style.footer.cookieNoticeUrl} target="_blank" title={props.style.footer.cookieNotice}>{props.style.footer.cookieNotice}<i className="copy_icon"></i></a>
                </li>
            )}
            {props.style.footer.privacyNotice && (
                <li>
                    <a className="footerLink" href={props.style.footer.privacyNoticeUrl} target="_blank" title={props.style.footer.privacyNotice}>{props.style.footer.privacyNotice}<i className="copy_icon"></i></a>
                </li>
            )}
            {props.style.footer.tnc && (
                <li>
                    <a className="footerLink" href={props.style.footer.tncURL} target="_blank" title={props.style.footer.tnc}>{props.style.footer.tnc}<i className="copy_icon"></i></a>
                </li>
            )}
            {props.style.footer.customLink && props.style.footer.customLink.map((link, i) => (
            <li key={i}>
                <a className="footerLink" href={link.customLinkUrl} target="_blank" title={link.customLink}>{link.customLink}<i className="copy_icon"></i></a>
            </li>
            ))}
        </ul>
        <div className="copyright">
        <a href="https://www.unilever.com/" target="_blank" title="Link opens in a new window">
            <UnileverLogo />
            <span>© {new Date().getFullYear()} Unilever</span>
        </a>
        </div>
    </div>
  );
}

export default campaignFooter;

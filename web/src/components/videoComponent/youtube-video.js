 import * as style from "./video-component.css";
import React , { useState } from 'react';
import YouTube from 'react-youtube';
var YT_GA = {},
    YT_Data = {},
    videoPlayProgressTimer;
        

function YouTubeVideo(props) {
    const isAnalytics = props.isAnalytic;
    const opts = {
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        //autoplay: 1,
          loop: 0,
          rel: 0,
          modestbranding: 1
      },
    };
    function onPlayerProgressChange(props) {
        var progress;
        if (props.target.getPlayerState() !== window.YT.PlayerState.PAUSED) {
            YT_GA.timePercentComplete = Math.round(props.target.getCurrentTime() / props.target.getDuration() * 100);
            if (YT_GA.timePercentComplete > 24 && !YT_GA.progress25) {
                progress = '25%';
                YT_GA.progress25 = true;
            }

            if (YT_GA.timePercentComplete > 49 && !YT_GA.progress50) {
                progress = '50%';
                YT_GA.progress50 = true;
            }

            if (YT_GA.timePercentComplete > 74 && !YT_GA.progress75) {
                progress = '75%';
                YT_GA.progress75 = true;
                clearInterval(videoPlayProgressTimer);
            }
            if (progress && isAnalytics) {
                //console.log('video title----', props.target.playerInfo.videoData.title);
                //console.log('YT_GA---', YT_GA);
                //console.log('progress---', progress);
                YT_Data.video_progress = progress;
                YT_Data.video_title = props.target.playerInfo.videoData.title;
                YT_Data.video_id = props.target.playerInfo.videoData.video_id;
                YT_Data.video_source = 'youtubeEmbed';
                window.cwDigitalData("", "youtube_video_progress", YT_Data);
                //window.cwDigitalData('YouTube', props.target.playerInfo.videoData.title, props.target.playerInfo.videoData.video_id, progress);
            }
        }
    }
    function onReady(props) {
        //console.log('video onReady', isAnalytics);
        if (isAnalytics) {
            YT_GA.progress25 = false;
            YT_GA.progress50 = false;
            YT_GA.progress75 = false;
            YT_GA.progress100 = false;
            videoPlayProgressTimer = setInterval(() => {
                onPlayerProgressChange(props);
            }, 5000);
        }
    }
    function onEnd(props) {
        if (isAnalytics) {
            YT_Data.video_progress = '100%';
            YT_Data.video_title = props.target.playerInfo.videoData.title;
            YT_Data.video_id = props.target.playerInfo.videoData.video_id;
            YT_Data.video_source = 'youtubeEmbed';
            window.cwDigitalData("", "youtube_video_progress", YT_Data);
        }
    }
    function onStateChange(props) {
        //console.log('onStateChange---', props);
        YT_Data.video_state = '';
        if (props.data === 1 || props.data === 'play') {
            YT_Data.video_state = 'play';
        } else if (props.data === 0 || props.data === 'finish') {
            YT_Data.video_state = 'finish';
        }
        if (YT_Data.video_state && isAnalytics) {
            YT_Data.video_title = props.target.playerInfo.videoData.title;
            YT_Data.video_id = props.target.playerInfo.videoData.video_id;
            YT_Data.video_source = 'youtubeEmbed';
            //console.log('video state------', YT_Data);
            window.cwDigitalData("", "youtube_video_state_change", YT_Data);
        }
    }
  return (
      <div className="cw_video_component campaign-component" data-componentname="videoomponent" data-component-experience-variant="default" data-component-variants="defaultView">
          <YouTube videoId={props.videoId} opts={opts} onStateChange={onStateChange} onReady={onReady} onEnd={onEnd} />
    </div>
  );

 
}

export default YouTubeVideo;

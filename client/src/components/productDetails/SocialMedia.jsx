import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, PinterestShareButton, PinterestIcon } from 'react-share';

export default function SocialMedia(props) {
  return (
    <div className='social_media'>
      <h4>Share Me!</h4>
      <FacebookShareButton url={''}>
        <FacebookIcon style={{ margin: '5px' }} size={40} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={''}>
        <TwitterIcon style={{ margin: '5px' }} size={40} round={true} />
      </TwitterShareButton>
      <PinterestShareButton url={''}>
        <PinterestIcon style={{ margin: '5px' }} size={40} round={true} />
      </PinterestShareButton>
    </div>
  )
};
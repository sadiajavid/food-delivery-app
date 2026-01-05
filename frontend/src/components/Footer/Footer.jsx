import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
              <img src={assets.logo} alt=""  />
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, corrupti temporibus? Harum quod facilis laudantium aliquid eligendi molestiae explicabo nihil, id provident in obcaecati quidem autem omnis consequuntur minus delectus.              </p>

            <div className="footer-social-icoms">
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                    </ul>

                </div>
                <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+92-3155793746</li>
                        <li>contact@CheezyBites.com</li>
                    </ul>

                </div>
            </div>
            <hr/>
            <p className='footer-copyright'>Copyright 2026 CheezyBites.com - All Rights Reserved</p>
        </div>
    )
}

export default Footer
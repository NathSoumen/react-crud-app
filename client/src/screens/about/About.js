import React from 'react'
import './about.css'
export default function About() {
   let a = new Date();
    return (
        <div>
            <section className="section-1">
                <div className="intro"> 
                    <div className="hello">
                        <h1>Hello Friend</h1>
                        <h3>I'm <span>Soumen</span></h3>
                        <div>
                        <h4 className="dream">Inspire to become a Full Stack Web Developer</h4>
                    </div>
                    </div>
                    
                        
                </div>
                <div className="about-me">
                     <div className="skills">
                        <h3 className="about-me-heading">Skill</h3>
                        <h4>html</h4>
                        <h4>css</h4>
                        <h4>javascript</h4>
                        <h4>reactJS</h4>
                        <h4>Express</h4>
                        <h4>Linux</h4>
                    </div>
                    <div className="hobby">
                        <h3 className="about-me-heading">My hobbies</h3>
                        <h4>reading comic & novels</h4>
                        <h4>listening music</h4>                    
                    </div>
                    
                </div>

                <div className="contact_me">
                    <div className="contact">
                        <h3 className="about-me-heading">Localtion</h3>
                        <h4>Thane Mumbai India</h4>
                        <h4>Pin 400606</h4>
                    </div>
                    <div className="contact">
                        <h3 className="about-me-heading">Email</h3>
                        <h4>saumennath29@gmail.com</h4>
                    </div>
                    <div className="contact">
                        <h4 className="about-me-heading">Mobile</h4>
                        <h4>(India)+918011515352</h4>
                    </div>
                </div>
                <div  className="footer">
                        {     a.getFullYear()}
                </div>
            </section>
        </div>

    )
}

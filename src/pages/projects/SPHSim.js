import React from 'react';

import Container from '../../components/Container';
import H2 from '../../components/H2';
import SPHSimPdf from '../../pdfs/SPH-sim.pdf';
import Strong from '../../components/Strong';
import A from '../../components/Hyperlink';
import SPHdemo from '../../images/sphDemo.gif';



const SPHSim = () => {
   return (
      <Container>
         <section>
            <H2>2D Smoothed-Particle Hydrodynamics</H2>
            <p>
               This was the final project I chose for my physics-based animation course at UofT.
               Check out my SIGGRAPH Technical Brief&nbsp;
               <Strong><A href={SPHSimPdf} target="_blank">here</A></Strong>&nbsp;
               where you can find the in-depth details from this project. Below I've
               provided a simulation demo of the result written in MATLAB!
            </p>
            <img src={SPHdemo} alt="Short gif showing the results of the SPH simulation" />
         </section>
      </Container>
   )
}

export default SPHSim

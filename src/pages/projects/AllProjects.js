import React from 'react';
import styled from 'styled-components';
import { 
   Link,
   useRouteMatch,
} from 'react-router-dom';

import Container from '../../components/Container';
import Section from '../../components/Section';
import H2 from '../../components/H2';
import Strong from '../../components/Strong';
import A from '../../components/Hyperlink';


const H3 = styled.h3`
   color: ${props => props.theme.colors.darker};
   margin-bottom: 0;
`;

const P = styled.p`
   margin-top: 0;
`;

const Post = styled(Section)`
   padding-bottom: 0;
`;

const StyledLink = styled(Link)`
   color: ${props => props.theme.colors.link};
   text-decoration: none;
   transition: color 0.2s ease-out;

   :hover {
      color: ${props => props.theme.colors.brand};
   }
`;


const StyledA = styled.a`
   color: ${props => props.theme.colors.link};
   text-decoration: none;
   transition: color 0.2s ease-out;

   :hover {
      color: ${props => props.theme.colors.brand};
   }
`;


const AllProjects = () => {
   let { url } = useRouteMatch();

   return (
      <Container>
         <Section>
            <H2>Projects</H2>
            <p>
               Listed below are some of the projects I've worked on during my
               undergraduate. This is by no means a complete list. Other computer
               graphics and A.I. assignments can be found on 
               my <A href="https://github.com/ericpko" target="_blank">GitHub</A>.
            </p>
         </Section>

         <Post>
            <H3>
               <StyledA href="https://ericpko.github.io/loop/"
                        target="_blank">
                           Loop
               </StyledA>
            </H3>
            <P>
               I started somewhat of a documentation website for common for-loop patterns.
               I noticed during my undergrad that some general looping patterns kept 
               coming up in different classes. For example, when dealing with images,
               one typically stores a buffer of the image inside a 1-dimensional array,
               and accessing each subpixel requires a specific 2D-to-1D index mapping.
               This example isn't particularly difficult to figure out, but it can quickly
               become confusing when dealing with higher dimensional tensors or voxels.
               Ergo, I've decided to document some of these common (or even not-so-common,
               but might be useful in some other context) for-loops. It would be amazing
               if anyone found it useful or even contributed, but at the end of the day,
               it's a nice way for myself to reinforce my own understanding of some of
               these more challenging concepts.
            </P>
         </Post>
         <Post>
            <H3><StyledLink to={`${url}/raytracer`}>Ray Tracer</StyledLink></H3>
            <P>
               A tiny
               <Strong>
                  <A href="https://github.com/ericpko/raytracer" 
                     target="_blank">
                        &nbsp;ray tracer&nbsp;
                  </A>
               </Strong>
               I created as a way to learn Rust!
            </P>
         </Post>
         <Post>
            <H3><StyledLink to={`${url}/2D-SPH-simulation`}>2D Smoothed-Particle Hydrodynamics</StyledLink></H3>
            <P>
               Simulation of the classical dam break using smoothed-particle hydrodynamics (SPH) 
               based on the method described by Muller et al. in their article&nbsp;
               <Strong>
                  <A href="https://matthias-research.github.io/pages/publications/sca03.pdf" 
                     target="_blank">
                        Particle-Based Fluid Simulation for Interactive Applications
                  </A>
               </Strong>.
            </P>
         </Post>
         <Post>
            <H3>
               <StyledA href="https://josh-teichro.itch.io/a-weathery-journey"
                        target="_blank">
                           A Weathery Journey
               </StyledA>
            </H3>
            <P>
               This is a 3D puzzle-platformer where you play as a wizard that has the
               power to manipulate the weather around him. You use his abilities&mdash;sun,
               wind, rain, and snow&mdash;to solve puzzles and platform your way across
               the levels! This was a really fun project where I had the pleasure of
               working with a small team of developers, artists, and musicians from the 
               University of Toronto, and OCAD University.
            </P>
         </Post>
         <Post>
            <H3><StyledLink to={`${url}/bouncing-balls`}>Bouncing Balls</StyledLink></H3>
            <P>
               What can I say? These are some colorful bouncing balls that I made by following
               this
               <Strong>
                  <A href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice"
                     target="_blank">
                        &nbsp;Mozilla MDN Project&nbsp;
                  </A>
               </Strong>
               as I was learning JavaScript and React. I re-created this project using
               React.
            </P>
         </Post>
      </Container>
   )
}

export default AllProjects

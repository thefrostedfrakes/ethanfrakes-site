import React, { useState } from 'react';
import { 
  SiPython, SiCplusplus, SiC, SiJavascript, SiDart, SiGnubash,
  SiPytorch, SiOpencv, SiRoboflow, SiNumpy, SiPandas, SiScikitlearn,
  SiHuggingface, SiNvidia, SiReact, SiFlutter, SiAndroidstudio,
  SiRos, SiLinux, SiDebian, SiCentos, SiUbuntu,
  SiPostgresql, SiMongodb, SiGit, SiGithub, SiArxiv, SiOsf, SiInstagram, SiX
} from 'react-icons/si';
import { FaJava, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { DiW3C, DiScrum } from "react-icons/di";
import { MdViewKanban } from "react-icons/md";

export default function Portfolio() {
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);

  return (
    <main className="site-content">
      <h1>Portfolio</h1>

      {/* SKILLS SECTION */}
      <div 
        className="accordion-header" 
        onClick={() => setSkillsOpen(open => !open)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginRight: '0.5rem' }}>Skills</h2>
        {skillsOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {skillsOpen && (
        <div className="accordion-content">
          <h3>Programming Languages:</h3>
          <ul className="skills-list">
            <li><SiPython/>Python</li>
            <li><SiCplusplus/>C++</li><li><SiC /> C</li>
            <li><FaJava/>Java</li>
            <li><SiJavascript/>JavaScript</li>
            <li><SiDart/>Dart</li>
            <li><SiGnubash/>Bash</li>
          </ul>
          <h3>AI, CV, &amp; Data Science:</h3> 
          <ul className="skills-list">
            <li><SiPytorch/>PyTorch</li>
            <li><SiOpencv/>OpenCV</li>
            <li><SiRoboflow/>Roboflow</li>
            <li><SiNumpy/>Numpy</li>
            <li><SiPandas/>Pandas</li>
            <li><SiScikitlearn/>Scikit-Learn</li>
            <li><SiHuggingface/>Hugging Face</li>
            <li><SiNvidia/>CUDA</li>
            <li>Matplotlib</li>
            <li>YOLO</li>
          </ul>
          <h3>Web &amp; Mobile Dev:</h3> 
          <ul className="skills-list">
            <li><SiReact/>React</li>
            <li><SiFlutter/>Flutter</li>
            <li><SiAndroidstudio/>Android Studio</li>
          </ul>
          <h3>Semantic Web:</h3> 
          <ul className="skills-list">
            <li><DiW3C/>OWL</li>
            <li><DiW3C/>RDF</li>
            <li><DiW3C/>Ontologies</li>
            <li><DiW3C/>Knowledge Graphs</li>
            <li><DiW3C/>SPARQL</li>
          </ul>
          <h3>OS:</h3>
          <ul className="skills-list">
            <li><SiLinux/>Linux</li>
            <li><SiDebian/>Debian</li>
            <li><SiCentos/>CentOS</li>
            <li><SiUbuntu/>Ubuntu</li>
          </ul>
          <h3>Databases:</h3>
          <ul className="skills-list">
            <li><SiPostgresql/>PostgreSQL</li>
            <li><SiMongodb/>MongoDB</li>
          </ul>
          <h3>Robotics:</h3> 
          <ul className="skills-list">
            <li><SiRos/>ROS 2</li>
            <li>Gazebo</li>
          </ul>
          <h3>Project Management:</h3> 
          <ul className="skills-list">
            <li><SiGit/>Git</li>
            <li><SiGithub/>GitHub</li>
            <li><MdViewKanban/>Kanban</li>
            <li><DiScrum/>Scrum</li>
            <li>Agile</li>
          </ul>
        </div>)}

      {/* PROJECTS SECTION */}
      <div 
        className="accordion-header" 
        onClick={() => setProjectsOpen(open => !open)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginRight: '0.5rem' }}>Projects</h2>
        {projectsOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {projectsOpen && (
        <div className="accordion-content">
          <div className="project-box">
            <h3>GeoOutageKG</h3>
            <p><small className="date-range">February 2025 - Present</small></p>
            <p>
              GeoOutageKG is a multimodal knowledge graph that integrates power outage data sources from multiple databases, namely NASA's Black Marble dataset and the DOE's EAGLE-I dataset.
              The source datasets contain either nighttime light (NTL) satellite imagery with high spatial resolution but low temporal resolution, or county-wise outage data with frequent temporal updates but low spatial resolution.
              The data is curated by their spatial and temporal regions and linked together into a geospatiotemporal knowledge grpah.
              The source ontology, GeoOutageOnto, contains 3 novel data classes for numeric outage records, nightly NTL images, and power outage maps following major hurricane events.
              GeoOutageKG is a large knowledge graph with over 10.6 million outage record instances, 300,000 NTL image instances, and 15,000 outage map instances.<br/><br/>

              The paper for GeoOutageKG has been accepted to the 24th International Semantic Web Conference (ISWC 2025), which will be held this November.<br/>

              <SiGithub/><a href="https://purl.org/geooutagekg">GitHub Repository</a>
              <SiOsf/><a href="https://doi.org/10.17605/OSF.IO/QVD8B">OSF Repository</a>
              <SiArxiv/><a href="https://doi.org/10.48550/arXiv.2507.22878">arXiv Preprint</a>
            </p>
          </div>
          <div className="project-box">
            <h3>UCF Crimes</h3>
            <p><small className="date-range">March 2023 - Present</small></p>
            <p>
              UCF Crimes is a social media-based service and interactive bot created by myself, Jack Sweeney, and Maverick Reynolds to provide a more user-friendly interface for remaining notified of UCF PD crime reports and querying crime reports from a database.
              UCF Crimes utilizes a back- and front-end framework for reading and parsing crimes from the official UCF crime report log and posting crimes daily.<br/>
              • Back end: reads from daily crime report log posted every night, parses returned string containing crime data, and adds crime reports and information to SQL database, including the crime type, report date & time, disposition, and address. While adding to database, crime address is geocoded using the Google Maps Geocoder API, then nearest place marker is identified using Google Places API. Both geocoded data and raw data from PDF are added to database.<br/>
              • Front-end: Posts to Instagram account using API daily with crime title, place marker name, report date/time, and disposition, along with image of map with location from geocoded coordinates of address. Also posts daily to Discord server using Discord API, where users can also query individual crime reports by title, report date, disposition, address, or place name.<br/>
              Have so far parsed over 1,900 crime reports and all available to query in the database.<br/><br/>

              <SiGithub/><a href="https://github.com/thefrostedfrakes/UCF-Crimes">GitHub Repository</a>
              <SiInstagram/><a href="https://www.instagram.com/ucfcrimes">Instagram</a>
              <SiX/><a href="https://x.com/UCFCrimes">X/Twitter</a>
            </p>
          </div>
          <div className="project-box">
            <h3>RE-RASSOR Autonomy</h3>
            <p><small className="date-range">January 2024 - December 2024</small></p>
            <p>
              Senior Design project sponsored by the Florida Space Institute (FSI) and NASA. Designed a multi-phase system for autonomous rovers to level and compact lunar regolith, and pave landing pads for lunar landing and exploration.<br/>
              - Developed rover pathfinding algorithm using A* search for autonomous movement control.<br/>
              - Implemented A* search across three-phase rover leveling, compacing, and paving pipeline for fully autonomous pavement construction algorithm.<br/>
              - Made multi-phase system scalable across different landing pad sizes, allowing for modularity.<br/>
              - Tested rover system in simulated environment (Gazebo Classic) and developed codebase using ROS2 API and Python.<br/>
              - Collaborated with Senior Design team using Git for verison control and Agile for project planning and development.<br/>
              - Co-authored project documentation with team that includes all tools and methods used. Written primarily for future teams for efficient onboarding and project longevity.
            </p>
          </div>

          <div className="project-box">
            <h3>TopTier Games</h3>
            <p><small className="date-range">October 2023 - November 2023</small></p>
            <p>
              Social cataloging service for cataloging and ranking video games. Directly worked on Android mobile application. Implemented user interface for search page, game description modal, adding games to library, email verification page, and user account settings including password reset.<br/><br/>
              <SiGithub/><a href="https://github.com/thefrostedfrakes/TopTier-Games">GitHub Repository</a>
            </p>
          </div>
        </div>)}

      {/* EDUCATION SECTION */}
      <div 
        className="accordion-header" 
        onClick={() => setEducationOpen(open => !open)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginRight: '0.5rem' }}>Education</h2>
        {educationOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {educationOpen && (
        <div className="accordion-content">
          <div className="project-box">
            <h3>University of Central Florida</h3>
            <p><small className="date-range">August 2021 - December 2024</small></p>
            <p>
              Major: Computer Science (B.S.) • GPA = 3.7<br/>
              Clubs:<br/>
              <small>AI@UCF • Project Lead, PaletteAI (2023-2024)</small><br/>
              <small>UCF Astronomy Society • Vice President (2023-2024) • Social Media Manager (2022-2023)</small>
            </p>
          </div>
          <div className="project-box">
            <h3>Lake-Sumter State College</h3>
            <p><small className="date-range">January 2019 - May 2021</small></p>
            <p>
              Major: General Studies (A.A.) • GPA = 3.8
            </p>
          </div>
        </div>)}
    </main>
  );
}

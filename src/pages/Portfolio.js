import React from 'react';
import { 
  SiPython, 
  SiCplusplus, 
  SiC,  
  SiJavascript, 
  SiDart, 
  SiGnubash,
  SiPytorch,
  SiOpencv,
  SiRoboflow,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiHuggingface,
  SiNvidia,
  SiReact,
  SiFlutter,
  SiAndroidstudio,
  SiRos,
  SiLinux,
  SiDebian,
  SiCentos,
  SiUbuntu,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import {FaJava} from 'react-icons/fa';
import { DiW3C, DiScrum } from "react-icons/di";
import { MdViewKanban } from "react-icons/md";

export default function Portfolio() {
  return (
    <main className="site-content">
      <h1>Portfolio</h1>
      <h2>Skills</h2>
      <h3>Programming Languages:</h3>
      <ul className="skills-list">
        <li><SiPython/>Python</li>
        <li><SiCplusplus/>C++</li><li><SiC /> C</li>
        <li><FaJava/>Java</li>
        <li><SiJavascript/>JavaScript</li>
        <li><SiDart/>Dart</li>
        <li><SiGnubash/>Bash</li>
      </ul>
      <h3>AI, CV, & Data Science:</h3> 
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
      <h3>Web & Mobile Dev</h3> 
      <ul className="skills-list">
        <li><SiReact/>React</li>
        <li><SiFlutter/>Flutter</li>
        <li><SiAndroidstudio/>Android Studio</li>
      </ul>
      <h3>Semantic Web</h3> 
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

    </main>
  );
}

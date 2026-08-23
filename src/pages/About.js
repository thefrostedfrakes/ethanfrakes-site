import React from 'react';

export default function About() {
  return (
    <main className="site-content">
      <h1>About</h1>
      <div className="text-box">
        <p>
          I am an incoming PhD student at the University of Central Florida's School of Modeling, Simulation and Training. Previously, I received my B.S. degree in Computer Science, also from UCF.
          I have a strong focus on researching and developing cutting-edge technologies that bridge structured knowledge and intelligent systems. 
          My current work primarily focuses on utilizing the Semantic Web, Knowledge Graphs, Neuro-symbolic AI, and multi-agent systems for energy resilience planning, outage detection, disaster response, and power grid management.
          As we enter a new era dominated by AI & renewable energy, I am particularly interested in integrating these technologies to address the challenges of modern energy systems' complexity, demand, and reliability.
          I'm also interested in exploring the intersection of these technologies with other domains, such as materials science, robotics, and human-computer interaction.<br/><br/>

          Currently, I'm working at UCF's SAGE Lab with Dr. Mengjie Li. 
          We're developing GeoResilience, a knowledge-graph-powered platform for monitoring, analyzing, and strengthening the resilience of a power grid increasingly strained by disasters, adversarial attacks, aging infrastructure, and rising demand.
          It brings together GeoOutageKG, a multimodal knowledge graph capturing outages at both a high spatial and temporal resolution, the GeoOutageOnto ontology, and the GeoOutageBench evaluation suite.
          Going forward, we're working to integrate GeoResilience into a multi-agent system for energy resilience planning, along with detecting outages, reasoning about their causes, and proposing solutions.<br/><br/>

          Outside of my professional interests, I am an avid enthusiast of Tech, Robotics, History, Astronomy, Meteorology, Films, Science Fiction, and a lot more.
          But in many occasions, I find it important to enjoy the small things in life: having parties and going out with good friends, going for a good nature walk, and enjoying life with others.
          If you would like to reach out to discuss my academic work, or if you just would like to chat about common interests, feel free to contact me at any time!
        </p>
      </div>
    </main>
  );
}

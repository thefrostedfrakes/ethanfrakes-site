import React, { useEffect, useRef, useState } from 'react';
import { FiCopy } from 'react-icons/fi';

export default function Publications() {
  const bibtex_geooutagebench = `@InProceedings{geooutagebench,
  author={Frakes, Ethan D. and Kvien, Amy and Kundu, Rishabh and Mehdi, Redad and Tran, Van D. and Mandayam, Vibha S. and Davis, Kristopher O. and Barcelos, Erika I. and French, Roger H. and Wu, Yinghui and Li, Mengjie},
  title={{GeoOutageBench}: Benchmarking Ambiguity-aware, Ontology-grounded Geospatiotemporal {KGQA} for Multimodal Power Outage and Resilience Analysis},
  booktitle={Proceedings of the 34th ACM International Conference on Advances in Geographic Information Systems},
  series={SIGSPATIAL '26},
  year={2026},
  month={11},
  publisher={Association for Computing Machinery},
  address={New York, NY, USA},
  location={Riverside, CA, USA},
  numpages={13},
  isbn={979-8-4007-2950-8},
  doi={10.1145/3841645.3842982},
  eprint={2609.36082},
  eprinttype={arxiv},
  eprintclass={cs.AI}
}`;
  const bibtex_gokg = `@InProceedings{geooutagekg,
  author={Frakes, Ethan and Wu, Yinghui and French, Roger H. and Li, Mengjie},
  editor={Garijo, Daniel and Kirrane, Sabrina and Salatino, Angelo and Shimizu, Cogan and Acosta, Maribel and Nuzzolese, Andrea Giovanni and Ferrada, Sebasti{\\'a}n and Soulard, Thibaut and Kozaki, Kouji and Takeda, Hideaki and Gentile, Anna Lisa},
  title={{GeoOutageKG}: A Multimodal Geospatiotemporal Knowledge Graph for Multiresolution Power Outage Analysis},
  booktitle={The Semantic Web -- ISWC 2025},
  year={2025},
  month={10},
  publisher={Springer Nature Switzerland},
  address={Cham},
  pages={221--239},
  isbn={978-3-032-09530-5},
  doi={10.1007/978-3-032-09530-5_13},
  eprint={2507.22878},
  eprinttype={arxiv},
  eprintclass={cs.IR}
}`;

  const bibtex_spie = `@inproceedings{frakes2024efficient,
  title={Efficient and consistent zero-shot video generation with diffusion models},
  author={Ethan Frakes and Umar Khalid and Chen Chen},
  booktitle={Real-Time Image Processing and Deep Learning 2024},
  volume={13034},
  pages={48--57},
  year={2024},
  organization={SPIE},
}`

  const BUBBLE_MS = 2000;      /* how long the bubble stays up */

  /* which entry's bubble is showing, and the timer that takes it back down.
     Copying again restarts that timer rather than letting the earlier one pull
     the newer bubble down early. */
  const [bubble, setBubble] = useState(null);   // { key, message }
  const hideTimer = useRef(null);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const copyBibtex = (key, text) => {
    const flash = (message) => {
      clearTimeout(hideTimer.current);
      setBubble({ key, message });
      hideTimer.current = setTimeout(() => setBubble(null), BUBBLE_MS);
    };

    navigator.clipboard.writeText(text).then(
      () => flash('Copied!'),
      () => flash('Copy failed')
    );
  };

  /* The bubble rides inside the button so it can sit directly above the icon.
     It stays mounted and empty while idle so a screen reader has a live region
     already in the page to announce the message into - the alert() this
     replaced used to speak for itself. */
  const bubbleFor = (key) => (
    <span
      className={`copy-bubble${bubble?.key === key ? ' is-visible' : ''}`}
      role="status"
    >
      {bubble?.key === key ? bubble.message : ''}
    </span>
  );

  return (
    <main className="site-content">
      <h1>Publications</h1>

      <div className="publication-box">
        <h3>GeoOutageBench: Benchmarking Ambiguity-aware, Ontology-grounded Geospatiotemporal KGQA for Multimodal Power Outage and Resilience Analysis</h3>
        <p><small>34th ACM International Conference on Advances in Geographic Information Systems (SIGSPATIAL '26), November 3-6, 2026, Riverside, CA, USA</small></p>
        <p>
          Frakes, E. D., Kvien, A., Kundu, R., Mehdi, R., Tran, V. D., Mandayam, V. S., Davis, K. O., Barcelos, E. I., French, R. H., Wu, Y., &amp; Li, M. (2026, November). GeoOutageBench: Benchmarking ambiguity-aware, ontology-grounded geospatiotemporal KGQA for multimodal power outage and resilience analysis. In Proceedings of the 34th ACM International Conference on Advances in Geographic Information Systems. Association for Computing Machinery.{' '}
          <a
            href="https://doi.org/10.1145/3841645.3842982"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://doi.org/10.1145/3841645.3842982
          </a> 
        </p>

        <div className="bibtex-wrapper">
          <button onClick={() => copyBibtex('gokg', bibtex_geooutagebench)} className="bibtex-button" aria-label="Copy BibTeX">
            <FiCopy className="copy-icon"/>
            {bubbleFor('gokg')}
          </button>
            <pre className="bibtex-block">
              <code>{bibtex_geooutagebench}</code>
            </pre>
        </div>
      </div>

      <div className="publication-box">
        <h3>GeoOutageKG: A Multimodal Geospatiotemporal Knowledge Graph for Multiresolution Power Outage Analysis</h3>
        <p><small>24th International Semantic Web Conference (ISWC 2025), November 2-6, 2025, Nara, Japan</small></p>
        <p>
          Frakes, E., Wu, Y., French, R. H., &amp; Li, M. (2025, October). GeoOutageKG: A multimodal geospatiotemporal knowledge graph for multiresolution power outage analysis. In The Semantic Web -- ISWC 2025 (pp. 221-239). Springer Nature Switzerland. {' '}
          <a
            href="https://doi.org/10.1007/978-3-032-09530-5_13"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://doi.org/10.1007/978-3-032-09530-5_13
          </a> 
        </p>

        <div className="bibtex-wrapper">
          <button onClick={() => copyBibtex('gokg', bibtex_gokg)} className="bibtex-button" aria-label="Copy BibTeX">
            <FiCopy className="copy-icon"/>
            {bubbleFor('gokg')}
          </button>
            <pre className="bibtex-block">
              <code>{bibtex_gokg}</code>
            </pre>
        </div>
      </div>

      <div className="publication-box">
        <h3>Efficient and consistent zero-shot video generation with diffusion models</h3>
        <p><small>Accepted and published in Real-Time Image Processing and Deep Learning 2024 at SPIE Defense + Commercial Sensing, April 21-25, 2024</small></p>
        <p>
          Frakes, E., Khalid, U., & Chen, C. (2024, June). Efficient and consistent zero-shot video generation with diffusion models. In Real-Time Image Processing and Deep Learning 2024 (Vol. 13034, pp. 48-57). SPIE. {' '}
          <a
            href="https://doi.org/10.1117/12.3013575"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://doi.org/10.1117/12.3013575
          </a> 
        </p>

        <div className="bibtex-wrapper">
          <button onClick={() => copyBibtex('spie', bibtex_spie)} className="bibtex-button" aria-label="Copy BibTeX">
            <FiCopy className="copy-icon"/>
            {bubbleFor('spie')}
          </button>
            <pre className="bibtex-block">
              <code>{bibtex_spie}</code>
            </pre>
        </div>
      </div>
    </main>
  );
}

import React from 'react';
import { FiCopy } from 'react-icons/fi';

export default function Publications() {
  const bibtex_gokg = `@misc{frakes2025geooutagekgmultimodalgeospatiotemporalknowledge,
  title={GeoOutageKG: A Multimodal Geospatiotemporal Knowledge Graph for Multiresolution Power Outage Analysis},
  author={Ethan Frakes and Yinghui Wu and Roger H. French and Mengjie Li},
  year={2025},
  eprint={2507.22878},
  archivePrefix={arXiv},
  primaryClass={cs.IR},
  url={https://arxiv.org/abs/2507.22878},
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

  const copyBibtexGOKG = () => {
    navigator.clipboard.writeText(bibtex_gokg).then(
      () => alert('BibTeX copied to clipboard!'),
      () => alert('Failed to copy')
    );
  };

  const copyBibtexSPIE = () => {
    navigator.clipboard.writeText(bibtex_spie).then(
      () => alert('BibTeX copied to clipboard!'),
      () => alert('Failed to copy')
    );
  };

  return (
    <main className="site-content">
      <h1>Publications</h1>

      <div className="publication-box">
        <h3>GeoOutageKG: A Multimodal Geospatiotemporal Knowledge Graph for Multiresolution Power Outage Analysis</h3>
        <p><small>Accepted into the 24th International Semantic Web Conference (ISWC 2025), November 2-6, 2025</small></p>
        <p>
          Frakes, E., Wu, Y., French, R. H., &amp; Li, M. (2025, July 30). GeoOutageKG: A multimodal geospatiotemporal knowledge graph for multiresolution power outage analysis. arXiv.org. {' '}
          <a
            href="https://doi.org/10.48550/arXiv.2507.22878"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://doi.org/10.48550/arXiv.2507.22878
          </a> 
        </p>

        <div className="bibtex-wrapper">
          <button onClick={copyBibtexGOKG} className="bibtex-button" aria-label="Copy BibTeX">
            <FiCopy className="copy-icon"/>
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
          <button onClick={copyBibtexSPIE} className="bibtex-button" aria-label="Copy BibTeX">
            <FiCopy className="copy-icon"/>
          </button>
            <pre className="bibtex-block">
              <code>{bibtex_spie}</code>
            </pre>
        </div>
      </div>
    </main>
  );
}

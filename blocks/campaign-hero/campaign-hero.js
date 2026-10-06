export default function decorate(block) {
  const rows = [...block.children];

  const [
    episodeTagRow,
    campaignLogoRow,
    metadataRow,
    descriptionRow,
    ctaRow,
    backgroundImageRow,
  ] = rows;

  // Episode tag
  if (episodeTagRow) {
    episodeTagRow.classList.add('campaign-hero-episode-tag');
  }

  // Campaign logo
  if (campaignLogoRow) {
    campaignLogoRow.classList.add('campaign-hero-logo');

    const img = campaignLogoRow.querySelector('img');
    if (img) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    }
  }

  // Metadata
  if (metadataRow) {
    metadataRow.classList.add('campaign-hero-metadata');
  }

  // Description
  if (descriptionRow) {
    descriptionRow.classList.add('campaign-hero-description');
  }

  // CTA
  if (ctaRow) {
    ctaRow.classList.add('campaign-hero-cta');

    const link = ctaRow.querySelector('a');
    if (link) {
      link.classList.add('button', 'primary');
    }
  }

  // Background image
  if (backgroundImageRow) {
    backgroundImageRow.classList.add('campaign-hero-background');

    const picture = backgroundImageRow.querySelector('picture');

    if (picture) {
      picture.setAttribute('aria-hidden', 'true');
    }
  }

  // Content wrapper
  const content = document.createElement('div');
  content.className = 'campaign-hero-content';

  [
    episodeTagRow,
    campaignLogoRow,
    metadataRow,
    descriptionRow,
    ctaRow,
  ].forEach((row) => {
    if (row) content.append(row);
  });

  block.append(content);

  // Keep background outside content wrapper
  if (backgroundImageRow) {
    block.prepend(backgroundImageRow);
  }
}
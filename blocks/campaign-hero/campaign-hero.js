export default function decorate(block) {
  const [
    episodeTagRow,
    campaignLogoRow,
    contentRow,
    backgroundImageRow,
  ] = [...block.children];

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

  // Campaign content:
  // metadata + description + CTA
  if (contentRow) {
    contentRow.classList.add('campaign-hero-content-body');

    const paragraphs = [...contentRow.querySelectorAll('p')];

    // First paragraph = metadata
    if (paragraphs[0]) {
      paragraphs[0].classList.add('campaign-hero-metadata');
    }

    // Paragraph containing link = CTA
    paragraphs.forEach((paragraph) => {
      const link = paragraph.querySelector('a');

      if (link) {
        paragraph.classList.add('campaign-hero-cta');
        link.classList.add('button', 'primary');
      } else if (paragraph !== paragraphs[0]) {
        paragraph.classList.add('campaign-hero-description');
      }
    });
  }

  // Background image
  if (backgroundImageRow) {
    backgroundImageRow.classList.add('campaign-hero-background');

    const picture = backgroundImageRow.querySelector('picture');

    if (picture) {
      picture.setAttribute('aria-hidden', 'true');
    }

    const img = backgroundImageRow.querySelector('img');

    if (img) {
      img.alt = '';
      img.loading = 'eager';
      img.fetchPriority = 'high';
    }
  }

  // Create wrapper for foreground hero content
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'campaign-hero-content';

  [
    episodeTagRow,
    campaignLogoRow,
    contentRow,
  ].forEach((row) => {
    if (row) {
      contentWrapper.append(row);
    }
  });

  // Background first
  if (backgroundImageRow) {
    block.prepend(backgroundImageRow);
  }

  // Foreground content
  block.append(contentWrapper);
}

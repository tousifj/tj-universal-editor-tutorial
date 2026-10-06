export default function decorate(block) {
  const [
    episodeTagRow,
    campaignTitleRow,
    contentRow,
    backgroundImageRow,
  ] = [...block.children];

  /*
   * Episode tag
   */
  if (episodeTagRow) {
    episodeTagRow.classList.add('campaign-hero-episode-tag');
  }

  /*
   * Campaign wordmark
   *
   * Author enters: "The Second Act"
   * We visually construct the campaign wordmark from HTML/CSS.
   */
  if (campaignTitleRow) {
    const campaignTitle = campaignTitleRow.textContent.trim();

    const logo = document.createElement('div');
    logo.className = 'lockup-logo';
    logo.setAttribute('role', 'img');
    logo.setAttribute('aria-label', campaignTitle);

    const second = document.createElement('span');
    second.className = 'logo-second';
    second.textContent = 'Second';

    const the = document.createElement('span');
    the.className = 'logo-the';
    the.textContent = 'The';

    const act = document.createElement('span');
    act.className = 'logo-act';
    act.textContent = 'Act';

    logo.append(second, the, act);

    campaignTitleRow.replaceChildren(logo);
    campaignTitleRow.classList.add('campaign-hero-logo');
  }

  /*
   * Campaign content
   *
   * Authoring convention:
   * 1st paragraph = metadata
   * remaining normal paragraphs = description
   * paragraph containing link = CTA
   */
  if (contentRow) {
    contentRow.classList.add('campaign-hero-content-body');

    const paragraphs = [...contentRow.querySelectorAll('p')];

    paragraphs.forEach((paragraph, index) => {
      const link = paragraph.querySelector('a');

      if (link) {
        paragraph.classList.add('campaign-hero-cta');
        link.classList.add('button', 'primary');
      } else if (index === 0) {
        paragraph.classList.add('campaign-hero-metadata');
      } else {
        paragraph.classList.add('campaign-hero-description');
      }
    });
  }

  /*
   * Background image
   */
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

  /*
   * Foreground content wrapper
   */
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'campaign-hero-content';

  [
    episodeTagRow,
    campaignTitleRow,
    contentRow,
  ].forEach((row) => {
    if (row) {
      contentWrapper.append(row);
    }
  });

  /*
   * Background stays behind foreground content.
   */
  if (backgroundImageRow) {
    block.prepend(backgroundImageRow);
  }

  block.append(contentWrapper);
}

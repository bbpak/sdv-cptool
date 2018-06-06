export const STATIC_REF = 'https://api.github.com/users/Bouhm/gists'

export const DOCS_MD_SRC =
  'https://raw.githubusercontent.com/Pathoschild/StardewMods/develop/ContentPatcher/README.md'

export const DOCS_SRC_BASE =
  'https://github.com/Pathoschild/StardewMods/raw/develop/ContentPatcher'

export const DOCS_SRC_REF =
  'https://api.github.com/repos/Pathoschild/StardewMods/git/refs/heads/develop'

export const getDocsHtml = markdown => {
  return `
  <!DOCTYPE html>
    <html lang="en">
    <body>
      <article class="markdown-body entry-content" itemprop="text">
        ${markdown}
        <small>
          Sourced from <a href=${DOCS_SRC_BASE} target="_blank" >${DOCS_SRC_BASE}</a>
        </small>
      </article>
    </body>
    </html>
  `
}

export const CONTENT_TREES_SRC_REF =
  'https://api.github.com/repos/Pathoschild/StardewValley/git/refs/heads/fixed'

export const CONTENT_TREES_SRC =
  'https://api.github.com/repos/Pathoschild/StardewValley/git/trees'

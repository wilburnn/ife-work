export default function createSvg(iconType: string): SVGSVGElement {
  const svgns = 'http://www.w3.org/2000/svg'
  const xlinkns = 'http://www.w3.org/1999/xlink'
  const svg = document.createElementNS(svgns, 'svg')
  svg.setAttribute('aria-hidden', 'true')
  const use = document.createElementNS(svgns, 'use')
  if (iconType.includes('folder')) {
    svg.classList.add('icon', 'icon-folder')
    use.setAttributeNS(xlinkns, 'href', '#icon-folder')
  } else if (iconType.includes('delete')) {
    svg.classList.add('icon', 'icon-delete')
    use.setAttributeNS(xlinkns, 'href', '#icon-delete')
  } else {
    svg.classList.add('icon', 'icon-document')
    use.setAttributeNS(xlinkns, 'href', '#icon-document')
  }
  svg.appendChild(use)
  return svg
}

import { groq } from 'next-sanity'

export const heroQuery = groq`*[_type == "hero"][0]`

export const productsQuery = groq`*[_type == "product"] | order(order asc)`

export const aboutQuery = groq`*[_type == "about"][0]`

export const statsQuery = groq`*[_type == "siteStats"][0]`

export const allContentQuery = groq`{
  "hero": *[_type == "hero"][0],
  "products": *[_type == "product"] | order(order asc),
  "about": *[_type == "about"][0],
  "stats": *[_type == "siteStats"][0],
  "footer": *[_type == "footer"][0],
}`

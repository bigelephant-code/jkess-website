const about = {
  name: 'about',
  title: 'About Us',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'About Content',
      type: 'text',
    },
    {
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}

export default about

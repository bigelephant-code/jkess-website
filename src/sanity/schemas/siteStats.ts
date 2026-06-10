export default {
  name: 'siteStats',
  title: 'Site Statistics',
  type: 'document',
  fields: [
    {
      name: 'yearsEstablished',
      title: 'Years Established',
      type: 'number',
    },
    {
      name: 'manufacturingBase',
      title: 'Manufacturing Base Size',
      type: 'string',
    },
    {
      name: 'countriesCovered',
      title: 'Countries Covered',
      type: 'number',
    },
    {
      name: 'annualOutput',
      title: 'Annual Output',
      type: 'string',
    },
  ],
}

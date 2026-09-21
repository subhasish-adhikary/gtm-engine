import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Article document for the Thinking section.
 *
 * Mirrors the website's `Article` interface (src/data/articles.ts). URLs are
 * preserved through the slug: existing articles keep their legacy ids as
 * slugs (e.g. "signal-based-gtm" -> /thinking/gtm/signal-based-gtm).
 */
export const article = defineType({
  name: 'article',
  title: 'Thinking Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the URL: /thinking/<category>/<slug>. Keep slugs stable once published.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'B2B GTM', value: 'gtm'},
          {title: 'Marketing Automation', value: 'automation'},
          {title: 'AI Marketing', value: 'ai-marketing'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thesis',
      title: 'Thesis',
      description: 'One-paragraph summary shown under the title and used as the meta description.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Subhasish Adhikary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorBio',
      title: 'Author Bio',
      type: 'text',
      rows: 2,
    }),
    defineField({name: 'publishedDate', title: 'Published Date', type: 'date', validation: (rule) => rule.required()}),
    defineField({name: 'updatedDate', title: 'Updated Date', type: 'date'}),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      description: 'Displayed as-is, e.g. "14 min read".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImageAlt',
      title: 'Featured Image Alt Text',
      description: 'Descriptive alt text; also used for og:image:alt.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'atAGlance',
      title: 'At a Glance',
      description: 'Key takeaways shown near the top of the article.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Table of Contents',
      description: 'Auto-derived from H2 headings on save when empty; edit manually to override.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'id', title: 'Anchor ID', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'id'}},
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({type: 'image'}),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      description: 'Genuine questions only — drives FAQPage structured data.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'answer', title: 'Answer', type: 'text', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
    defineField({
      name: 'sources',
      title: 'Sources & References',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'string'}),
          ],
          preview: {select: {title: 'title', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      description: 'Shown as "Related Thinking" on the article page.',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'article'}]})],
    }),
    defineField({
      name: 'relatedTools',
      title: 'Related Tools',
      description: 'Tool ids from the site (e.g. channel-planner, budget-lab).',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'legacyId',
      title: 'Legacy ID',
      description: 'Internal id from the pre-CMS article data. Used by the migration and never shown.',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'featuredImage'},
  },
  orderings: [
    {title: 'Published Date, Newest First', name: 'publishedDateDesc', by: [{field: 'publishedDate', direction: 'desc'}]},
  ],
})

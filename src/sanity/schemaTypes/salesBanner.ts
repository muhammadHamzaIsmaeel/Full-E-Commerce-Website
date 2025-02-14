// sanity/schemas/salesBanner.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'salesBanner',
  title: 'Sales Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'megaSaleAlert',
      title: 'Mega Sale Alert Text',
      type: 'string',
      description: 'The main text for the mega sale alert (e.g., "Mega Sale Alert!")',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'megaSaleAlertEmoji',
      title: 'Mega Sale Alert Emoji',
      type: 'string',
      description: 'The emoji to use for the mega sale alert (e.g., "🎉")',
    }),
    defineField({
      name: 'discountText',
      title: 'Discount Text',
      type: 'string',
      description: 'The text describing the discount offer.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      description: 'The percentage of the discount (e.g., 50).',
      validation: Rule => Rule.integer().min(0).max(100).required(),
    }),
    defineField({
      name: 'limitedTimeOnlyText',
      title: 'Limited Time Only Text',
      type: 'string',
      description: 'The "limited time only" message.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether the banner is currently active.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'megaSaleAlert',
      subtitle: 'discountText',
      active: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, active} = selection as { title: string, subtitle: string, active: boolean }
      return {
        title: title,
        subtitle: `${subtitle} ${active ? '(Active)' : '(Inactive)'}`
      }
    }
  }
})
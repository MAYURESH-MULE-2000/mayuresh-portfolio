/**
 * items.js
 * ---------------------------------------------------------------------------
 * Small on purpose. Every item here is required by something: the notebook
 * gates investigating and the journal, the repair bill and the complaint form
 * are evidence that dialogue checks for. Nothing is here to pad an inventory.
 */
export const ITEMS = {
  notebook: {
    id: 'notebook',
    name: 'Survey Notebook',
    icon: 'notebook',
    description:
      'Ruled, soft-backed, one corner already curled. Everything you record in the ward ends up here - it is what the journal is.',
    usage: 'Needed to investigate anything and to open the journal.',
  },
  'repair-bill': {
    id: 'repair-bill',
    name: 'Repair Bill (copy)',
    icon: 'bill',
    description:
      'Ganesh’s suspension repair bill, second one this year. He let you copy the date and the amount, not the garage’s name.',
    usage: 'Evidence. Vasant asks for specifics, not adjectives.',
  },
  'complaint-form': {
    id: 'complaint-form',
    name: 'Filed Complaint (receipt)',
    icon: 'form',
    description:
      'The acknowledgement slip for a written complaint about the Main Road patch. The word "drainage" is in the first line, which was Vasant’s whole point.',
    usage: 'Proof the complaint exists on a record. Vasant expects months.',
  },
  'sample-bottle': {
    id: 'sample-bottle',
    name: 'Sample Bottle',
    icon: 'bottle',
    description:
      'A sterile bottle and a label from the estate clinic. Dr. Iyer wrote the date, the time and the words "upstream" and "downstream" on the label herself.',
    usage: 'Evidence in waiting. A sample nobody takes is the whole argument at the nallah.',
  },
  'platform-ticket': {
    id: 'platform-ticket',
    name: 'Platform Ticket',
    icon: 'ticket',
    description:
      'Ten rupees, valid two hours, bought so that standing on a platform without travelling is not an offence.',
    usage: 'Lets you watch the platform properly instead of being moved along.',
  },
}

export function getItem(id) {
  return ITEMS[id] || null
}

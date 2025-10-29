// This file contains the client logos data
// In a real application, you would import actual image files

// Import client logos from assets
import kust from '../assets/kust.png';
import pu from '../assets/pu.png';
import uog from '../assets/uog.png';
import gc from '../assets/gc.png';
import gu from '../assets/gu.png';
import umt from '../assets/umt.png';
import becs from '../assets/becs.png';
import nova from '../assets/argricultur.png'; // Using agriculture image for Nova
import shifa from '../assets/shifa.png';
import who from '../assets/who.png';
import epi from '../assets/epi.png';
import neoc from '../assets/neoc.png';

const clients = [
  {
    id: 11,
    name: 'World Health Organization',
    imageUrl: who,
    alt: 'World Health Organization Logo'
  },
  {
    id: 12,
    name: 'Extended Program on Immunization',
    imageUrl: epi,
    alt: 'Extended Program on Immunization Logo'
  },
  {
    id: 13,
    name: 'National Emergency and Operation Center',
    imageUrl: neoc,
    alt: 'National Emergency and Operation Center Logo'
  },
  {
    id: 1,
    name: 'Khyber Medical University',
    imageUrl: umt, // Using UMT logo as a placeholder since kmu.png is missing
    alt: 'Khyber Medical University Logo'
  },
  {
    id: 2,
    name: 'Kohat University of Science and Technology',
    imageUrl: kust,
    alt: 'Kohat University Logo'
  },
  {
    id: 3,
    name: 'Nova Seeds',
    imageUrl: nova,
    alt: 'Nova Seeds Logo'
  },
  {
    id: 4,
    name: 'Punjab University',
    imageUrl: pu,
    alt: 'Punjab University Logo'
  },
  {
    id: 5,
    name: 'Government College',
    imageUrl: gc,
    alt: 'Government College Logo'
  },
  {
    id: 6,
    name: 'University of Gujarat',
    imageUrl: uog,
    alt: 'University of Gujarat Logo'
  },
  {
    id: 7,
    name: 'Gujarat University',
    imageUrl: gu,
    alt: 'Gujarat University Logo'
  },
  {
    id: 8,
    name: 'University of Management & Technology',
    imageUrl: umt,
    alt: 'UMT Logo'
  },
  {
    id: 9,
    name: 'BECS',
    imageUrl: becs,
    alt: 'BECS Logo'
  },
  {
    id: 10,
    name: 'Shifa Hospital',
    imageUrl: shifa,
    alt: 'Shifa Hospital Logo'
  }
];

export default clients; 
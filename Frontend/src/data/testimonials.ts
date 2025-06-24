export interface Testimonial {
  id: number;
  name: string;
  profession: string;
  image: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    profession: "Wellness Center Director",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    quote: "The singing bowls from OMSound Nepal have transformed our therapy sessions. Clients report deeper relaxation and more profound results. The craftsmanship is unparalleled."
  },
  {
    id: 2,
    name: "Michael Chen",
    profession: "Sound Therapist",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    quote: "As someone who uses singing bowls daily in my practice, I can attest that OMSound's quality is exceptional. The rich, sustained tones create the perfect environment for healing."
  },
  {
    id: 3,
    name: "Emma Patel",
    profession: "Luxury Spa Owner",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    quote: "Our clients immediately noticed when we upgraded to OMSound bowls. The sound quality and visual beauty add an authentic touch of luxury to our treatments."
  },
  {
    id: 4,
    name: "David Rodriguez",
    profession: "Yoga Instructor",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    quote: "I've incorporated OMSound Nepal's singing bowls into my yoga classes for the past year. The bowls help my students achieve deeper meditative states and enhance their practice."
  }
];
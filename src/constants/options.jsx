
export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler in exploration",
    icon: "✈️",
    people: "1 Person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun-loving adventurers",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "⛵",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep costs on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "👑",
  },
];




export const AI_PROMPT = `
Generate a detailed and practical travel plan.

Destination: {location}
Duration: {days} days
Travelers: {travelers}
Budget: {budget}

Return the following information:

1. Hotel Recommendations:
Recommend 3 hotels or accommodations suitable for the destination and selected budget.

For every hotel include:
- hotelName
- hotelAddress
- price
- rating

2. Day-wise Itinerary:
Create an itinerary for every day of the trip.
Include multiple places to visit each day.

For every place include:
- time
- placeName
- placeDetails
- placeImageUrl
- geoCoordinates
- ticketPricing
- timeToTravel

Important instructions:
- Recommend real places and accommodations.
- Keep recommendations relevant to the selected budget.
- Make the itinerary practical and geographically sensible.
- Do not invent exact hotel prices or ratings. If unavailable, mention that they are estimates or unavailable.
- Return only valid JSON matching the requested schema.
`;

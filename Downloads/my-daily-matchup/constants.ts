import { Clip, UserProfile } from './types';

// Mock User Profile
export const MOCK_USER: UserProfile = {
  id: 'user_sports_fan_premium',
  name: 'Alex',
  explicitInterests: ['NFL', 'UEFA Champions League', 'Serie A'],
  inferredInterests: ['Big Plays', 'Expert Analysis', 'Underdog Stories']
};

// Available Library of Clips (Simulating Backend Database)
// Content based on "My Daily Matchup" Brief for Sunday, Dec 14, 2025.

export const AVAILABLE_CLIPS: Clip[] = [
  {
    id: 'nfl-cbs-wk15-kc-buf',
    league: 'NFL on CBS',
    title: 'Mahomes Magic: GW TD Pass',
    team1: 'Chiefs',
    team2: 'Bills',
    duration: 134,
    description: 'With 14 seconds left, Mahomes finds Kelce in the back of the endzone to stun the Bills in Buffalo.',
    timestamp: 'Today 7:45 PM',
    thumbnail: 'https://image.pollinations.ai/prompt/Patrick%20Mahomes%20celebrating%20a%20touchdown%20in%20the%20snow%20high%20cinematic%20quality%20NFL%20jersey?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/Patrick%20Mahomes%20celebrating%20a%20touchdown%20in%20the%20snow%20high%20cinematic%20quality%20NFL%20jersey?width=1280&height=720&nologo=true',
    badges: ['Trending', 'Game of the Week']
  },
  {
    id: 'seriea-milan-sassuolo',
    league: 'Serie A',
    title: "Pulisic's 88th Minute Stunner",
    team1: 'AC Milan',
    team2: 'Sassuolo',
    duration: 65,
    description: 'Christian Pulisic rescues AC Milan with a thunderous volley from outside the box vs. Sassuolo.',
    timestamp: 'Today 2:30 PM',
    thumbnail: 'https://image.pollinations.ai/prompt/Christian%20Pulisic%20soccer%20player%20sliding%20on%20knees%20celebrating%20goal%20AC%20Milan%20jersey%20San%20Siro%20stadium%20background?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/Christian%20Pulisic%20soccer%20player%20sliding%20on%20knees%20celebrating%20goal%20AC%20Milan%20jersey%20San%20Siro%20stadium%20background?width=1280&height=720&nologo=true',
    badges: ['Must Watch', 'USMNT']
  },
  {
    id: 'ucl-md6-recap',
    league: 'UEFA Champions League',
    title: 'Every Goal from Matchday 6',
    team1: 'Various',
    team2: 'Various',
    duration: 525,
    description: 'Catch up on all 32 goals from the final week of the Group Stage, featuring Real Madrid, Man City, and more.',
    timestamp: 'Yesterday',
    thumbnail: 'https://image.pollinations.ai/prompt/Champions%20League%20soccer%20match%20action%20shot%20stadium%20night%20lights%20crowd%20real%20madrid?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/Champions%20League%20soccer%20match%20action%20shot%20stadium%20night%20lights%20crowd%20real%20madrid?width=1280&height=720&nologo=true',
    badges: ['Recap', 'All Goals']
  },
  {
    id: 'ncaa-uk-duke',
    league: 'NCAA Basketball',
    title: 'DOWN GOES DUKE! UK Wins at Buzzer',
    team1: 'Kentucky',
    team2: 'Duke',
    duration: 200,
    description: 'Bedlam at Rupp Arena as the unranked Wildcats take down #3 Duke with a half-court heave.',
    timestamp: 'Today 4:00 PM',
    thumbnail: 'https://image.pollinations.ai/prompt/Kentucky%20basketball%20players%20celebrating%20on%20court%20blue%20jerseys%20crowd%20going%20wild%20in%20background?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/Kentucky%20basketball%20players%20celebrating%20on%20court%20blue%20jerseys%20crowd%20going%20wild%20in%20background?width=1280&height=720&nologo=true',
    badges: ['Upset Alert', 'Buzzer Beater']
  },
  {
    id: 'nfl-colts-jax-def',
    league: 'NFL on CBS',
    title: 'Scoop & Score: Colts Defense',
    team1: 'Colts',
    team2: 'Jaguars',
    duration: 55,
    description: 'Buckner strips the ball, Leonard takes it 40 yards to the house to seal the game against the Jags.',
    timestamp: 'Today 1:00 PM',
    thumbnail: 'https://image.pollinations.ai/prompt/American%20football%20defensive%20player%20holding%20a%20football%20running%20towards%20endzone%20Indianapolis%20Colts%20colors?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/American%20football%20defensive%20player%20holding%20a%20football%20running%20towards%20endzone%20Indianapolis%20Colts%20colors?width=1280&height=720&nologo=true',
    badges: ['Highlight', 'Defense']
  },
  {
    id: 'golazo-henry-analysis',
    league: 'CBS Sports Golazo',
    title: 'Thierry Henry: The Art of the Finisher',
    team1: 'Analysis',
    team2: 'Exclusive',
    duration: 250,
    description: "Exclusive: Henry breaks down the weekend's top striking performances on the touchscreen.",
    timestamp: 'Today 11:00 AM',
    thumbnail: 'https://image.pollinations.ai/prompt/Thierry%20Henry%20in%20a%20TV%20studio%20suit%20pointing%20at%20a%20large%20digital%20tactical%20screen%20soccer%20analysis?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/Thierry%20Henry%20in%20a%20TV%20studio%20suit%20pointing%20at%20a%20large%20digital%20tactical%20screen%20soccer%20analysis?width=1280&height=720&nologo=true',
    badges: ['Exclusive', 'Analysis']
  },
  {
    id: 'pga-hero-woods',
    league: 'PGA Tour',
    title: 'Vintage Tiger: Chip-in on 16',
    team1: 'Tiger Woods',
    team2: 'The Field',
    duration: 75,
    description: 'Tiger Woods creates a roar at the Hero World Challenge with a classic chip-in from the rough.',
    timestamp: 'Today 5:30 PM',
    thumbnail: 'https://image.pollinations.ai/prompt/Tiger%20Woods%20swinging%20golf%20club%20green%20grass%20wearing%20red%20shirt%20Sunday%20golf?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/Tiger%20Woods%20swinging%20golf%20club%20green%20grass%20wearing%20red%20shirt%20Sunday%20golf?width=1280&height=720&nologo=true',
    badges: ['Legend', 'Viral']
  },
  {
    id: 'nwsl-best-saves-2025',
    league: 'NWSL',
    title: 'The Impossible Saves of 2025',
    team1: 'Various',
    team2: 'Various',
    duration: 330,
    description: 'From finger-tip deflections to goal-line clearances, the best goalkeeping moments of the year.',
    timestamp: 'Dec 13',
    thumbnail: 'https://image.pollinations.ai/prompt/Female%20soccer%20goalkeeper%20making%20an%20incredible%20diving%20save%20in%20a%20professional%20stadium?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/Female%20soccer%20goalkeeper%20making%20an%20incredible%20diving%20save%20in%20a%20professional%20stadium?width=1280&height=720&nologo=true',
    badges: ['Collection', 'Best of 2025']
  },
  {
    id: 'nfl-cin-chase',
    league: 'NFL on CBS',
    title: 'Chase is Unstoppable: 156 Yds, 2 TD',
    team1: 'Bengals',
    team2: 'Titans',
    duration: 165,
    description: "Every catch from Ja'Marr Chase's monster fantasy performance against the Titans.",
    timestamp: 'Today 3:30 PM',
    thumbnail: 'https://image.pollinations.ai/prompt/JaMarr%20Chase%20catching%20a%20football%20Cincinnati%20Bengals%20jersey%20orange%20and%20black%20stripes%20dynamic%20action%20shot?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/JaMarr%20Chase%20catching%20a%20football%20Cincinnati%20Bengals%20jersey%20orange%20and%20black%20stripes%20dynamic%20action%20shot?width=1280&height=720&nologo=true',
    badges: ['Player Focus', 'Fantasy Star']
  },
  {
    id: 'daily-recap-dec14',
    league: 'Paramount+ Sports',
    title: 'The Daily Sprint: Dec 14',
    team1: 'Daily',
    team2: 'Recap',
    duration: 60,
    description: 'Your 60-second rapid recap of every major winner, loser, and highlight from today\'s action.',
    timestamp: 'Updated 8:00 PM',
    thumbnail: 'https://image.pollinations.ai/prompt/Sports%20news%20studio%20desk%20with%20anchors%20and%20screens%20showing%20game%20highlights?width=1280&height=720&nologo=true',
    videoUrl: 'https://image.pollinations.ai/prompt/Sports%20news%20studio%20desk%20with%20anchors%20and%20screens%20showing%20game%20highlights?width=1280&height=720&nologo=true',
    badges: ['Daily Brief', 'Catch Up']
  }
];
// Sample Data for Infinite Videos Feed
const sampleTitles = [
  "How to Start Freelancing in 2026 (Step by Step Guide)",
  "10 Best Websites to Make Money Online Easily",
  "Complete Web Development Roadmap 2026",
  "UI/UX Design Course for Beginners - Build Apps",
  "Learn Python Programming in 30 Minutes",
  "How I Earned $5000/Month on Upwork & Fiverr",
  "AI Tools Every Graphic Designer Needs in 2026",
  "Build a YouTube Clone with Tailwind CSS & JavaScript",
  "Master Video Editing Skills for YouTube Shorts",
  "Top High-Paying Skills to Learn This Year"
];

const sampleChannels = [
  { name: "SkillHub", seed: "SkillHub" },
  { name: "Tech World", seed: "TechWorld" },
  { name: "CodeWithMe", seed: "CodeWithMe" },
  { name: "DesignPro", seed: "DesignPro" },
  { name: "Freelance Mastery", seed: "FreelanceMastery" },
  { name: "Creative Studio", seed: "CreativeStudio" }
];

const sampleThumbnails = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop"
];

let videoCount = 0;
let isLoading = false;

const feedContainer = document.getElementById('video-feed');
const loadingSpinner = document.getElementById('loading-spinner');
const refreshBtn = document.getElementById('refresh-btn');
const refreshLink = document.getElementById('refresh-link');
const mobileHomeBtn = document.getElementById('mobile-home-btn');

// Single Video Card Component
function createVideoCard() {
  videoCount++;
  const title = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
  const channel = sampleChannels[Math.floor(Math.random() * sampleChannels.length)];
  const thumbnail = sampleThumbnails[Math.floor(Math.random() * sampleThumbnails.length)] + `&sig=${videoCount}`;
  const views = (Math.floor(Math.random() * 800) + 10) + "K";
  const days = Math.floor(Math.random() * 28) + 1;
  const mins = Math.floor(Math.random() * 20) + 5;
  const secs = Math.floor(Math.random() * 50) + 10;

  const card = document.createElement('div');
  card.className = "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200";

  card.innerHTML = `
    <div class="relative bg-slate-900 group cursor-pointer">
      <img src="${thumbnail}" class="w-full h-44 object-cover group-hover:opacity-90 transition" alt="Thumbnail">
      <span class="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
        ${mins}:${secs < 10 ? '0' + secs : secs}
      </span>
    </div>
    <div class="p-3 flex items-start space-x-3">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${channel.seed}" class="w-9 h-9 rounded-full bg-slate-100 flex-shrink-0 border" alt="${channel.name}">
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start">
          <h3 class="font-bold text-xs text-slate-900 line-clamp-2 leading-snug cursor-pointer hover:text-blue-600">${title}</h3>
          <button class="text-slate-400 hover:text-slate-600 p-1 -mr-1" title="More options">
            <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
          </button>
        </div>
        <p class="text-[11px] text-slate-500 font-medium mt-1 flex items-center space-x-1">
          <span>${channel.name}</span>
          <i class="fa-solid fa-circle-check text-[9px] text-blue-500"></i>
        </p>
        <p class="text-[10px] text-slate-400 mt-0.5">${views} views • ${days} days ago</p>
      </div>
    </div>
  `;
  return card;
}

// Load Batch of Videos
function loadMoreVideos(count = 6) {
  if (isLoading) return;
  isLoading = true;
  if (loadingSpinner) loadingSpinner.style.display = 'flex';

  setTimeout(() => {
    for (let i = 0; i < count; i++) {
      if (feedContainer) feedContainer.appendChild(createVideoCard());
    }
    isLoading = false;
  }, 400);
}

// Refresh Feed Action
function refreshFeed() {
  const indicator = document.getElementById('refresh-indicator');
  if (indicator) {
    indicator.classList.remove('hidden');
    indicator.classList.add('flex');
  }

  setTimeout(() => {
    if (feedContainer) feedContainer.innerHTML = '';
    videoCount = 0;
    loadMoreVideos(6);
    if (indicator) {
      indicator.classList.remove('flex');
      indicator.classList.add('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 600);
}

// Event Listeners for Refresh Buttons
if (refreshBtn) refreshBtn.addEventListener('click', refreshFeed);
if (refreshLink) refreshLink.addEventListener('click', refreshFeed);
if (mobileHomeBtn) mobileHomeBtn.addEventListener('click', refreshFeed);

// Infinite Scroll Trigger
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
    loadMoreVideos(4);
  }
});

// Initializing First Feed
document.addEventListener('DOMContentLoaded', () => {
  loadMoreVideos(6);
});
  

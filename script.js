const screens = [...document.querySelectorAll(".app-screen")];
const indicatorLabel = document.querySelector(".indicator-label");
const indicatorDots = [...document.querySelectorAll(".indicator-dots i")];
const toast = document.querySelector(".prototype-toast");
const challengeButton = document.querySelector('.weekly-challenge .primary-button');
const challengeProgressValue = document.querySelector('.weekly-challenge .progress-value b');
const challengeProgressTrack = document.querySelector('.weekly-challenge .progress-track span');
const challengeCopy = document.querySelector('.weekly-challenge .challenge-copy');
const feedProgressTitle = document.querySelector('.progress-update .progress-title');
const feedProgressCopy = document.querySelector('.progress-update .progress-copy');
const feedKudosCount = document.querySelector('.kudos-line .kudos-count');
const partnerName = document.querySelector('.partner-section .partner-name');
const partnerNameInline = document.querySelector('.partner-section .partner-name-inline');
const partnerMeta = document.querySelector('.partner-section .partner-meta');
const alternateButton = document.querySelector('.partner-section .text-button');
const followButton = document.querySelector('.activity-owner > button');
const saveRouteButton = document.querySelector('.map-actions .circle-button');
const kudosButton = document.querySelector('.feed-actions button[data-action="toggle-feed-kudos"]');
const bothKudosButton = document.querySelector('.club-social-actions button[data-action="toggle-both-kudos"]');
const progressButton = document.querySelector('.club-social-actions button[data-action="view-club-progress"]');

let currentScreen = 0;
const state = {
  joined: false,
  partner: false,
  challengeComplete: false,
  following: false,
  kudos: false,
  routeSaved: false,
  alternatePartner: false,
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => toast.classList.remove('is-visible'), 1600);
}

function updateChallengeUI() {
  const joined = state.joined;
  const complete = state.challengeComplete || state.partner;
  challengeButton.textContent = joined ? 'Joined challenge' : 'Join challenge';
  challengeButton.classList.toggle('is-joined', joined);
  challengeButton.setAttribute('aria-pressed', String(joined));
  challengeCopy.textContent = joined
    ? 'You committed to a shared run with Maya and can help move the club forward this week.'
    : 'Complete two runs with the same clubmate by Sunday. Each shared run adds to the club\'s weekly progress.';
  challengeProgressValue.textContent = joined ? '68%' : '61%';
  challengeProgressTrack.style.width = joined ? '68%' : '61%';
  if (joined) {
    challengeProgressValue.closest('.progress-value').setAttribute('data-state', 'joined');
  } else {
    challengeProgressValue.closest('.progress-value').removeAttribute('data-state');
  }
  if (complete) {
    feedProgressTitle.textContent = 'Shared run progress';
    feedProgressCopy.textContent = 'Ellen and Maya completed 2 of 2 shared runs. North Quad Run Club is now 68% complete.';
  } else {
    feedProgressTitle.textContent = 'Shared run progress';
    feedProgressCopy.textContent = 'Complete both runs to add to this week\'s club progress.';
  }
}

function updatePartnerUI() {
  const showAlternate = state.alternatePartner;
  partnerName.textContent = showAlternate ? 'Samir P.' : 'Maya L.';
  partnerNameInline.textContent = showAlternate ? 'Samir P.' : 'Maya L.';
  partnerMeta.textContent = showAlternate ? 'Usually runs Mon / Wed' : 'Usually runs Tue / Thu';
  alternateButton.textContent = showAlternate ? 'Show suggested partner' : 'See other clubmates';
  alternateButton.setAttribute('aria-pressed', String(showAlternate));
  const reasons = document.querySelector('.match-reasons');
  if (reasons) {
    const items = reasons.querySelectorAll('li');
    if (showAlternate) {
      items[0].querySelector('span').textContent = '8:40–9:05 /mi pace';
      items[1].querySelector('span').textContent = 'Similar early evening availability';
      items[2].querySelector('span').textContent = 'Often runs the campus perimeter';
    } else {
      items[0].querySelector('span').textContent = '8:40–9:00 /mi pace';
      items[1].querySelector('span').textContent = 'Same Tuesday and Thursday availability';
      items[2].querySelector('span').textContent = 'Often runs the North Quad loop';
    }
  }
}

function updateStateUI() {
  updateChallengeUI();
  updatePartnerUI();
  const followLabel = state.following ? 'Following' : 'Follow';
  followButton.textContent = followLabel;
  followButton.classList.toggle('is-following', state.following);
  followButton.setAttribute('aria-pressed', String(state.following));
  const saveLabel = state.routeSaved ? 'Route saved' : 'Save route';
  saveRouteButton.setAttribute('aria-label', saveLabel);
  saveRouteButton.setAttribute('aria-pressed', String(state.routeSaved));
  saveRouteButton.classList.toggle('is-saved', state.routeSaved);
  saveRouteButton.querySelector('svg').setAttribute('data-saved', String(state.routeSaved));
  const kudosLabel = state.kudos ? 'Kudos sent' : 'Give kudos';
  if (kudosButton) {
    kudosButton.setAttribute('aria-label', kudosLabel);
    kudosButton.setAttribute('aria-pressed', String(state.kudos));
    kudosButton.classList.toggle('is-active', state.kudos);
  }
  const bothKudosLabel = state.kudos ? 'Kudos sent' : 'Give kudos to both';
  if (bothKudosButton) {
    bothKudosButton.setAttribute('aria-pressed', String(state.kudos));
    bothKudosButton.classList.toggle('is-active', state.kudos);
    bothKudosButton.querySelector('span').textContent = bothKudosLabel;
  }
  if (feedKudosCount) {
    feedKudosCount.textContent = state.kudos ? '9 gave kudos' : '8 gave kudos';
  }
}

function showScreen(index) {
  const nextIndex = Number(index);
  if (!Number.isInteger(nextIndex) || nextIndex < 0 || nextIndex >= screens.length) return;

  currentScreen = nextIndex;
  screens.forEach((screen, screenIndex) => {
    const isActive = screenIndex === currentScreen;
    screen.classList.toggle("is-active", isActive);
    screen.setAttribute("aria-hidden", String(!isActive));

    if (isActive) {
      const scroller = screen.querySelector(".screen-scroll");
      if (scroller) scroller.scrollTop = 0;
      indicatorLabel.textContent = screen.dataset.screenName;
    }
  });

  indicatorDots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentScreen));
}

function handleAction(button) {
  const action = button.dataset.action;
  if (!action) return false;

  if (action === 'toast') {
    showToast(button.dataset.toast || 'Not included in this prototype');
    return true;
  }

  if (action === 'open-club') {
    showScreen(button.dataset.next);
    return true;
  }

  if (action === 'join-challenge') {
    state.joined = true;
    state.challengeComplete = false;
    updateStateUI();
    showScreen(button.dataset.next);
    return true;
  }

  if (action === 'pair-with-maya') {
    state.partner = true;
    state.challengeComplete = true;
    updateStateUI();
    showScreen(button.dataset.next);
    return true;
  }

  if (action === 'toggle-alternate') {
    state.alternatePartner = !state.alternatePartner;
    updatePartnerUI();
    return true;
  }

  if (action === 'toggle-follow') {
    state.following = !state.following;
    updateStateUI();
    return true;
  }

  if (action === 'toggle-feed-kudos') {
    state.kudos = !state.kudos;
    updateStateUI();
    return true;
  }

  if (action === 'toggle-both-kudos') {
    state.kudos = !state.kudos;
    updateStateUI();
    return true;
  }

  if (action === 'toggle-save-route') {
    state.routeSaved = !state.routeSaved;
    updateStateUI();
    return true;
  }

  if (action === 'view-club-progress') {
    showScreen(button.dataset.next);
    return true;
  }

  return false;
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-next], [data-action]');
  if (!trigger) return;
  if (trigger.dataset.next && !trigger.dataset.action) {
    showScreen(trigger.dataset.next);
    return;
  }
  handleAction(trigger);
});

document.querySelector('.restart-button').addEventListener('click', () => {
  state.joined = false;
  state.partner = false;
  state.challengeComplete = false;
  state.following = false;
  state.kudos = false;
  state.routeSaved = false;
  state.alternatePartner = false;
  updateStateUI();
  showScreen(0);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' && currentScreen < screens.length - 1) showScreen(currentScreen + 1);
  if (event.key === 'ArrowLeft' && currentScreen > 0) showScreen(currentScreen - 1);
  if (event.key === 'Home') showScreen(0);
});

updateStateUI();
showScreen(0);

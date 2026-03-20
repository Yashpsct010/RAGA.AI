export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered with scope:', registration.scope);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  }
};

export const triggerMockNotification = () => {
  const fireNotification = () => {
    new Notification('Clinical Architect Alert', {
      body: 'Critical lab results for Patient #PX-992 have arrived.',
      icon: '/vite.svg'
    });
  };

  if ('Notification' in window && Notification.permission === 'granted') {
    fireNotification();
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    requestNotificationPermission().then(() => {
      if (Notification.permission === 'granted') {
        fireNotification();
      } else {
        alert('Please allow notifications in your browser settings to test this feature.');
      }
    });
  } else {
    alert('Please allow notifications in your browser settings to test this feature.');
  }
};

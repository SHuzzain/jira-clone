const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("windows") !== -1) {
    return "windows";
  } else if (userAgent.indexOf("mac") !== -1) {
    return "mac";
  } else if (/android|iphone|ipad|mobile/i.test(userAgent)) {
    return "mobile";
  }
  return "unknown";
};

const redirectToEmail = (email: string) => {
  const deviceType = getDeviceType();
  const mailtoLink = `mailto:${email}`;

  switch (deviceType) {
    case "windows":
      window.location.href = mailtoLink; // For Windows, will open default email client (e.g., Outlook)
      break;
    case "mac":
      window.location.href = mailtoLink; // For Mac, will open default email client (e.g., Apple Mail)
      break;
    case "mobile":
      window.location.href = mailtoLink; // For mobile, will open default email app
      break;
    default:
      window.location.href = mailtoLink; // Default to the same
      break;
  }
};

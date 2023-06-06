export function getMetricColor(metric) {
  let red, green;
  if (metric < 40) {
    red = 255;
    green = Math.round(110 - (40 - metric) * 1.5);
  } else if (metric < 80) {
    // at 80: 180, 255, 50
    // at 41: 255, 112, 50:
    // red has to change by 75
    // green by 143
    red = 255 - (metric - 40) * 1.87;
    green = 112 + (metric - 40) * 3.57;
  } else {
    // at 80: 180, 255, 50;
    // at 100: 64, 255, 50
    // red, green, blue
    red = 180 - (metric - 80) * 5.8;
    green = 255;
  }
  const color = "rgb(" + red + "," + green + ",50)";

  return color;
}

export function generateStudentRetentionText(metric) {
  if (metric > 50) {
    return `Ranks in the top ${Math.round(
      100 - metric
    )}% for student retention across all courses`;
  } else {
    return `Ranks in the bottom ${Math.round(
      metric
    )}% for student retention across all courses`;
  }
}

export function generatePopularityText(metric) {
  // More popular than 8% of courses that we have data for
  if (metric > 50) {
    return `Ranks in the top ${Math.round(
      100 - metric
    )}% in popularity across all courses`;
  } else {
    return `Ranks in the bottom ${Math.round(
      metric
    )}% in popularity across all courses`;
  }
}

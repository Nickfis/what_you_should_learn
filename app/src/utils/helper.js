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
